import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ActualizarUnidadAdministrativaServicioDto {
  tipoPagoId: string;
  activo: boolean;
}

export interface AgregarFuncionarioDto {
  usuarioId: string;
  cargoId: string;
}

export interface BancoDto {
  id: string;
  nombre: string;
}

export interface BancoLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface CrearActualizarUnidadAdministrativaDto {
  tipoUnidadAdministrativaId: string;
  dependenciaAdministrativaId?: string;
  codigo: string;
  nombre: string;
  siglas: string;
  paisId: string;
  regionId: string;
  ciudad?: string;
  direccion?: string;
  codigoPostal?: string;
  bancoId: string;
  numeroCuentaBancaria: string;
  tipoCuentaBancariaId: string;
  titularCuentaBancaria: string;
  monedaId: string;
  fechaInicioOperacion?: string;
  fechaFinOperacion?: string;
  activo: boolean;
  nivelId?: string;
  observaciones?: string;
  jurisdiccion: string[];
}

export interface CrearSignatarioDto {
  servicioId: string;
  usuarioId: string;
  porDefecto: boolean;
}

export interface CrearUnidadAdministrativaServicioDto {
  servicioId: string;
  tipoPagoId: string;
  activo: boolean;
}

export interface FuncionarioInfoDto {
  usuarioId?: string;
}

export interface FuncionarioInfoExtendido extends FuncionarioInfoDto {
  cargo?: string;
  ciudad?: string;
  unidadAdministrativaId?: string;
  unidadAdministrativaNombre?: string;
  unidadAdministrativaPaisId?: string;
  unidadAdministrativaSiglas?: string;
}

export interface GetUnidadAdministrativaInput extends PagedAndSortedResultRequestDto {
  filter?: string;
  tipoUnidadAdministrativaId?: string;
}

export interface GetUnidadAdministrativaServicioInput extends PagedAndSortedResultRequestDto {
  activo?: boolean;
}

export interface MonedaDto {
  id: string;
  nombre: string;
  simbolo?: string;
}

export interface MonedaLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface NivelDto {
  id: string;
  nombre: string;
}

export interface NivelLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface ObtenerSignatarioInput {
  servicioId?: string;
  usuarioId?: string;
  poseeFirmaElectronica?: boolean;
}

export interface SignatarioDto {
  unidadAdministrativaId?: string;
  servicioId?: string;
  servicio?: string;
  usuarioId?: string;
  porDefecto: boolean;
  poseeFirmaElectronica: boolean;
}

export interface TipoCuentaBancariaDto {
  id: string;
  nombre: string;
}

export interface UnidadAdministrativaDto {
  id?: string;
  tipoUnidadAdministrativaId?: string;
  tipoUnidadAdministrativa?: string;
  dependenciaAdministrativaId?: string;
  dependenciaAdministrativa?: string;
  nombre?: string;
  siglas?: string;
  codigo?: string;
  paisId?: string;
  pais?: string;
  regionId?: string;
  region?: string;
  ciudad?: string;
  subRegion?: string;
  direccion?: string;
  codigoPostal?: string;
  bancoId?: string;
  banco?: string;
  monedaId?: string;
  moneda?: string;
  fechaInicioOperacion?: string;
  fechaFinOperacion?: string;
  activo: boolean;
  nivelId?: string;
  nivel?: string;
  observaciones?: string;
  jurisdiccion: string[];
  tipoCuentaBancariaId?: string;
  tipoCuentaBancaria?: string;
  titularCuentaBancaria?: string;
  numeroCuentaBancaria?: string;
}

export interface UnidadAdministrativaFuncionalDto {
  usuarioId?: string;
  nombre?: string;
  apellido?: string;
  cargo?: string;
}

export interface UnidadAdministrativaInfoDto extends EntityDto<string> {
  nombre?: string;
  paisId?: string;
  siglas?: string;
  codigo?: string;
}

export interface UnidadAdministrativaServicioDto {
  unidadAdministrativaId?: string;
  servicioId?: string;
  servicio?: string;
  tipoPago?: string;
  tipoPagoId?: string;
  activo: boolean;
}

export interface UnidadAdministrativaTipoDto {
  id: string;
  nombre: string;
}

export interface UnidadAdministrativaTipoInfoDto extends EntityDto<string> {
  nombre?: string;
}
