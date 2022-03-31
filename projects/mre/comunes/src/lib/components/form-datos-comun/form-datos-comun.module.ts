import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatosComunComponent } from './form-datos-comun.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    FormDatosComunComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule,
    NgbModule
  ],
  exports:[FormDatosComunComponent]
})
export class FormDatosComunModule { }
