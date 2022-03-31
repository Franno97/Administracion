import type { UsuarioLdap } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioLdapService {
  apiName = 'Ldap';

  buscarUsuario = (usuario: string) =>
    this.restService.request<any, UsuarioLdap>({
      method: 'GET',
      url: '/api/ldap/usuario-ldap',
      params: { usuario },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
