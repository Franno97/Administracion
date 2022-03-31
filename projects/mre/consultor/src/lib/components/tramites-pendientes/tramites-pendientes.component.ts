import { ConfigStateService } from '@abp/ng.core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnviarDatosModalService, MeensajeOnBoardService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GraficoProcesoVisaComponent } from 'projects/mre/comunes/src/lib/components/grafico-proceso-visa/grafico-proceso-visa.component';
import { ClienteExternoService } from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { FiltroTramitesPorRol } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-modelos';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';
import { RevisionDeMultasConsultorComponent } from '../revision-de-multas-consultor/revision-de-multas-consultor.component';
import { RevisionReconocimientoFacialConsultorComponent } from '../revision-reconocimiento-facial-consultor/revision-reconocimiento-facial-consultor.component';
import { ValidarInformacionComponent } from '../validar-informacion/validar-informacion.component';
import { ValidarPagoConsultorComponent } from '../validar-pago-consultor/validar-pago-consultor.component';
import { VerificarVisaConsultorComponent } from '../verificar-visa-consultor/verificar-visa-consultor.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { CodigoRespuestaRegulacionExtranjeros } from 'projects/mre/comunes/src/lib/modelos/codigo-respuesta-regulacion-extranjeros-enum';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';


@Component({
  selector: 'lib-tramites-pendientes',
  templateUrl: './tramites-pendientes.component.html',
  styleUrls: ['./tramites-pendientes.component.scss']
})
export class TramitesPendientesComponent implements OnInit {
  @Input() tabHeader: Array<any> = []
  @Input() tabDataSource: Array<any> = [];
  formTitle: string = 'Trámites consulares pendientes ';
  rolUser: string;
  idUser: string;

  @ViewChild(DatatableComponent, { static: false }) tablaPendientes: DatatableComponent;

  paginaActual = 1;
  registrosPorPagina = 10;
  totalRegistros = 0;
  totalPaginas = 0;
  registros = [];
  registrosMostrar = [];

  ordenColumna: string | null = null;
  ordenForma: string | null = null;
  filtro: string | null = null;

  constructor(
    private modalService: NgbModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private configStateService: ConfigStateService,
    private tramitesPendientesService: TramitesPendientesService,
    private clienteExternoService: ClienteExternoService,
    private mensajeOnBoardService: MeensajeOnBoardService,
    private servicioConfirmacion: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    const currentUser = this.configStateService.getOne('currentUser');
    this.rolUser = currentUser.roles[0];
    this.idUser = currentUser.id;
    this.cargarLista();
  }

