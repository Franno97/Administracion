import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDomicilioBeneficiarioComponent } from './datos-domicilio-beneficiario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosDomicilioBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    InputFieldModule,
    ReactiveFormsModule
  ],
  exports:[DatosDomicilioBeneficiarioComponent]
})
export class DatosDomicilioBeneficiarioModule { }
