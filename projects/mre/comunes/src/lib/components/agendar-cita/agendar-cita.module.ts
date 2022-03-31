import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';
import { AgendarCitaComponent } from './agendar-cita.component';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSharedModule } from '@abp/ng.theme.shared';



@NgModule({
  declarations: [
    AgendarCitaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    ThemeSharedModule,
    NgbDropdownModule
  ],
  exports: [AgendarCitaComponent]
})
export class AgendarCitaModule {

}
