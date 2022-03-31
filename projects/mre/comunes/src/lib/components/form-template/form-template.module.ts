import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTemplateComponent } from './form-template.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FormTemplateComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    NgbActiveModal,
  ],
  exports:[FormTemplateComponent]
})
export class FormTemplateModule { }
