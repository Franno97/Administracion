import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosPasaporteBeneficiarioModelo } from '../../modelos/datos-pasaporte-beneficiario-modelo';

@Component({
  selector: 'lib-datos-pasaporte-beneficiario',
  templateUrl: './datos-pasaporte-beneficiario.component.html',
  styleUrls: ['./datos-pasaporte-beneficiario.component.scss']
})
export class DatosPasaporteBeneficiarioComponent {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormBuilder;
  @Input() datosPasaporteBeneficiario: DatosPasaporteBeneficiarioModelo;

  /* arrField3 = [
    { placeHolder: "Número", typeInput: "text", formCtrolName: "numeroPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    // {placeHolder:"Tipo de documento",typeInput:"text",formCtrolName:"numeroPasaporteBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    { placeHolder: "Fecha de emisión", typeInput: "date", formCtrolName: "fechaEmisionPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "País de emisión", typeInput: "text", formCtrolName: "paisEmisionPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Nombre completo", typeInput: "text", formCtrolName: "nombreCompletoPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false }
  ];
  arrField4 = [
    // {placeHolder:"Número",typeInput:"text",formCtrolName:"numeroPasaporteBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    { placeHolder: "Fecha Expiracion", typeInput: "date", formCtrolName: "fechaExpiracionPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Ciudad emisión", typeInput: "text", formCtrolName: "ciudadEmisionPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Fecha de nacimiento", typeInput: "date", formCtrolName: "fechaNacimientoPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ]; */

  constructor() { }

  /* ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);

  } */
}
