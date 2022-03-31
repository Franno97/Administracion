import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';

import { ApiInterceptor, CoreModule, LazyModuleFactory } from '@abp/ng.core';

import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgbDropdownModule, NgbNavModule, NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from "@angular/forms";

import { AdministrativeUnitRoutingModule } from './administrative-unit-routing.module';


import { AdministrativeUnitTypeComponent } from './components/administrative-unit-type/administrative-unit-type.component';
import { ServiceTypeComponent } from './components/service-type/service-type.component';
import { ServiceComponent } from './components/service/service.component';
import { AdministrativeUnitComponent } from './components/administrative-unit/administrative-unit.component';
import { BankComponent } from './components/bank/bank.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { LevelComponent } from './components/level/level.component';
import { TariffTypeComponent } from './components/tariff-type/tariff-type.component';
import { PaymentTypeComponent } from './components/payment-type/payment-type.component';
import { AddSignerComponent } from './components/add-signer/add-signer.component';
import { AddFunctionaryComponent } from './components/add-functionary/add-functionary.component';
import { AgentAttentionComponent } from './components/agent-attention/agent-attention.component';
import { SecuencialBookComponent } from './components/secuencial-book/secuencial-book.component';
import { AddServicesComponent } from './components/add-services/add-services.component';
import { SearchUserTestComponent } from './components/search-user-test/search-user-test.component';
import { PositionComponent } from './components/position/position.component';
import { BookComponent } from './components/book/book.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { TariffHierarchyComponent } from './components/tariff-hierarchy/tariff-hierarchy.component';
import { TariffHeadingComponent } from './components/tariff-heading/tariff-heading.component';
import { TariffHeadingServiceComponent } from './components/tariff-heading-service/tariff-heading-service.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { ExonerationComponent } from './components/exoneration/exoneration.component';
import { MiFirmaElectronicaComponent } from './components/mi-firma-electronica/mi-firma-electronica.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TipoCuentaBancariaComponent } from './components/tipo-cuenta-bancaria/tipo-cuenta-bancaria.component';
import { TipoExoneracionComponent } from './components/tipo-exoneracion/tipo-exoneracion.component';
import { EntidadAuspicianteComponent } from './components/entidad-auspiciante/entidad-auspiciante.component';


//import { NgxValidateCoreModule } from '@ngx-validate/core';

@NgModule({
  declarations: [
    AdministrativeUnitComponent,

    AdministrativeUnitTypeComponent,
    ServiceTypeComponent,
    ServiceComponent,
    BankComponent,
    CurrencyComponent,
    LevelComponent,
    TariffTypeComponent,
    PaymentTypeComponent,
    AddSignerComponent,
    AddFunctionaryComponent,
    AgentAttentionComponent,
    SecuencialBookComponent,
    AddServicesComponent,
    SearchUserTestComponent,
    PositionComponent,
    BookComponent,
    TariffComponent,
    TariffHierarchyComponent,
    TariffHeadingComponent,
    TariffHeadingServiceComponent,
    AgreementComponent,
    ExonerationComponent,
    MiFirmaElectronicaComponent,
    TipoCuentaBancariaComponent,
    TipoExoneracionComponent,
    EntidadAuspicianteComponent
  ],
  imports: [
    CoreModule,
    NgbNavModule,
    ThemeSharedModule,
    NgbDropdownModule,
    AdministrativeUnitRoutingModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    FormsModule
  ],
  exports: [
    AdministrativeUnitComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ApiInterceptor,
      multi: true,
    }
  ] 
})
export class AdministrativeUnitModule {
  static forChild(): ModuleWithProviders<AdministrativeUnitModule> {
    return {
      ngModule: AdministrativeUnitModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<AdministrativeUnitModule> {
    return new LazyModuleFactory(AdministrativeUnitModule.forChild());
  }
}
