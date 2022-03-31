import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './datos-personales.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitanteModule } from '../datos-solicitante/datos-solicitante.module';
import { DatosBeneficiarioModule } from '../datos-beneficiario/datos-beneficiario.module';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule,
    DatosSolicitanteModule,
    DatosBeneficiarioModule
  ],
  exports:[DatosPersonalesComponent]
})
export class DatosPersonalesModule { }
