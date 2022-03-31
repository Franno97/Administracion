import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionFirmaElectronicaComponent } from './components/configuracion-firma-electronica/configuracion-firma-electronica.component';
import { TramiteConfiguracionRoutingModule } from './tramite-configuracion-routing.module';



@NgModule({
  declarations: [
    ConfiguracionFirmaElectronicaComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbNavModule,
    NgbDropdownModule,
    TramiteConfiguracionRoutingModule,
  ],
  exports: [
  ]
})
export class TramiteConfiguracionModule { 

  static forChild(): ModuleWithProviders<TramiteConfiguracionModule> {
    return {
      ngModule: TramiteConfiguracionModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<TramiteConfiguracionModule> {
    return new LazyModuleFactory(TramiteConfiguracionModule.forChild());
  }

}
