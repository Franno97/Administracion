import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultasComponent } from './multas.component';
import { TableViewModule } from '../table-view/table-view.module';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';



@NgModule({
  declarations: [
    MultasComponent
  ],
  imports: [
    CommonModule,
    TableViewModule,
    CoreModule,
    ThemeSharedModule
  ],
  exports: [MultasComponent]
})
export class MultasModule { }
