import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosSolicitanteModelo } from '../../modelos/datos-solicitante-modelo';

@Component({
  selector: 'lib-datos-solicitante',
  templateUrl: './datos-solicitante.component.html',
  styleUrls: ['./datos-solicitante.component.scss']
})
export class DatosSolicitanteComponent implements OnInit {
  // @Output() formGroupEmit = new EventEmitter<any>();
  @Output() stepperEmit = new EventEmitter<any>();
  @Input() formData: FormBuilder;
  @Input() datosSolicitante: DatosSolicitanteModelo;
  @Input() ctrlAdminShow: boolean = false;

  /* arrField1 = [
    { disabledx: true, placeHolder: "Cédula", typeInput: "text", formCtrolName: "cedulaSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Nombres y Apellidos", typeInput: "text", formCtrolName: "nombreCompletSolicitanteo", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "País", typeInput: "text", formCtrolName: "paisSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Ciudad", typeInput: "text", formCtrolName: "ciudadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "País del Consulado / Unidad Administrativa", typeInput: "text", formCtrolName: "paisConsuladoUnidadAdministrativaSolicitante", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField2 = [
    { disabledx: true, placeHolder: "Teléfono", typeInput: "text", formCtrolName: "telefonoSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Edad", typeInput: "text", formCtrolName: "edadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: true, placeHolder: "Nombre del Consulado / Unidad Administrativa", typeInput: "text", formCtrolName: "nombreConsuladoUnidadAdministrativaSolicitante", icon: "fas fa-user-circle", contentInfo: false }
  ]; */

  mostrarDatosSolicitante = false;

  constructor() { }

  ngOnInit(): void {
    // this.formGroupEmit.emit(this.formData);
  }

  toggleDatosSolicitante(): void {
    this.mostrarDatosSolicitante = !this.mostrarDatosSolicitante;
  }

}
