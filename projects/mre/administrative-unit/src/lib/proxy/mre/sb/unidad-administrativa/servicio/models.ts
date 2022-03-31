import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ActualizarExoneracionDto {
  valor: number;
  tipoExoneracionId: string;
  entidadAuspicianteId?: string;
  paisId?: string;
  edadInicial?: number;
  edadFinal?: number;
  discapacitado?: boolean;
}

export interface ArancelDto {
  id?: string;
  descripcion: string;
  monedaId: string;
  moneda?: string;
  activo: boolean;
}

export interface ArancelLookupDto extends EntityDto<string> {
  descripcion?: string;
}

export interface CargoDto {
  id: string;
  nombre: string;
}

export interface CargoLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface ConvenioDto {
  id?: string;
  descripcion: string;
  fechaCreacion: string;
  fechaExpiracion?: string;
}

export interface ConvenioLookupDto extends EntityDto<string> {
  descripcion?: string;
}

export interface CrearActualizarArancelDto {
  descripcion: string;
  monedaId: string;
  activo: boolean;
}

export interface CrearActualizarConvenioDto {
  descripcion: string;
  fechaCreacion: string;
  fechaExpiracion?: string;
}

export interface CrearActualizarJerarquiaArancelariaDto {
  arancelId: string;
  tipoArancelId: string;
  descripcion: string;
  orden: number;
  numeroJerarquia: number;
}

export interface CrearActualizarPartidaArancelariaDto {
  descripcion: string;
  numeroPartida: string;
  valor: number;
  jerarquiaArancelariaId: string;
}

export interface CrearActualizarSecuencialLibroDto {
  servicioId: string;
  unidadAdministrativaId: string;
  libroId: string;
  numeroPaginaPorVolumen: number;
  volumenActual: number;
  siguientePagina: number;
  anio: number;
}

export interface CrearActualizarServicioDto {
  nombre: string;
  atencionPresencial: boolean;
  atencionSemiPresencial: boolean;
  atencionVirtual: boolean;
  tipoServicioId: string;
  activo: boolean;
}

export interface CrearExoneracionDto {
  servicioId: string;
  valor: number;
  tipoExoneracionId: string;
  entidadAuspicianteId?: string;
  paisId?: string;
  edadInicial?: number;
  edadFinal?: number;
  discapacitado?: boolean;
}

export interface CrearPartidaArancelariaServicioDto {
  servicioId?: string;
}

export interface EntidadAuspicianteDto {
  id: string;
  nombre: string;
}

export interface EntidadAuspicianteLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface ExonerationDto {
  convenioId: string;
  servicioId: string;
  servicio: string;
  tipoServicio?: string;
  valor: number;
  entidadAuspicianteId?: string;
  entidadAuspiciante?: string;
  paisId?: string;
  edadInicial?: number;
  edadFinal?: number;
  discapacitado?: boolean;
  tipoExoneracionId: string;
  tipoExoneracion?: string;
}

export interface GetConvenioInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetExoneracionInput extends PagedAndSortedResultRequestDto {
}

export interface GetJerarquiaArancelariaInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetPartidaArancelariaInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface GetServicioInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface JerarquiaArancelariaDto {
  id?: string;
  arancelId: string;
  tipoArancelId: string;
  tipoArancel?: string;
  descripcion: string;
  orden: number;
  numeroJerarquia: number;
}

export interface JerarquiaArancelariaLookupDto extends EntityDto<string> {
  descripcion?: string;
}

export interface LibroDto {
  id: string;
  nombre: string;
}

export interface LibroLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface ObtenerArancelInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface ObtenerPartidaArancelariaServicioInputDto extends PagedAndSortedResultRequestDto {
}

export interface PartidaArancelariaDto {
  id?: string;
  descripcion: string;
  numeroPartida: string;
  valor: number;
  jerarquiaArancelariaId: string;
}

export interface PartidaArancelariaLookupDto extends EntityDto<string> {
  descripcion?: string;
}

export interface PartidaArancelariaServicioDto {
  partidaArancelariaId?: string;
  servicioId?: string;
  servicio?: string;
  partidaArancelaria?: string;
  numeroPartida?: string;
  valor: number;
  jerarquiaArancelariaId?: string;
  jerarquiaArancelaria?: string;
  arancelId?: string;
  arancel?: string;
}

export interface PartidaArancelariaServicioInfoDto {
  servicioId?: string;
  servicio?: string;
  tipoServicio?: string;
  atencionPresencial: boolean;
  atencionSemiPresencial: boolean;
  atencionVirtual: boolean;
  activo: boolean;
}

export interface SecuencialLibroDto {
  id?: string;
  servicioId?: string;
  unidadAdministrativaId?: string;
  libroId?: string;
  libro?: string;
  numeroPaginaPorVolumen: number;
  volumenActual: number;
  siguientePagina: number;
  anio: number;
}

export interface ServicioDto {
  id?: string;
  nombre?: string;
  tipoServicioId?: string;
  tipoServicio?: string;
  atencionPresencial: boolean;
  atencionSemiPresencial: boolean;
  atencionVirtual: boolean;
  activo: boolean;
}

export interface TipoArancelDto {
  id: string;
  nombre: string;
}

export interface TipoArancelLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface TipoExoneracionDto {
  id: string;
  nombre: string;
}

export interface TipoExoneracionLookupDto extends EntityDto<string> {
  nombre?: string;
}

export interface TipoPagoDto {
  id: string;
  nombre: string;
}

export interface TipoServicioDto {
  id: string;
  nombre: string;
}

export interface TipoServicioLookupDto extends EntityDto<string> {
  nombre?: string;
}
