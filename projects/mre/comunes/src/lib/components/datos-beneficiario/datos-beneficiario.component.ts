import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosBeneficiarioModelo } from '../../modelos/datos-beneficiario-modelo';

@Component({
  selector: 'lib-datos-beneficiario',
  templateUrl: './datos-beneficiario.component.html',
  styleUrls: ['./datos-beneficiario.component.scss']
})
export class DatosBeneficiarioComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormGroup;
  @Input() visaTitular: boolean = true;
  @Input() srcImagen: string = "assets/images/perfil.jpg";
  @Input() datosBeneficiario: DatosBeneficiarioModelo;
  radChecked: boolean = false;

 /*  arrField1 = [
    { disabledx: false, placeHolder: "Fecha de Solicitud", typeInput: "date", formCtrolName: "fechaSolicitudBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Primer Apellido", typeInput: "text", formCtrolName: "primerApellidoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Segundo Apellido", typeInput: "text", formCtrolName: "segundoApellidoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nombre Completo", typeInput: "text", formCtrolName: "nombreCompletoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField2 = [
    { disabledx: true, placeHolder: "Número registro MDG", typeInput: "text", formCtrolName: "numberMDGBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidadBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Ciudad nacimiento", typeInput: "text", formCtrolName: "ciudadNacimientoBeneficiario", icon: "fas fa-user-circle", contentInfo: false }
  ];
  arrField3 = [
    { disabledx: true, placeHolder: "Estado civil", typeInput: "text", formCtrolName: "estadoCivilBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidadBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Género", typeInput: "text", formCtrolName: "generoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Correo electrónico", typeInput: "text", formCtrolName: "emailBeneficiario", icon: "fas fa-user-circle", contentInfo: false }
  ];
  arrField4 = [
    { disabledx: true, placeHolder: "Calidad migratoria", typeInput: "text", formCtrolName: "calidadMigratoria", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Grupo", typeInput: "text", formCtrolName: "grupoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Tipo de visa", typeInput: "text", formCtrolName: "tipoVisaBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Actividad a desarrollar", typeInput: "text", formCtrolName: "actividadDesarrollarBeneficiario", icon: "fas fa-user-circle", contentInfo: false }
  ];
 */
  constructor() {
  }

  ngOnInit(): void {
    /* this.radChecked = this.formData.controls['discapacidadBeneficiario'].value;
    this.formGroupEmit.emit(this.formData); */
  }
}
