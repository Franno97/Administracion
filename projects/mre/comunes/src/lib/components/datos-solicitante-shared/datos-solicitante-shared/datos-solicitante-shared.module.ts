import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosSolicitanteSharedComponent } from './datos-solicitante-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '../../input-field/input-field.module';



@NgModule({
  declarations: [
    DatosSolicitanteSharedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule
  ],
  exports:[DatosSolicitanteSharedComponent]
})
export class DatosSolicitanteSharedModule { }
