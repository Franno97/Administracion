import { AuthGuard, DynamicLayoutComponent, PermissionGuard } from "@abp/ng.core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuditableComponent } from "./components/auditable/auditable.component";
import { ConfigurarComponent } from './components/configurar/configurar.component';

const routes: Routes = [
    {
        path: '',
        //pathMatch: 'full',
        component: DynamicLayoutComponent,
        children: [
            {
                path: '',
                component: ConfigurarComponent,
                canActivate: [AuthGuard, PermissionGuard]
            },
            {
                path: 'auditable',
                component: AuditableComponent,
                canActivate: [AuthGuard, PermissionGuard]
            }, 
            {
                path: 'configuracion',
                component: ConfigurarComponent,
                canActivate: [AuthGuard, PermissionGuard]
            }, 
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuditoriaConfigRoutingModule { }