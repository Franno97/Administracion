import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '../input-field/input-field.module';



@NgModule({
  declarations: [
    TableViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputFieldModule
  ],
  exports:[TableViewComponent]
})
export class TableViewModule { }
