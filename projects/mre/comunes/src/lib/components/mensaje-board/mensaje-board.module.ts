import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeBoardComponent } from './mensaje-board.component';
import { FormTemplateModule } from '../form-template/form-template.module';



@NgModule({
  declarations: [
      MensajeBoardComponent
  ],
  imports: [
    CommonModule,
    FormTemplateModule
  ],
  exports:[MensajeBoardComponent]
})
export class MensajeBoardModule {
  
 }
