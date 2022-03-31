import { Component } from '@angular/core';
import { ReplaceableComponentsService, SettingTabsService,RoutesService } from '@abp/ng.core';
import { eIdentityComponents } from '@abp/ng.identity';
import { eThemeSharedRouteNames, NavItemsService  } from '@abp/ng.theme.shared';


import { UsersAdaptComponent } from './components/users-adapt/users-adapt.component'

//Configuraciones
import { IdentidadConfiguracionComponent } from './components/identidad-configuracion/identidad-configuracion.component'
import { PersonaConfiguracionComponent } from '@mre/registro-persona';
import { eThemeBasicComponents } from '@abp/ng.theme.basic';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { LogoComponent } from './components/logo/logo.component';
import { GestionConfiguracionComponent } from './components/gestion-configuracion/gestion-configuracion.component';
import { eSettingManagementComponents } from '@abp/ng.setting-management';
import { CurrentUserAdaptComponent } from './components/current-user-adapt/current-user-adapt.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  constructor(private replaceableComponents: ReplaceableComponentsService,
    private settingTabs: SettingTabsService ,
    private routesService: RoutesService,
    private navItems: NavItemsService) {

      //Personalizar menus  NavItems
      navItems.addItems([
        {
          id: 'CurrentUserAdapt',
          order: 101,
          component: CurrentUserAdaptComponent,
        }
      ]);

     navItems.removeItem(eThemeBasicComponents.CurrentUser);

     //Componentes personalizados Abp 
    this.replaceableComponents.add({ component: UsersAdaptComponent, key: eIdentityComponents.Users });

    this.replaceableComponents.add({ component: GestionConfiguracionComponent, key: eSettingManagementComponents.SettingManagement });


     //Cambiar posicion menu
     this.routesService.patch(eThemeSharedRouteNames.Administration, {order:2 });


    // added settings
    settingTabs.add([
      {
        name: 'Base::IdentidadConfiguracion',
        order: 1, 
        requiredPolicy: 'Base.IdentidadConfiguracion',
        component: IdentidadConfiguracionComponent,
      },
    ]);

    settingTabs.add([
      {
        name: 'PersonRegistration::RegistroPersonaConfiguracion',
        order: 2,
        requiredPolicy: 'RegistroPersona.PersonaConfiguracion',
        component: PersonaConfiguracionComponent,
      },
    ]);
    

      //Establecer personalizaciones UI.
      //Layout 
      this.replaceableComponents.add({
        component: CuerpoComponent,
        key: eThemeBasicComponents.ApplicationLayout,
      });

      //Logo
      this.replaceableComponents.add({
        component: LogoComponent,
        key: eThemeBasicComponents.Logo,
      });

  }
}



