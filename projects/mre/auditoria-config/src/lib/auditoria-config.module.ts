import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { NgModule,ModuleWithProviders, NgModuleFactory } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import {  NgbDropdownModule,NgbNavModule,NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


import { ConfigurarComponent } from './components/configurar/configurar.component';
import { AuditoriaConfigRoutingModule } from './auditoria-config-routing.module';
import { AuditableComponent } from './components/auditable/auditable.component';


@NgModule({
  declarations: [
    ConfigurarComponent,
    AuditableComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbDropdownModule,
    AuditoriaConfigRoutingModule
  ],
  exports: [
    
  ]
})
export class AuditoriaConfigModule { 

  static forChild(): ModuleWithProviders<AuditoriaConfigModule> {
    return {
      ngModule: AuditoriaConfigModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<AuditoriaConfigModule> {
    return new LazyModuleFactory(AuditoriaConfigModule.forChild());
  }

}
