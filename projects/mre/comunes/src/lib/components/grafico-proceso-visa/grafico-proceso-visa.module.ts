import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoProcesoVisaComponent } from './grafico-proceso-visa.component';



@NgModule({
  declarations: [
    GraficoProcesoVisaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[GraficoProcesoVisaComponent]
})
export class GraficoProcesoVisaModule { }
