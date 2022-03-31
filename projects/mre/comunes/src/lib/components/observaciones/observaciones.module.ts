import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservacionesComponent } from './observaciones.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ObservacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ObservacionesComponent]
})
export class ObservacionesModule { }
