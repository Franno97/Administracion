import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.scss']
})
export class MultasComponent implements OnInit {
  @Input() tabDataSource: Array<any> = [];
  @Output() rowClicked = new EventEmitter();

  /* tabHeader: Array<any> = [
    {
      name: 'Tipo de multa',
      propiedad: 'tipoMulta'
    },
    {
      name: 'F. Registro',
      propiedad: "fechaRegistro"
    },
    {
      name: 'Estado',
      propiedad: "estado"
    },
    {
      name: 'Sel. Subsanación',
      valShow: "checkBox"
    }] */

  constructor() { }

  ngOnInit(): void {
  }
  rowClickedEvent(data: any) {
    this.rowClicked.emit(data);
  }

}
