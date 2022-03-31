import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoFacturacionComprobantesComponent } from './pago-facturacion-comprobantes.component';
import { TableViewModule } from '../table-view/table-view.module';
import { FormDatosComunModule } from '../form-datos-comun/form-datos-comun.module';




@NgModule({
  declarations: [
    PagoFacturacionComprobantesComponent
  ],
  imports: [
    CommonModule,
    FormDatosComunModule,
    TableViewModule
  ],
  exports:[PagoFacturacionComprobantesComponent]
})
export class PagoFacturacionComprobantesModule { }
