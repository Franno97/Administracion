import { RoutesService, eLayoutType } from '@abp/ng.core';
import { eThemeSharedRouteNames } from '@abp/ng.theme.shared';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/tramites',
        name: 'Trámites',
        iconClass: 'fas fa-book',
        order: 4,
        layout: eLayoutType.application,
      },
      {
        path: '/unidad-administrativa',
        name: '::Menu:AdministrativeUnit',
        iconClass: 'fas fa-book',
        order: 30,
        layout: eLayoutType.application,
      },
      {
        path: '/citas',
        name: '::Menu:Cita',
        iconClass: 'fas fa-book',
        order: 40,
        layout: eLayoutType.application,
      },
      {
        path: '/auditoria-config',
        name: '::Menu:AuditoriaConfig',
        parentName: eThemeSharedRouteNames.Administration,
        requiredPolicy: 'AuditoriaConf.Auditar',
        iconClass: 'fas fa-book',
        //order: 50,
        layout: eLayoutType.application,
      },
      //
      //Menus de unidades administrativas
      {
        path: '/unidad-administrativa/admin-unit-menu',
        name: '::Menu:AdministrativeUnitEntity',
        parentName: '::Menu:AdministrativeUnit',
        requiredPolicy: 'AdministrativeUnit.AdministrativeUnit',
        order: 1,
      },
      {
        path: '/unidad-administrativa/admin-unit',
        name: 'Unidades Administrativas',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.AdministrativeUnit'
      },
      {
        path: '/unidad-administrativa/unit-type',
        name: '::Menu:AdministrativeUnitType',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.AdministrativeUnitType'
      },
      {
        path: '/unidad-administrativa/level',
        name: '::Menu:Level',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.Level'
      },
      {
        path: '/unidad-administrativa/bank',
        name: '::Menu:Bank',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.Bank'
      },
      {
        path: '/unidad-administrativa/currency',
        name: '::Menu:Currency',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.Currency'
      },
      {
        path: '/unidad-administrativa/payment-type',
        name: '::Menu:PaymentType',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.PaymentType'
      },
      {
        path: '/unidad-administrativa/book',
        name: '::Menu:Book',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.PaymentType'
      },
      {
        path: '/unidad-administrativa/position',
        name: '::Menu:Position',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.PaymentType'
      },
      {
        path: '/unidad-administrativa/tipo-cuenta-bancaria',
        name: '::Menu:TipoCuentaBancaria',
        parentName: '::Menu:AdministrativeUnitEntity',
        requiredPolicy: 'AdministrativeUnit.TipoCuentaBancaria'
      },
      //
      //Menus de servicios
      {
        path: '/unidad-administrativa/service-menu',
        name: '::Menu:Service',
        parentName: '::Menu:AdministrativeUnit',
        requiredPolicy: 'AdministrativeUnit.Service',
        order: 2
      },
      {
        path: '/unidad-administrativa/service',
        name: 'Servicio',
        parentName: '::Menu:Service',
        requiredPolicy: 'AdministrativeUnit.Service'
      },
      {
        path: '/unidad-administrativa/service-type',
        name: '::Menu:ServiceType',
        parentName: '::Menu:Service',
        requiredPolicy: 'AdministrativeUnit.ServiceType'
      },
      //
      //Menus de aranceles
      {
        path: '/unidad-administrativa/tariff-menu',
        name: '::Menu:Tariff',
        parentName: '::Menu:AdministrativeUnit',
        requiredPolicy: 'AdministrativeUnit.Tariff',
        order: 3
      },
      {
        path: '/unidad-administrativa/tariff',
        name: 'Aranceles',
        parentName: '::Menu:Tariff',
        requiredPolicy: 'AdministrativeUnit.Tariff'
      },
      {
        path: '/unidad-administrativa/tariff-type',
        name: '::Menu:TariffType',
        parentName: '::Menu:Tariff',
        requiredPolicy: 'AdministrativeUnit.TariffType'
      },
      {
        path: '/unidad-administrativa/agreement',
        name: '::Menu:Agreement',
        parentName: '::Menu:Tariff',
        requiredPolicy: 'AdministrativeUnit.Agreement'
      },
      {
        path: '/unidad-administrativa/entidad-auspiciante',
        name: '::Menu:EntidadAuspiciante',
        parentName: '::Menu:Tariff',
        //requiredPolicy: 'AdministrativeUnit.EntidadAuspiciante'
      },
     
      {
        path: '/unidad-administrativa/tipo-exoneracion',
        name: '::Menu:TipoExoneracion',
        parentName: '::Menu:Tariff',
        requiredPolicy: 'AdministrativeUnit.TipoExoneracion'
      },

      // Menu de citas
      {
        path: '/citas/citas',
        name: '::Menu:UnidadAdministrativaCalendario',
        parentName: '::Menu:Cita',
        requiredPolicy: 'Cita.UnidadAdministrativaCalendario'
      },
      // Menu configuracion Auditoria
      {
        path: '/auditoria-config/configuracion',
        name: '::Menu:AuditoriaConfigConfig',
        parentName: '::Menu:AuditoriaConfig',
        requiredPolicy: 'AuditoriaConf.Auditar'
      },
      {
        path: '/auditoria-config/auditable',
        name: '::Menu:AuditoriaConfigAuditable',
        parentName: '::Menu:AuditoriaConfig',
        requiredPolicy: 'AuditoriaConf.Auditable'
      },
      //TODO.. temp hasta determinar la organizacio menus tramites
      {
        path: '/tramite-configuracion/configurar-firma-electronica',
        name: 'configurar-firma-electronica',
        iconClass: 'fas fa-book',
        order: 4,
        layout: eLayoutType.application,
      },
    ]);
  };
}
