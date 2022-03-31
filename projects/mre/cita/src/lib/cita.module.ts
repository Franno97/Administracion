import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { CitaComponent } from './componentes/cita/cita.component';
import { CitaRoutingModule } from './cita-routing.module';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgbDropdownModule, NgbNavModule, NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from "@angular/forms";
import { ServicioCalendarioComponent } from './componentes/servicio-calendario/servicio-calendario.component';
import { FeriadoComponent } from './componentes/feriado/feriado.component';


@NgModule({
  declarations: [
    CitaComponent,
    ServicioCalendarioComponent,
    FeriadoComponent,
  ],
  imports: [
    CoreModule,
    NgbNavModule,
    ThemeSharedModule,
    NgbDropdownModule,
    CitaRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    FormsModule
  ],
  exports: [
    CitaComponent
  ]
})
export class CitaModule {
  static forChild(): ModuleWithProviders<CitaModule> {
    return {
      ngModule: CitaModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<CitaModule> {
    return new LazyModuleFactory(CitaModule.forChild());
  }
}
