import { NgModule } from '@angular/core';

import {
  AuthGuard,
  DynamicLayoutComponent,
  PermissionGuard
} from '@abp/ng.core';

import { Routes, RouterModule } from '@angular/router';
import { SwitchComponent } from './components/switch/switch.component';



const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: DynamicLayoutComponent,
    children: [
      {
        path: '',
        component: SwitchComponent,
        //canActivate: [AuthGuard, PermissionGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchFuncionarioPeritoConsultorRountingModule { }
