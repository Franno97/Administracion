import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPasaporteBeneficiarioComponent } from './datos-pasaporte-beneficiario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosPasaporteBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    InputFieldModule,
    ReactiveFormsModule
  ],
  exports:[DatosPasaporteBeneficiarioComponent]
})
export class DatosPasaporteBeneficiarioModule { }