  cargarLista() {
    const filtro: FiltroTramitesPorRol = {
      nombreRol: this.rolUser,
      usuarioId: this.idUser,
      numeroRegistros: this.registrosPorPagina,
      paginaActual: this.paginaActual,
      ordenColumna: this.ordenColumna,
      ordenForma: this.ordenForma,
      filtro: this.filtro
    };

    this.tramitesPendientesService.consultarTramitePorFiltrosRol(filtro).subscribe(respuesta => {
      // const respuestaConsulta: RespuestaFiltroTramitePorRol = response.result;
      this.registros = respuesta.resultado;
      this.totalRegistros = respuesta.totalRegistros;
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
    this.registrosMostrar = [];
    this.registros.forEach(obj => {
      const estado: string = obj.movimientos[(obj.movimientos.length - 1)].nombreEstado;
      let registroTemporal = obj;
      registroTemporal.estadoFinal = estado;
      this.registrosMostrar.push(registroTemporal);
    });
  }


  rowClickedEvent(data: any) {
    const objTramite = data.data as TramitesObj;

    const movimiento = objTramite.movimientos[objTramite.movimientos.length - 1] as MovimientoRequest;
    const estado: number = Number(movimiento.estado);
    // const estado: number = 16;
    const numberMDG = objTramite.beneficiario.codigoMDG;

    data.formTitle = movimiento.nombreEstado;
    this.enviarDatosModalService.setData(data);
    switch (estado) {
      case EstadoTramite.ValidarInformacion:
        this.clienteExternoService.consultarMultas(numberMDG).subscribe(multas => {
          data.data.multas = multas;
          this.clienteExternoService.consultarFlujoMigratorio(numberMDG).subscribe(flujoMigratorio => {
            data.data.flujoMigratorio = flujoMigratorio;
            data.facturacionNegativa = false;
            this.enviarDatosModalService.setData(data);

            this.modalService.open(ValidarInformacionComponent);
          });
        });
        break;
      case EstadoTramite.ValidarInformacionNegativa:
        this.clienteExternoService.consultarMultas(numberMDG).subscribe(multas => {
          data.data.multas = multas;
          this.clienteExternoService.consultarFlujoMigratorio(numberMDG).subscribe(flujoMigratorio => {
            data.data.flujoMigratorio = flujoMigratorio;
            data.negativaDePeritaje = true;
            data.facturacionNegativa = false;
            data.funcionarioCEV = true;
            this.enviarDatosModalService.setData(data);
            this.modalService.open(ValidarInformacionComponent);
          });
        });
        break;
      case EstadoTramite.RevisarMultasExoneracion:
        this.clienteExternoService.consultarMultas(numberMDG).subscribe(respuesta => {
          if (respuesta.correcto ||
            respuesta.codigo === CodigoRespuestaRegulacionExtranjeros.DatoEncontrado ||
            Math.abs(respuesta.codigo) === CodigoRespuestaRegulacionExtranjeros.DatoNoEncontrado) {
            data.data.multas = respuesta.multaDto;
            this.enviarDatosModalService.setData(data);
            this.modalService.open(RevisionDeMultasConsultorComponent);
          } else {
            this.mensajeOnBoardService.showMensaje('Hubo error al consultar las multas', 'info');
          }
        });
        break;
      case EstadoTramite.RevisionReconocimientoFacial:
        this.modalService.open(RevisionReconocimientoFacialConsultorComponent);
        break;
      case EstadoTramite.ValidarPago:
        this.modalService.open(ValidarPagoConsultorComponent);
        break;
      /* case EstadoTramite.VerificarVisas:
        this.modalService.open(VerificarVisaConsultorComponent);
        break; */
    }

  }

  grafico() {
    this.modalService.open(GraficoProcesoVisaComponent)
  }

  paginar(pageInfo) {
    this.paginaActual = pageInfo.offset + 1;

    this.cargarLista();
  }

  ordenar(event) {
    const sort = event.sorts[0];
    this.ordenColumna = this.obtenerNombreColumna(sort.prop);
    this.ordenForma = sort.dir;

    this.cargarLista();
  }

  limpiarBusqueda() {
    this.filtro = null;
    this.reiniciarTabla();

    this.tablaPendientes.offset = 0;

    this.cargarLista();
  }

  buscar() {
    this.reiniciarTabla();

    this.cargarLista();
  }

  reiniciarTabla() {
    this.paginaActual = 1;
    this.ordenColumna = null;
    this.ordenForma = null;
    this.registros = [];
    this.totalRegistros = 0;
  }

  obtenerNombreColumna(columna: string): string {
    let nombreColumna = '';
    switch (columna) {
      case 'numero':
        nombreColumna = 'Numero';
        break;
      case 'solicitante.nombres':
        nombreColumna = 'Solicitante';
        break;
      case 'beneficiario':
        nombreColumna = 'Beneficiario';
        break;
      case 'fecha':
        nombreColumna = 'Fecha';
        break;
      default:
        nombreColumna = '';
        break;
    }

    return nombreColumna;
  }

  // Colocar el trámite en desestimiento
  desistirTramite(registro: any): void {
    this.servicioConfirmacion.info('¿Está seguro de desistir el movimiento?', '¡Desistir!').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        const tramite = registro as TramitesObj;
        const movimiento = tramite.movimientos[tramite.movimientos.length - 1] as MovimientoRequest;
        const currentUser = this.configStateService.getOne('currentUser');
        const estadoOrigen: number = Number(movimiento.estado);

        const movimientoActualizar: MovimientoRequest = {
          tramiteId: tramite.id,
          creatorId: currentUser.id,
          estado: EstadoTramite.Desistido,
          estadoOrigen: estadoOrigen,
          observacionDatosPersonales: '',
          observacionSoportesGestion: '',
          observacionDomicilios: '',
          observacionMovimientoMigratorio: '',
          observacionMultas: ''
        };

        this.tramitesPendientesService.postCrearMovimiento(movimientoActualizar)
          .subscribe(respuesta => {
            const opcionError: Partial<Confirmation.Options> = {
              hideCancelBtn: false,
              hideYesBtn: true,
              cancelText: 'Cerrar',
              yesText: 'Confirm',
              messageLocalizationParams: ['Demo'],
              titleLocalizationParams: [],
            };
            if (respuesta.httpStatusCode == 200) {
              this.servicioConfirmacion.info('El trámite se ha enviado a desistir', 'Información', opcionError);
              this.cargarLista();
            } else {
              this.servicioConfirmacion.error(respuesta.message, 'ERROR', opcionError);
            }
          });
      }
    });
  }

}
