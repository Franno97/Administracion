import { MreEnvironment } from 'src/app/models/Mre-environment';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Cancillería del Ecuador',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44332',
    redirectUri: baseUrl,
    clientId: 'Admin_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Base UnidadAdministrativa RegistroPersona Cita Notificacion Tramite',
    requireHttps: false,
    showDebugInformation: true,
    PostLogoutRedirectUri: baseUrl
  },
  apis: {
    default: {
      url: 'https://localhost:44323',
      rootNamespace: 'Mre.Sb.Base',
    },
    SettingManagement: {
      url: 'http://localhost:44132',
      rootNamespace: 'Mre.Sb.Notificacion',
    },
    UnidadAdministrativa: {
      url: 'https://localhost:44362',
      rootNamespace: 'Mre.Sb.AdministrativeUnit',
    },
    Cita: {
      url: 'https://localhost:44382',
      rootNamespace: 'Mre.Sb.Cita',
    },
    RegistroPersona: {
      url: 'https://localhost:44352',
      rootNamespace: 'Mre.Sb.PersonRegistration',
    },
    Pago: {
      url: 'http://172.31.3.40:94',
      rootNamespace: 'Mre.Sb.Pago',
    },
    Tramite: {
      url: 'http://172.31.3.40:86',
      rootNamespace: 'Mre.Visas.Tramite',
    },
    Documento: {
      url: 'http://172.31.3.18/SharePointArchivos',
      rootNamespace: 'Mre.Visas.Documento',
    },
    Reporte: {
      url: 'http://172.31.3.18/Reporte',
      rootNamespace: 'Mre.Visas.Reporte',
    },
    Externo: {
      url: 'http://172.31.3.18/Externos',
      rootNamespace: 'Mre.Visas.Externo',
    },
    FacturaElectronica: {
      url: 'http://172.31.3.40:92',
      rootNamespace: 'Mre.Visas.FacturaElectronica',
    },
    Multa: {
      url: 'http://172.31.3.40:88',
      rootNamespace: 'Mre.Visas.Multa',
    }
  },
  //Establecer la paginacion en las tablas
  maximoResultado: 10
} as MreEnvironment;