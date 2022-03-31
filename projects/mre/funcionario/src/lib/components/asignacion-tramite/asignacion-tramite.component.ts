import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadAdministrativaService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'lib-asignacion-tramite',
  templateUrl: './asignacion-tramite.component.html',
  styleUrls: ['./asignacion-tramite.component.css']
})
export class AsignacionTramiteComponent implements OnInit {

  tituloFormulario: string = 'Asignación de trámite';

  @ViewChild(DatatableComponent, { static: false }) tabla: DatatableComponent;

  paginaActual = 1;
  registrosPorPagina = 10;
  totalRegistros = 0;
  totalPaginas = 0;
  registros: any[] = [];
  registrosMostrar: any[] = [];

  ordenColumna: string | null = null;
  ordenForma: string | null = null;
  filtro: string | null = null;

  constructor(
    private servicioUnidadAdministrativa: UnidadAdministrativaService
  ) { }

  ngOnInit(): void {
  }

  // Consulta la lista a los servicios
  cargarLista() {
    /* const filtro: FiltroTramitesPorRol = {
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
    }); */
  }

  // Carga la información de los registros que se van a mostrar en la tabla
  cargarDatos(): void {
    /* this.registrosMostrar = [];
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

    }); */
  }

  // Realiza el paginado de la tabla
  paginar(pageInfo: any): void {
    this.paginaActual = pageInfo.offset + 1;

    this.cargarLista();
  }

  // Realiza el ordenamiento
  ordenar(event: any): void {
    /* const sort = event.sorts[0];
    this.ordenColumna = this.obtenerNombreColumna(sort.prop);
    this.ordenForma = sort.dir; */

    this.cargarLista();
  }

  limpiarBusqueda() {
    this.filtro = null;
    this.reiniciarTabla();

    this.tabla.offset = 0;

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

}
