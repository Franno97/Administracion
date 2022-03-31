import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosSolicitanteComponent } from './datos-solicitante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosSolicitanteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule
  ],
  exports:[DatosSolicitanteComponent]

})
export class DatosSolicitanteModule {
  
 }
