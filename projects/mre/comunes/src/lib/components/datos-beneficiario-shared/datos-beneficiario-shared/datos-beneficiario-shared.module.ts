import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosBeneficiarioSharedComponent } from './datos-beneficiario-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '../../input-field/input-field.module';



@NgModule({
  declarations: [
    DatosBeneficiarioSharedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule
  ],
  exports:[DatosBeneficiarioSharedComponent]
})
export class DatosBeneficiarioSharedModule { }
