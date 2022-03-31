import { ConfigStateService } from '@abp/ng.core';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteExternoService } from 'projects/mre/registro-persona/src/lib/proxy/mre/sb/registro-persona/proceso';
import { FiltroTramitesPorRol } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-modelos';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { UpdateMovimiento } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/update-movimiento';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';
import { CitasRevisionDatosMenorEdadFuncionarioComponent } from '../citas-revision-datos-menor-edad-funcionario/citas-revision-datos-menor-edad-funcionario.component';
import { FacturacionFuncionarioComponent } from '../facturacion-funcionario/facturacion-funcionario.component';
import { GenerarCitaFuncionarioZonalComponent } from '../generar-cita-funcionario-zonal/generar-cita-funcionario-zonal.component';
import { GenerarVisaElectronicaFuncionarioComponent } from '../generar-visa-electronica-funcionario/generar-visa-electronica-funcionario.component';
import { ReconocimientoFacialFuncionarioZonalComponent } from '../reconocimiento-facial-funcionario-zonal/reconocimiento-facial-funcionario-zonal.component';
import { RevisionDatosMenorEdadFuncionarioComponent } from '../revision-datos-menor-edad-funcionario/revision-datos-menor-edad-funcionario.component';
import { ValidarInformacionFuncionarioCevComponent } from '../validar-informacion-funcionario-cev/validar-informacion-funcionario-cev.component';
import { VerificarMultasNegativasFuncionarioComponent } from '../verificar-multas-negativas-funcionario/verificar-multas-negativas-funcionario.component';
import { VerificarNegativaFuncionarioCevComponent } from '../verificar-negativa-funcionario-cev/verificar-negativa-funcionario-cev.component';
import { VerificarNegativaInformacionFuncionarioComponent } from '../verificar-negativa-informacion-funcionario/verificar-negativa-informacion-funcionario.component';
import { OrdenCedulacionComponent } from '../orden-cedulacion/orden-cedulacion.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { VerificarVisaFuncionarioComponent } from '../verificar-visa-funcionario/verificar-visa-funcionario.component';

@Component({
  selector: 'lib-tramites-pendientes',
  templateUrl: './tramites-pendientes.component.html',
  styleUrls: ['./tramites-pendientes.component.scss']
})
export class TramitesPendientesComponent implements OnInit {
  readonly CODIGO_TRAMITE_VISA = 'SV';
  readonly CODIGO_TRAMITE_ORDEN_CEDULACION = 'OC';


  formTitle: string = 'Trámites pendientes [Funcionario] ';
  @Input() tabHeader: Array<any> = [];
  @Input() tabDataSource: Array<any> = [];
  idUser: string = '';
  tomarTramite: any;
  tramiteAsignado: boolean = false;
  rolUser: string;

  @ViewChild(DatatableComponent, { static: false }) tablaPendientes: DatatableComponent;

  paginaActual = 1;
  registrosPorPagina = 10;
  totalRegistros = 0;
  totalPaginas = 0;
  registros: any[] = [];
  registrosMostrar: any[] = [];

  ordenColumna: string | null = null;
  ordenForma: string | null = null;
  filtro: string | null = null;

  @ViewChild('opcionContainer', { read: ViewContainerRef }) opcionContainer: ViewContainerRef;

  constructor(
    private modalService: NgbModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private clienteExternoService: ClienteExternoService,
    private tramitesPendientesService: TramitesPendientesService,
    private configStateService: ConfigStateService,
    private resolver: ComponentFactoryResolver,
    private servicioConfirmacion: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    let currentUser = this.configStateService.getOne("currentUser");
    this.idUser = currentUser.id;
    this.rolUser = currentUser.roles[0];

    this.tomarTramite = { 'tomarTramite': true, 'creatorId': this.idUser };

    this.cargarLista();
  }

