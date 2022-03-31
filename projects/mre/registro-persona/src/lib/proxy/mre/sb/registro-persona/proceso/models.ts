import type { PersonaDto } from '../persona/models';

export interface ChequeoPrevioInput {
  numeroRegistro: string;
  fechaNacimiento: string;
}

export interface ConsultarDiscapacidadRespuesta {
  codigo: number;
  cedula?: string;
  apellidos?: string;
  nombres?: string;
  codigoConadis?: string;
  gradoDiscapacidad?: string;
  porcentajeDiscapacidad?: string;
  tipoDiscapacidadPredomina?: string;
  mensaje?: string;
}

export interface ConsultarFlujoMigratorioRespuesta {
  flujosMigratoriosMovimientosDto: FlujoMigratorioMovimientoDto[];
  correcto: boolean;
  codigo: number;
  detalle?: string;
  error?: string;
}

export interface ConsultarMultasRespuesta {
  multaDto: MultaDto;
  correcto: boolean;
  codigo: number;
  detalle?: string;
  error?: string;
}

export interface ConsultarPagoRespuesta {
  codigoBanEcuador: number;
  cuenta?: string;
  fecha?: string;
  mensajeBanEcuador?: string;
  numeroComprobante?: string;
  oficina?: string;
  valor?: string;
}

export interface ConsultarPuntoControlOutput {
  puntoIngresoRegular: boolean;
  correcto: boolean;
}

export interface FlujoMigratorioMovimientoDto {
  apellidosNombres?: string;
  categoriaMigratoria?: string;
  codigoError: number;
  fechaHoraMovimiento?: string;
  fechaNacimiento?: string;
  genero?: string;
  medio?: string;
  motivoViaje?: string;
  nacionalidadDocumentoMovimientoMigratorio?: string;
  numeroDocumentoMovimientoMigratorio?: string;
  paisDestino?: string;
  paisNacimiento?: string;
  paisOrigen?: string;
  paisResidencia?: string;
  puertoRegistro?: string;
  tarjetaAndina?: string;
  tiempoDeclarado?: string;
  tipoDocumentoMovimientoMigratorio?: string;
  tipoMovimiento?: string;
}

export interface InformacionPersonaDto {
  nombres?: string;
  primerApellido?: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  paisNacimiento?: string;
  nacionalidad?: string;
  otraNacionalidad?: string;
  correoElectronico?: string;
  poseeDocumentoIdentidad?: string;
  tipoDocumentoIdentidad?: string;
  numeroDocumentoViaje?: string;
  paisEmisionDocumentoIdentidad?: string;
  fechaEmisionDocumentoIdentidad?: string;
  fechaExpiracionDocumentoIdentidad?: string;
  genero?: string;
  estadoCivil?: string;
  telefono?: string;
  direccion?: string;
  provincia?: string;
  ciudad?: string;
  numeroVisa?: string;
  tipoVisa?: string;
  fechaEmisionVisa?: string;
  fechaExpiracionVisa?: string;
  nivelEducativo?: string;
  profesion?: string;
  ocupacion?: string;
  numeroRegistroPermanencia?: string;
  fotografia: number[];
  huellasDactilares: number[];
  fechaIngresoPais?: string;
  ingresoPorPuntoRegular?: string;
  paisResidenciaPrevia?: string;
  codigoRegistro?: string;
}

export interface MultaDto {
  apellidosNombres?: string;
  fechaNacimiento?: string;
  genero?: string;
  paisNacimiento?: string;
  paisResidencia?: string;
  multas: MultaFlujoMigratorio[];
  notificacionesSalidas: NotificacionSalidaVoluntaria[];
}

export interface MultaFlujoMigratorio {
  codigoError: number;
  estado?: string;
  fechaRegistro?: string;
  tipoMulta?: string;
}

export interface NotificacionSalidaVoluntaria {
  codigoError: number;
  estado?: string;
  fechaRegistro?: string;
}

export interface RegistroPersonaOutput {
  success: boolean;
  error?: string;
  personaDto: PersonaDto;
}

export interface ValidarCodigoVerificacionInput {
  numeroRegistro: string;
  codigoVerificacion: string;
}
