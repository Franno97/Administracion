import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosVisaBeneficiarioComponent } from './datos-visa-beneficiario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '../input-field/input-field.module';



@NgModule({
  declarations: [
    DatosVisaBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule
  ],
  exports:[DatosVisaBeneficiarioComponent]
})
export class DatosVisaBeneficiarioModule { }