  // Consulta la lista a los servicios
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
      this.registros = respuesta.resultado;
      this.totalRegistros = respuesta.totalRegistros;
      this.cargarDatos();
    });
  }

  // Carga la información de los registros que se van a mostrar en la tabla
  cargarDatos(): void {
    this.registrosMostrar = [];
    this.registros.forEach(obj => {
      const movimientoFinal = obj.movimientos[(obj.movimientos.length - 1)];
      const estado = movimientoFinal.nombreEstado;
      let registroTemporal = obj;
      registroTemporal.estadoFinal = estado;

      const estadoNumber = movimientoFinal.estado;
      const estadoValue = Number(estadoNumber);
      const horaCita = (estadoValue === EstadoTramite.EfectuarCitaReconocimientoFacial
        || estadoValue === EstadoTramite.EfectuarCitaMenorEdad) ? new Date(movimientoFinal.fechaHoraCita) : '';

      registroTemporal.horaCita = horaCita;

      this.registrosMostrar.push(registroTemporal);

    });
  }

  rowClickedEvent(data: any) {
    const objTramite = data.data as TramitesObj;

    const movimiento = objTramite.movimientos[objTramite.movimientos.length - 1] as MovimientoRequest;
    const estado: number = Number(movimiento.estado);
    // const estado: number = 22;
    const numberMDG = objTramite.beneficiario.codigoMDG;

    switch (data.option) {
      case 'generarOrden':
        this.opcionContainer.clear();
        const factory = this.resolver.resolveComponentFactory(OrdenCedulacionComponent);
        const componentRef = this.opcionContainer.createComponent(factory);
        componentRef.instance.data = data.data;
        componentRef.instance.validarTramite();
        componentRef.instance.eventoProcesoFinalizado.subscribe(
          (tramiteId) => {
            this.cargarLista();
          }
        );
        break;
      case 'Tomar trámite':
        let updateMovimiento = {} as UpdateMovimiento;
        updateMovimiento.movimientoId = movimiento.id;
        updateMovimiento.tramiteId = movimiento.tramiteId;
        updateMovimiento.usuarioId = this.idUser;
        this.tramitesPendientesService.updateMoviento(updateMovimiento).subscribe(response => {
          if (response.httpStatusCode == 200) {
            data.enabledSeleccionar[data.pos]['Seleccionar'] = "iconEnabled";
            data.tramiteAsignado = true;
            this.cargarLista();
          } else {
            const opcionError: Partial<Confirmation.Options> = {
              hideCancelBtn: false,
              hideYesBtn: true,
              cancelText: 'Cerrar',
              yesText: 'Confirm',
              messageLocalizationParams: ['Demo'],
              titleLocalizationParams: [],
            };
            this.servicioConfirmacion.error(response.message, 'ERROR', opcionError);
          }
        });
        break;
      case 'Seleccionar': {
        data.formTitle = movimiento.nombreEstado;
        let tramiteAsignado = this.tomarTramite.creatorId == movimiento.usuarioId;
        data.tramiteAsignado = tramiteAsignado;
        // data.tramiteAsignado =  this.tramiteAsignado;
        this.enviarDatosModalService.setData(data);
        switch (estado) {
          // case '5':
          case EstadoTramite.GenerarCitaMenoresEdadZonal:
            this.modalService.open(RevisionDatosMenorEdadFuncionarioComponent);
            break;
          // case '9':
          case EstadoTramite.VerificarNegativaInformacion:
            data.data.multas = [];
            data.data.flujoMigratorio = [];
            this.enviarDatosModalService.setData(data);
            this.modalService.open(VerificarNegativaInformacionFuncionarioComponent);
            break;
          // case '6':
          case EstadoTramite.EfectuarCitaMenorEdad:
            this.enviarDatosModalService.setData(data);
            this.modalService.open(CitasRevisionDatosMenorEdadFuncionarioComponent);
            break;
          // case '12':
          case EstadoTramite.VerificarNegativaMultas:
            this.clienteExternoService.consultarMultas(numberMDG).subscribe(multas => {
              data.data.multas = multas;
              this.enviarDatosModalService.setData(data);
              this.modalService.open(VerificarMultasNegativasFuncionarioComponent);
            });
            break;
          // case '24':
          case EstadoTramite.Facturacion:
            this.modalService.open(FacturacionFuncionarioComponent);
            break;
          // case '25':
          case EstadoTramite.GenerarVisa:
            this.modalService.open(GenerarVisaElectronicaFuncionarioComponent);
            break;
          // case '17':
          case EstadoTramite.VerificarNegativaReconocimientoFacial:
            this.modalService.open(VerificarNegativaFuncionarioCevComponent);
            break;
          // case '14':
          case EstadoTramite.GenerarCitaSubsanacionReconocimientoFacial:
            this.modalService.open(GenerarCitaFuncionarioZonalComponent);
            break;
          // case '15':
          case EstadoTramite.EfectuarCitaReconocimientoFacial:
            this.modalService.open(ReconocimientoFacialFuncionarioZonalComponent);
            break;
          // case '27':
          case EstadoTramite.VerificarInformacionNegativa:
            this.clienteExternoService.consultarMultas(numberMDG).subscribe(multas => {
              data.data.multas = multas;
              this.clienteExternoService.consultarFlujoMigratorio(numberMDG).subscribe(flujoMigratorio => {
                data.data.flujoMigratorio = flujoMigratorio;
                data.facturacionNegativa = true;
                this.enviarDatosModalService.setData(data);
                this.modalService.open(ValidarInformacionFuncionarioCevComponent);
              });
            });
            break;
          // case '22':
          case EstadoTramite.VerificarInformacion:
            this.clienteExternoService.consultarMultas(numberMDG).subscribe(multas => {
              data.data.multas = multas;
              this.clienteExternoService.consultarFlujoMigratorio(numberMDG).subscribe(flujoMigratorio => {
                data.data.flujoMigratorio = flujoMigratorio;
                data.facturacionNegativa = false;
                this.enviarDatosModalService.setData(data);
                this.modalService.open(ValidarInformacionFuncionarioCevComponent);
              });
            });
            break;
          case EstadoTramite.VerificarVisas:
            this.modalService.open(VerificarVisaFuncionarioComponent);
            break;
        }
        break;
      }
    }
  }


  // Realiza el paginado de la tabla
  paginar(pageInfo) {
    this.paginaActual = pageInfo.offset + 1;

    this.cargarLista();
  }

  // Realiza el ordenamiento
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

}
