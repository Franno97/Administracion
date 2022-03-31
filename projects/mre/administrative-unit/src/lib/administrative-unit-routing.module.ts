import { NgModule } from '@angular/core';

import {
  AuthGuard,
  DynamicLayoutComponent,
  PermissionGuard,
  ReplaceableComponents,
  ReplaceableRouteContainerComponent,
} from '@abp/ng.core';

import { Routes, RouterModule } from '@angular/router';

import { AdministrativeUnitTypeComponent } from './components/administrative-unit-type/administrative-unit-type.component';
import { ServiceTypeComponent } from './components/service-type/service-type.component';
import { ServiceComponent } from './components/service/service.component';
import { AdministrativeUnitComponent } from './components/administrative-unit/administrative-unit.component';
import { AddSignerComponent } from './components/add-signer/add-signer.component';
import { AddFunctionaryComponent } from './components/add-functionary/add-functionary.component';
import { AgentAttentionComponent } from './components/agent-attention/agent-attention.component';
import { AddServicesComponent } from './components/add-services/add-services.component';
import { SecuencialBookComponent } from './components/secuencial-book/secuencial-book.component';

import { TariffTypeComponent } from './components/tariff-type/tariff-type.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { BankComponent } from './components/bank/bank.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { LevelComponent } from './components/level/level.component';
import { PaymentTypeComponent } from './components/payment-type/payment-type.component';

//TODO: Test, pruebas concepto, referencias
import { SearchUserTestComponent } from './components/search-user-test/search-user-test.component';
import { BookComponent } from './components/book/book.component';
import { PositionComponent } from './components/position/position.component';
import { TariffHierarchyComponent } from './components/tariff-hierarchy/tariff-hierarchy.component';
import { TariffHeadingComponent } from './components/tariff-heading/tariff-heading.component';
import { TariffHeadingServiceComponent } from './components/tariff-heading-service/tariff-heading-service.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { ExonerationComponent } from './components/exoneration/exoneration.component';
import { MiFirmaElectronicaComponent } from './components/mi-firma-electronica/mi-firma-electronica.component';
import { TipoCuentaBancariaComponent } from './components/tipo-cuenta-bancaria/tipo-cuenta-bancaria.component';
import { TipoExoneracionComponent } from './components/tipo-exoneracion/tipo-exoneracion.component';
import { EntidadAuspicianteComponent } from './components/entidad-auspiciante/entidad-auspiciante.component';

const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: DynamicLayoutComponent,
    children: [
      {
        path: '',
        component: AdministrativeUnitComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'unit-type',
        component: AdministrativeUnitTypeComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'service-type',
        component: ServiceTypeComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'bank',
        component: BankComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'level',
        component: LevelComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'currency',
        component: CurrencyComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'tariff-type',
        component: TariffTypeComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'tariff',
        component: TariffComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        //path: 'tariff-hierarchy',
        path: 'arancel/agregar-jerarquia/:id/:descripcion',
        component: TariffHierarchyComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        //path: 'tariff-heading',
        path: 'jerarquia/agregar-partida/:id/:descripcion',
        component: TariffHeadingComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'tariff-heading/add-service/:id/:name',
        component: TariffHeadingServiceComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'agreement',
        component: AgreementComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'agreement/add-exoneration/:id/:name',
        component: ExonerationComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'tipo-exoneracion',
        component: TipoExoneracionComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          requiredPolicy: 'AdministrativeUnit.TipoExoneracion', 
        },
      },
      {
        path: 'payment-type',
        component: PaymentTypeComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'book',
        component: BookComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'position',
        component: PositionComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'admin-unit',
        component: AdministrativeUnitComponent,
      },
      {
        path: 'admin-unit/signer/:id/:name',
        component: AddSignerComponent,
      },
      {
        path: 'admin-unit/functionary/:id/:name',
        component: AddFunctionaryComponent,
      },
      {
        path: 'admin-unit/aggent-attention/:id/:name',
        component: AgentAttentionComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'admin-unit/add-service/:id/:name',
        component: AddServicesComponent,
      },
      {
        path: 'seceuncial-book/:administrativeUnitId/:serviceId/:serviceName',
        component: SecuencialBookComponent,
      },

      {
        path: 'mi-firma-electronica',
        component: MiFirmaElectronicaComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'tipo-cuenta-bancaria',
        component: TipoCuentaBancariaComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: {
          requiredPolicy: 'AdministrativeUnit.TipoCuentaBancaria', 
        },
      },
      {
        path: 'entidad-auspiciante',
        component: EntidadAuspicianteComponent,
        //canActivate: [AuthGuard, PermissionGuard],
        data: {
          //requiredPolicy: 'AdministrativeUnit.EntidadAuspiciante', 
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativeUnitRoutingModule { }
