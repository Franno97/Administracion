import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-movimiento-migratorio',
  templateUrl: './movimiento-migratorio.component.html',
  styleUrls: ['./movimiento-migratorio.component.scss']
})
export class MovimientoMigratorioComponent implements OnInit {
  @Input() tabDataSource: Array<any> = [];
  /* tabHeader: Array<any> = [
    { name: 'Categoría migratoria', propiedad: 'categoriaMigratoria' },
    { name: 'F. Movimiento', propiedad: 'fechaHoraMovimiento' },
    { name: 'Motivo de viaje', propiedad: 'motivoViaje' },
    { name: 'Nacionalidad documento migratorio', propiedad: 'nacionalidadDocumentoMovimientoMigratorio' },
    { name: 'Número de documento', propiedad: 'OJOJOJ' },
    { name: 'País destino', propiedad: 'paisDestino' },
    { name: 'País origen', propiedad: 'OJOJO' },
    { name: 'Puerto registro', propiedad: 'puertoRegistro' },
    { name: 'Tarjeta andina', propiedad: 'tarjetaAndina' },
    { name: 'Tipo de documento', propiedad: 'tipoDocumentoMovimientoMigratorio' },
    { name: 'Tipo de movimiento', propiedad: 'tipoMovimiento' },
    { name: 'Tiempo declarado', propiedad: 'tiempoDeclarado' },
    { name: 'País de residencia', propiedad: 'paisResidencia' },
  ]; */

  constructor() { }

  ngOnInit(): void {
  }

  rowClickedEvent(data: any) {

  }
}
