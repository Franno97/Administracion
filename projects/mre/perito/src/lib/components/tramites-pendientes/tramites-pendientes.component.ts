import { ConfigStateService } from '@abp/ng.core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EnviarDatosModalService } from '@mre/comunes';
import { MovimientoRequest } from '@mre/switch-funcionario-perito-consultor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroTramitesPorRol, RespuestaFiltroTramitePorRol } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-modelos';
import { TramitesObj } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/tramites-obj';
import { UpdateMovimiento } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/models/update-movimiento';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';
import { GenerarCitaPeritoComponent } from '../generar-cita-perito/generar-cita-perito.component';
import { PeritajePeritoComponent } from '../peritaje-perito/peritaje-perito.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/modelos/estado-tramite-enum';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'lib-tramites-pendientes',
  templateUrl: './tramites-pendientes.component.html',
  styleUrls: ['./tramites-pendientes.component.scss']
})
export class TramitesPendientesComponent implements OnInit {
  formTitle: string = 'Trámites pendientes [Perito] ';
  @Input() tabHeader: Array<any> = [];
  @Input() tabDataSource: Array<any> = [];
  idUser: string = '';
  rolUser: string;
  tomarTramite: any;
  tramiteAsignado: boolean = false;

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
    //private config: NgbModalConfig,
    private modalService: NgbModal,
    private enviarDatosModalService: EnviarDatosModalService,
    private tramitesPendientesService: TramitesPendientesService,
    private configStateService: ConfigStateService,
    private servicioConfirmacion: ConfirmationService
  ) {
    // config.backdrop = 'static';
    // config.keyboard = false;
    // config.size = 'xl';

    /* this.config.beforeDismiss = () =>{
      this.tramitesPendientesService.getTramitesByRol(this.rolUser,this.idUser).subscribe(response =>{
        this.tabDataSource = response.result;
      });
      return true;
    } */

  }

  ngOnInit(): void {
    let currentUser = this.configStateService.getOne("currentUser");
    this.idUser = currentUser.id;
    this.rolUser = currentUser.roles[0];

    this.tomarTramite = { 'tomarTramite': true, 'creatorId': this.idUser };
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
      const movimientoFinal = obj.movimientos[(obj.movimientos.length - 1)];
      const estado = movimientoFinal.nombreEstado;
      let registroTemporal = obj;
      registroTemporal.estadoFinal = estado;

      const estadoNumber = movimientoFinal.estado;
      const estadoValue = Number(estadoNumber);
      const horaCita = (estadoValue === EstadoTramite.EfectuarCitaPeritaje) ? new Date(movimientoFinal.fechaHoraCita) : '';

      registroTemporal.horaCita = horaCita;

      this.registrosMostrar.push(registroTemporal);
    });
  }


  rowClickedEvent(data: any) {
    let objTramite = data.data as TramitesObj;
    let movimiento = objTramite.movimientos[objTramite.movimientos.length - 1] as MovimientoRequest;
    const estado = Number(movimiento.estado);
    // let estado:string =   '7';
    switch (data.option) {
      case 'Tomar trámite':
        let updateMovimiento = {} as UpdateMovimiento;
        updateMovimiento.movimientoId = movimiento.id;
        updateMovimiento.tramiteId = movimiento.tramiteId;
        updateMovimiento.usuarioId = this.idUser;
        this.tramitesPendientesService.updateMoviento(updateMovimiento).subscribe(response => {
          if (response.httpStatusCode == 200) {
            // data.enabledSeleccionar[data.pos]['Seleccionar'] = "iconEnabled";
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
        // data.tramiteAsignado = this.tramiteAsignado;
        switch (estado) {
          // case '7':
          case EstadoTramite.GenerarCitaPeritaje:
            this.enviarDatosModalService.setData(data);
            this.modalService.open(GenerarCitaPeritoComponent);
            break;
          // case '8':
          case EstadoTramite.EfectuarCitaPeritaje:
            this.enviarDatosModalService.setData(data);
            this.modalService.open(PeritajePeritoComponent);
            break;
        }
        break;
      }
    }
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

}
