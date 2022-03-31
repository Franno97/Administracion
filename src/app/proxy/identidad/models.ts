import type { IdentityUserCreateOrUpdateDtoBase } from '../volo/abp/identity/models';

export interface ActualizarIdentidadConfiguracionDtoDto {
  claveLongitud: number;
  claveRequiereMayusculas: boolean;
  claveRequiereMinusculas: boolean;
  claveRequiereDigito: boolean;
  claveRequiereNoAlfanumericos: boolean;
  bloqueoMaximoAccesoFallidos: number;
  bloqueoTiempo: number;
  bloqueoNuevosUsuarios: boolean;
  accesoNotificarFallidos: boolean;
  controlarClavesAnterior: boolean;
  controlarClavesAnteriorCantidad: number;
}

export interface IdentidadConfiguracionDto {
  claveLongitud: number;
  claveRequiereMayusculas: boolean;
  claveRequiereMinusculas: boolean;
  claveRequiereDigito: boolean;
  claveRequiereNoAlfanumericos: boolean;
  bloqueoMaximoAccesoFallidos: number;
  bloqueoTiempo: number;
  bloqueoNuevosUsuarios: boolean;
  accesoNotificarFallidos: boolean;
  controlarClavesAnterior: boolean;
  controlarClavesAnteriorCantidad: number;
}

export interface UsuarioCrearDto extends IdentityUserCreateOrUpdateDtoBase {
}
