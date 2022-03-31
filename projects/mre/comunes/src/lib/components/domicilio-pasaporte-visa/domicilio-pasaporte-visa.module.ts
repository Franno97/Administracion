import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomicilioPasaporteVisaComponent } from './domicilio-pasaporte-visa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDomicilioBeneficiarioModule } from '../datos-domicilio-beneficiario/datos-domicilio-beneficiario.module';
import { DatosPasaporteBeneficiarioModule } from '../datos-pasaporte-beneficiario/datos-pasaporte-beneficiario.module';
import { DatosVisaBeneficiarioModule } from '../datos-visa-beneficiario/datos-visa-beneficiario.module';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DomicilioPasaporteVisaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule,
    DatosDomicilioBeneficiarioModule,
    DatosPasaporteBeneficiarioModule,
    DatosVisaBeneficiarioModule
  ],
  exports:[DomicilioPasaporteVisaComponent]
})
export class DomicilioPasaporteVisaModule { }
