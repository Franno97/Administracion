import { NgModule } from '@angular/core';

import {
  AuthGuard,
  DynamicLayoutComponent,
  PermissionGuard
} from '@abp/ng.core';

import { Routes, RouterModule } from '@angular/router';

import { CitaComponent } from './componentes/cita/cita.component';
import { ServicioCalendarioComponent } from './componentes/servicio-calendario/servicio-calendario.component';
import { FeriadoComponent } from './componentes/feriado/feriado.component';


const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: DynamicLayoutComponent,
    children: [
      {
        path: '',
        component: CitaComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'citas',
        component: CitaComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'servicios/:id/:nombre',
        component: ServicioCalendarioComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
      {
        path: 'feriados/:id/:nombre',
        component: FeriadoComponent,
        canActivate: [AuthGuard, PermissionGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaRoutingModule { }
