import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { RegistroPersonaRoutingModule } from './registro-persona-routing.module';
import { PersonaConfiguracionComponent } from './components/persona-configuracion/persona-configuracion.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PersonaConfiguracionComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDatepickerModule,
    RegistroPersonaRoutingModule
  ],
  exports: [ 
  ]
})
export class RegistroPersonaModule { 
  static forChild(): ModuleWithProviders<RegistroPersonaModule> {
    return {
      ngModule: RegistroPersonaModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<RegistroPersonaModule> {
    return new LazyModuleFactory(RegistroPersonaModule.forChild());
  }
}
