import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeBoardPopupComponent } from './mensaje-board-popup.component';
import { FormTemplateModule } from '../form-template/form-template.module';



@NgModule({
  declarations: [
    MensajeBoardPopupComponent
  ],
  imports: [
    CommonModule,
    FormTemplateModule
  ],
  exports:[MensajeBoardPopupComponent]
})
export class MensajeBoardPopupModule { }
