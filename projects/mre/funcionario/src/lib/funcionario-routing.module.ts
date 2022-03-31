import { NgModule } from '@angular/core';

import {
  AuthGuard,
  DynamicLayoutComponent,
  PermissionGuard
} from '@abp/ng.core';

import { Routes, RouterModule } from '@angular/router';

import { OrdenCedulacionComponent } from './components/orden-cedulacion/orden-cedulacion.component';
import { AsignacionTramiteComponent } from './components/asignacion-tramite/asignacion-tramite.component';

const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: DynamicLayoutComponent,
    children: [
      {
        path: 'orden-cedulacion/:tramiteId',
        component: OrdenCedulacionComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },

    ],
  },
  {
    path: 'asignacion-tramite',
    //pathMatch: 'full',
    component: AsignacionTramiteComponent,
    canActivate: [AuthGuard, PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule { }
