import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ActualizarPersonaConfiguracionDto {
  validarPuntoDeAcceso: boolean;
  validarNacionalidad: boolean;
  nacionalidadesPermitidas: string;
  validarMayoriaEdad: boolean;
  edadMinima: number;
  habilitarCaptcha: boolean;
  fechaInicialControl?: string;
  fechaFinalControl?: string;
  vigenciaInformacion: number;
  duracionCodigoVerificacion: number;
  intentosPermitidos: number;
  duracionBloqueo: number;
}

export interface CrearActualizarPersonaDto {
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: string;
  paisNacimientoId: string;
  nacionalidades: string[];
  correoElectronico: string;
  tieneDocumentoIdentidad: boolean;
  tipoDocumentoIdentidadId?: string;
  numeroDocumentoIdentidad?: string;
  paisEmisionDocumentoIdentidad?: string;
  fechaEmisionDocumentoIdentidad?: string;
  fechaExpiracionDocumentoIdentidad?: string;
  genero: string;
  estadoCivilId: string;
  telefono: string;
  direccion: string;
  regionId: string;
  ciudad: string;
  numeroVisa?: string;
  tipoVisaId?: string;
  fechaEmisionVisa?: string;
  fechaExpiracionVisa?: string;
  nivelEducativoId: string;
  profesionId: string;
  ocupacionId: string;
  fotografia: number[];
  numeroRegistroPermanencia: string;
  huellaDactilar: number[];
  fechaIngresoPais: string;
  puntoAccesoRegular: boolean;
  paisResidenciaPrevia: string;
  origen: string;
  origenId: string;
  nombreUsuario?: string;
}

export interface ObtenerPersonaInputDto extends PagedAndSortedResultRequestDto {
  filtro?: string;
}

export interface OcupacionDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface PersonaConfiguracionDto {
  validarPuntoDeAcceso: boolean;
  validarNacionalidad: boolean;
  nacionalidadesPermitidas?: string;
  validarMayoriaEdad: boolean;
  edadMinima: number;
  habilitarCaptcha: boolean;
  fechaInicialControl?: string;
  fechaFinalControl?: string;
  vigenciaInformacion: number;
  duracionCodigoVerificacion: number;
  intentosPermitidos: number;
  duracionBloqueo: number;
}

export interface PersonaDto {
  id?: string;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  paisNacimientoId?: string;
  paisNacimiento?: string;
  nacionalidadesId: string[];
  nacionalidadesNombre: string[];
  correoElectronico?: string;
  poseeDocumentoIdentidad: boolean;
  poseeDocumentoIdentidadTexto?: string;
  tipoDocumentoIdentidadId?: string;
  tipoDocumentoIdentidad?: string;
  numeroDocumentoIdentidad?: string;
  documentoIdentidadPaisEmision?: string;
  documentoIdentidadPaisEmisionNombre?: string;
  documentoIdentidadFechaEmision?: string;
  documentoIdentidadFechaExpiracion?: string;
  genero?: string;
  estadoCivilId?: string;
  estadoCivil?: string;
  telefono?: string;
  direccion?: string;
  regionId?: string;
  region?: string;
  ciudad?: string;
  numeroVisa?: string;
  tipoVisa?: string;
  tipoVisaId?: string;
  visaFechaEmision?: string;
  visaFechaExpiracion?: string;
  nivelEducativoId?: string;
  nivelEducativo?: string;
  profesionId?: string;
  profesion?: string;
  ocupacionId?: string;
  ocupacion?: string;
  fotografia: number[];
  fotografiaBase64?: string;
  numeroRegistroPermanencia?: string;
  huellasDactilares: number[];
  huellasDactilaresBase64?: string;
  fechaIngresoPais?: string;
  ingresoPuntoRegular: boolean;
  ingresoPuntoRegularTexto?: string;
  paisResidenciaPrevia?: string;
  paisResidenciaPreviaTexto?: string;
  nombreUsuario?: string;
  origen?: string;
  origenId?: string;
}

export interface ProfesionDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface TipoDocumentoIdentidadDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface TipoVisaDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}
