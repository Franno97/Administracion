import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosDomicilioBaneficiarioModelo } from '../../modelos/datos-domicilio-beneficiario-modelo';

@Component({
  selector: 'lib-datos-domicilio-beneficiario',
  templateUrl: './datos-domicilio-beneficiario.component.html',
  styleUrls: ['./datos-domicilio-beneficiario.component.scss'],
})
export class DatosDomicilioBeneficiarioComponent {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormBuilder;
  @Input() datosDomicilioBeneficiario: DatosDomicilioBaneficiarioModelo;


  /* arrField1 = [
    {
      placeHolder: 'País domicilio',
      typeInput: 'text',
      formCtrolName: 'paisDomicilioBeneficiario',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Provincia domicilio',
      typeInput: 'text',
      formCtrolName: 'provinciaDomicilioBeneficiario',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Ciudad domicilio',
      typeInput: 'text',
      formCtrolName: 'ciudadDomicilioBeneficiario',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Número teléfono domicilio',
      typeInput: 'text',
      formCtrolName: 'telefonoDomicilioBeneficiario',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Número teléfono celular',
      typeInput: 'text',
      formCtrolName: 'celularDomicilioBeneficiario',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
  ]; */
  constructor() { }

  /* ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  } */
}
