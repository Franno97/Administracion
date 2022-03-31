import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoMigratorioComponent } from './movimiento-migratorio.component';
import { TableViewModule } from '../table-view/table-view.module';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';



@NgModule({
  declarations: [
    MovimientoMigratorioComponent
  ],
  imports: [
    CommonModule,
    TableViewModule,
    CoreModule,
    ThemeSharedModule
  ],
  exports: [MovimientoMigratorioComponent]
})
export class MovimientoMigratorioModule { }
