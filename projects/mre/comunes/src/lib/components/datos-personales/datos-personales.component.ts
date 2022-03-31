import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosBeneficiarioModelo } from '../../modelos/datos-beneficiario-modelo';
import { DatosSolicitanteModelo } from '../../modelos/datos-solicitante-modelo';

@Component({
  selector: 'lib-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent {
  @Input() formData: FormBuilder;
  @Input() visaTitular: boolean = false;
  @Input() datosSolicitante: DatosSolicitanteModelo;
  @Input() srcImagen: string;
  @Input() datosBeneficiario: DatosBeneficiarioModelo;

  constructor() { }

}
