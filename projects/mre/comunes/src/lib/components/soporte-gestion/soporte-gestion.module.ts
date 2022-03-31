import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoporteGestionComponent } from './soporte-gestion.component';
import { TableViewModule } from '../table-view/table-view.module';
import { VerArchivoModule } from '../ver-archivo/ver-archivo.module';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagenModule } from '../visualizar-imagen/visualizar-imagen.module';



@NgModule({
  declarations: [
    SoporteGestionComponent
  ],
  imports: [
    CoreModule,
    NgbNavModule,
    ThemeSharedModule,
    NgbDropdownModule,
    CommonModule,
    TableViewModule,
    VerArchivoModule,
    VisualizarImagenModule
  ],
  exports: [SoporteGestionComponent]
})
export class SoporteGestionModule { }
