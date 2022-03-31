import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosBeneficiarioCompartidoModelo } from '../../../modelos/datos-beneficiario-compartido-modelo';
import { EnviarDatosModalService } from '../../../services/enviar-datos-modal/enviar-datos-modal.service';

@Component({
  selector: 'lib-datos-beneficiario-shared',
  templateUrl: './datos-beneficiario-shared.component.html',
  styleUrls: ['./datos-beneficiario-shared.component.scss']
})
export class DatosBeneficiarioSharedComponent {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormBuilder;
  @Input() visaTitular: boolean = true;
  @Input() hasConadis: boolean = false;
  @Input() datosBeneficiarioCompartido: DatosBeneficiarioCompartidoModelo;

  srcImagen: string = "assets/images/perfil.jpg";

  /* arrField1 = [
    { disabledx: false, placeHolder: "Primer Apellido", typeInput: "text", formCtrolName: "primerApellidoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nombres", typeInput: "text", formCtrolName: "nombreCompletoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "País de nacimiento", typeInput: "text", formCtrolName: "paisNacimientoBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Correo", typeInput: "email", formCtrolName: "emailBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField2 = [
    { disabledx: false, placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidadBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nro. de documento", typeInput: "text", formCtrolName: "numeroPasaporteBeneficiario", icon: "fas fa-user-circle", contentInfo: false },
  ]; */

  constructor(
    private enviarDatosModalService: EnviarDatosModalService) {
    this.srcImagen = this.enviarDatosModalService.getFotoBeneficiario();
  }

  /* ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  } */
}
