import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosDomicilioBaneficiarioModelo } from '../../modelos/datos-domicilio-beneficiario-modelo';
import { DatosPasaporteBeneficiarioModelo } from '../../modelos/datos-pasaporte-beneficiario-modelo';
import { DatosVisaBeneficiarioModelo } from '../../modelos/datos-visa-beneficiario-modelo';

@Component({
  selector: 'lib-domicilio-pasaporte-visa',
  templateUrl: './domicilio-pasaporte-visa.component.html',
  styleUrls: ['./domicilio-pasaporte-visa.component.scss']
})
export class DomicilioPasaporteVisaComponent {
  @Input() formData: FormBuilder;
  @Input() showAlertDatosVisa: boolean = false;
  @Input() datosDomicilioBeneficiario: DatosDomicilioBaneficiarioModelo;
  @Input() datosPasaporteBeneficiario: DatosPasaporteBeneficiarioModelo;
  @Input() datosVisaBeneficiario: DatosVisaBeneficiarioModelo;

  constructor() { }

}
