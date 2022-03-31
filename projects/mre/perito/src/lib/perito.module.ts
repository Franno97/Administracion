import { NgModule } from '@angular/core';
import { PeritoComponent } from './perito.component';
import { TramitesPendientesComponent } from './components/tramites-pendientes/tramites-pendientes.component';
import { CommonModule } from '@angular/common';
import { DatosBeneficiarioSharedModule, DatosSolicitanteSharedModule, FormRequisitiosModule, FormTemplateModule, FuncionarioPeritoConsultorModule, LinksModule, ObservacionesModule, SoporteGestionModule, TableViewModule, TabsViewModule } from '@mre/comunes';
import { GenerarCitaPeritoComponent } from './components/generar-cita-perito/generar-cita-perito.component';
import { PeritajePeritoComponent } from './components/peritaje-perito/peritaje-perito.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { AgendarCitaModule } from 'projects/mre/comunes/src/lib/components/agendar-cita/agendar-cita.module';


@NgModule({
  declarations: [
    PeritoComponent,
    TramitesPendientesComponent,
    GenerarCitaPeritoComponent,
    PeritajePeritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuncionarioPeritoConsultorModule,
    AgendarCitaModule,
    FormTemplateModule,
    TableViewModule,
    TabsViewModule,
    SoporteGestionModule,
    DatosBeneficiarioSharedModule,
    FormRequisitiosModule,
    DatosSolicitanteSharedModule,
    LinksModule,
    ObservacionesModule,
    NgbModule,
    NgbDatepickerModule,
    ThemeSharedModule,
    NgbDropdownModule
  ],
  exports: [
    PeritoComponent
  ]
})
export class PeritoModule { }
