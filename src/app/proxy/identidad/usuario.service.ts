import type { UsuarioCrearDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IdentityUserDto } from '../volo/abp/identity/models';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiName = 'Identidad';

  crear = (input: UsuarioCrearDto) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'POST',
      url: '/api/identidad/usuario',
      body: input,
    },
    { apiName: this.apiName });

  obtenerLista = (input: string[]) =>
    this.restService.request<any, IdentityUserDto[]>({
      method: 'GET',
      url: '/api/identidad/usuario',
      params: { input },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
