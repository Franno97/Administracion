import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRequisitiosComponent } from './form-requisitios.component';
import { TableViewModule } from '../table-view/table-view.module';
import { VerArchivoModule } from '../ver-archivo/ver-archivo.module';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormRequisitiosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableViewModule,
    VerArchivoModule,
    CoreModule,
    ThemeSharedModule
  ],
  exports: [FormRequisitiosComponent]
})
export class FormRequisitiosModule { }
