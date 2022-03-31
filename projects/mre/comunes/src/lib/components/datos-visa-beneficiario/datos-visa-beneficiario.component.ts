import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosVisaBeneficiarioModelo } from '../../modelos/datos-visa-beneficiario-modelo';

@Component({
  selector: 'lib-datos-visa-beneficiario',
  templateUrl: './datos-visa-beneficiario.component.html',
  styleUrls: ['./datos-visa-beneficiario.component.scss']
})
export class DatosVisaBeneficiarioComponent {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormGroup;
  @Input() showAlertDatosVisa: boolean = false;
  @Input() datosVisaBeneficiario: DatosVisaBeneficiarioModelo;

  /* radChecked: boolean = false;

  arrField5 = [
    { placeHolder: "Número de visa", typeInput: "text", formCtrolName: "numeroVisaBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Fecha de emisión", typeInput: "date", formCtrolName: "fechaEmisionVisaBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField6 = [
    { placeHolder: "Tipo de visa", typeInput: "text", formCtrolName: "tipoVisaBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Fecha de expiración", typeInput: "date", formCtrolName: "fechaExpiracionVisaBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ]; */

  constructor() { }

  /* ngOnInit(): void {
    this.radChecked = this.formData.controls['tieneVisaBeneficiario'].value;
    this.formGroupEmit.emit(this.formData);
  } */

}
