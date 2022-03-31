import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

import { AdministrativeUnitModule } from '@mre/administrative-unit';
import { CitaModule } from '@mre/cita';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersAdaptComponent } from './components/users-adapt/users-adapt.component';

import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { PermissionManagementModule } from '@abp/ng.permission-management';
import { SharedModule } from './shared/shared.module';


import { IdentidadConfiguracionComponent } from './components/identidad-configuracion/identidad-configuracion.component';
import { RegistroPersonaModule } from '@mre/registro-persona';
import { AuditoriaConfigModule } from '@mre/auditoria-config';

import { LogoComponent } from './components/logo/logo.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { SwitchFuncionarioPeritoConsultorModule } from '@mre/switch-funcionario-perito-consultor';
import { GestionConfiguracionComponent } from './components/gestion-configuracion/gestion-configuracion.component';
import { CurrentUserAdaptComponent } from './components/current-user-adapt/current-user-adapt.component';

import { TramiteConfiguracionModule } from '@mre/tramite-configuracion';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    NgxsModule.forRoot(),
    ThemeBasicModule.forRoot(),
    AdministrativeUnitModule,
    CitaModule,
    SwitchFuncionarioPeritoConsultorModule,
    NgbModule,
    RegistroPersonaModule,
    AuditoriaConfigModule,
    UiExtensionsModule,
    PermissionManagementModule,
    SharedModule,
    TramiteConfiguracionModule
  ],
  declarations: [AppComponent, UsersAdaptComponent,
    IdentidadConfiguracionComponent,
    LogoComponent, CuerpoComponent, GestionConfiguracionComponent, CurrentUserAdaptComponent
  ],
  providers: [APP_ROUTE_PROVIDER,
    {
      provide: TABLA_MAXIMO_RESULTADO,  
      useValue: (environment.maximoResultado || environment.apis.default)  || 10  
    }     
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
