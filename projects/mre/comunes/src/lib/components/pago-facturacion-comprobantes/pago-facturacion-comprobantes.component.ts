import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-pago-facturacion-comprobantes',
  templateUrl: './pago-facturacion-comprobantes.component.html',
  styleUrls: ['./pago-facturacion-comprobantes.component.scss']
})
export class PagoFacturacionComprobantesComponent implements OnInit {
  @Input() tabDataSource: Array<any>;
  @Input() pagoFacturacion: boolean = false;//falso es pago --verdadero facturacion
  tabHeader: Array<any> = [
    { name: 'Descripción', propiedad: 'fg' },
    { name: 'Nro. orden', propiedad: '' },
    { name: 'Nro. Transacción', propiedad: '' },
    { name: 'Valor', propiedad: '' },
    { name: 'Ver', icon: ['fas fa-eye'], valShow: "icon" },
  ]

  nameButton: string = "Validar pago";
  titleTab: string = "Forma de Pago";
  constructor() {
  }

  ngOnInit(): void {
    if (this.pagoFacturacion) {
      this.nameButton = "Generar";
      this.titleTab = "Facturación";
      this.tabHeader = [
        { name: 'Descripción', propiedad: 'fg' },
        { name: 'Clave Acceso', propiedad: '' },
        { name: 'Valor', propiedad: '' },
        { name: 'Ver', icon: ['fas fa-eye'], valShow: "icon" },
      ];
    }
  }

}
