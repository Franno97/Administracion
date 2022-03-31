import { NgModule } from '@angular/core';

import {
  AuthGuard,
  DynamicLayoutComponent,
  PermissionGuard
} from '@abp/ng.core';

import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionFirmaElectronicaComponent } from './components/configuracion-firma-electronica/configuracion-firma-electronica.component';


const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: DynamicLayoutComponent,
    children: [
      {
        path: 'configurar-firma-electronica',
        component: ConfiguracionFirmaElectronicaComponent,
        canActivate: [AuthGuard, PermissionGuard]
      } 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramiteConfiguracionRoutingModule { }
