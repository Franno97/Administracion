import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// labs
import { identityEntityPropContributors } from './labs/entity-prop-contributors';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  //{
  //  path: 'identity',
  //  loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  //},

  {
    path: 'identity',
    loadChildren: () =>
      import('@abp/ng.identity').then(m =>
        m.IdentityModule.forLazy({
          entityPropContributors: identityEntityPropContributors,
        })
      ),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  {
    path: 'unidad-administrativa',
    loadChildren: () => import('@mre/administrative-unit').then(m => m.AdministrativeUnitModule.forLazy()),
  },
  {
    path: 'citas',
    loadChildren: () => import('@mre/cita').then(m => m.CitaModule.forLazy()),
    //canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: 'tramites',
    loadChildren: () => import('@mre/switch-funcionario-perito-consultor').then(m => m.SwitchFuncionarioPeritoConsultorModule.forLazy()),
  },
  {
    path: 'registro-persona',
    loadChildren: () => import('@mre/registro-persona').then(m => m.RegistroPersonaModule.forLazy()),
  },
  {
    path: 'auditoria-config',
    loadChildren: () => import('@mre/auditoria-config').then(m => m.AuditoriaConfigModule.forLazy()),
  },
  {
    path: 'tramite-configuracion',
    loadChildren: () => import('@mre/tramite-configuracion').then(m => m.TramiteConfiguracionModule.forLazy()),
  },
  {
    path: 'funcionario',
    loadChildren: () => import('@mre/funcionario').then(m => m.FuncionarioModule.forLazy()),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
