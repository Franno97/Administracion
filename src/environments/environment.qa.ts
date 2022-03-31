import { MreEnvironment } from 'src/app/models/Mre-environment';

const baseUrl = 'http://172.31.2.23';

export const environment = {
  production: false,
  application: {
    baseUrl: 'http://172.31.2.23',
    name: 'Ministerio de Relaciones Exteriores y Movilidad Humana',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'http://172.31.2.25:85',
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
      url: 'http://172.31.2.25:83',
      rootNamespace: 'Mre.Sb.Base',
    },
    SettingManagement: {
      url: 'http://172.31.2.25:81',
      rootNamespace: 'Mre.Sb.Notificacion',
    },
    UnidadAdministrativa: {
      url: 'http://172.31.2.25:84',
      rootNamespace: 'Mre.Sb.AdministrativeUnit',
    },
    Cita: {
      url: 'http://172.31.2.25:91',
      rootNamespace: 'Mre.Sb.Cita',
    },
    RegistroPersona: {
      url: 'http://172.31.2.25:82',
      rootNamespace: 'Mre.Sb.PersonRegistration',
    },
    Pago: {
      url: 'http://172.31.2.25:94',
      rootNamespace: 'Mre.Sb.Pago',
    },
    Tramite: {
      url: 'http://172.31.2.25:86',
      rootNamespace: 'Mre.Visas.Tramite',
    },
    Catalogo: {
      url: 'http://172.31.2.25:93',
      rootNamespace: 'Mre.Visas.Catalogo',
    },
    Visa: {
      url: 'http://172.31.2.25:90',
      rootNamespace: 'Mre.Visas.Visa',
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
      url: 'http://172.31.2.25:92',
      rootNamespace: 'Mre.Visas.FacturaElectronica',
    },
    Multa: {
      url: 'http://172.31.2.25:88',
      rootNamespace: 'Mre.Visas.Multa',
    }
  },
  //Establecer la paginacion en las tablas
  maximoResultado: 10
} as MreEnvironment;
