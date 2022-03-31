export interface PagoDetalleDto {
  id: string;
  isDeleted: boolean;
  lastModified: string;
  lastModifierId: string;
  created: string;
  creatorId: string;
  idTramite: string;
  idPago: string;
  orden: number;
  descripcion: string;
  valorArancel: number;
  porcentajeDescuento: number;
  valorDescuento: number;
  valorTotal: number;
  estado: string;
  ordenPago: string;
  numeroTransaccion: string;
  estaFacturado: boolean;
  claveAcceso: string;
  comprobantePago: string;
  partidaArancelariaId: string;
  servicioId: string;
  servicio: string;
  partidaArancelaria: string;
  numeroPartida: string;
  jerarquiaArancelariaId: string;
  jerarquiaArancelaria: string;
  arancelId: string;
  arancel: string;
  convenioId: string;
  tipoServicio: string;
  tipoExoneracionId: string;
  tipoExoneracion: string;
  facturarEn: string;
}

export interface PagoDto {
  id: string;
  servicioId: string;
  tramiteId: string;
  formaPago: number;
  estado: string;
  observacion: string;
  documentoIdentificacion: string;
  pagoDetalles: PagoDetalleDto[];
}

  export interface OrdenCedulacionDto {
    personaId: string;
    unidadAdministrativaId: string;
    tipoVisaId: string;
    tipoVisa: string;
    numero: string;
    codigoVerificacion: string;
    fotografia: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    nacionalidad: string;
    paisNacimiento: string;
    ciudadNacimiento: string;
    fechaNacimiento: string;
    sexo: string;
    estadoCivil: string;
    apellidosConyuge: string;
    nombresConyuge: string;
    nacionalidadConyuge: string;
    categoriaVisaId: string;
    numeroVisa: string;
    fechaOtorgamientoVisa: string;
    tiempoVigenciaVisa: string;
    unidadOtorgamientoVisa: string;
    fechaEmision: string;
    validez: number;
    tramiteId: string;
    pagoId: string;
    numeroTransaccion: string;
    rutaAlmacenamientoFactura: string;
    rutaAlmacenamientoOrdenCedulacion: string;
}

export interface FinalizarTramiteResponse {
  mensaje: string;
}

export interface FinalizarTramiteRequest {
  tramiteId: string;
}

export interface FacturarServicioRequest {
  tramiteId: string;
  pagoId: string;
}


export interface FacturarServicioResponse {
  numeroOrden: string;
  codigoVerificacion: string;
  numeroTransaccion: string;
  rutaAlmacenamientoFactura: string;
  numeroFactura: string;
  estadoOrden: number;
}

export interface GenerarOrdenCedulacionRequest {
  tramiteId: string;
  pagoId: string;
  conyugePrimerApellido: string;
  conyugeSegundoApellido: string;
  conyugeNombres: string;
  conyugeNacionalidadCodigo: string;
  conyugeNacionalidad: string;
  conyugeCorreoElectronico: string;
  observacion: string;
  usuarioId: string;
}

export interface GenerarOrdenCedulacionResponse {
  numeroOrden: string;
  codigoVerificacion: string;
  numeroTransaccion: string;
  ordenCedulacion: string;
}

export interface CatalogoDto {
  id: string;
  catalogoCabeceraId: string;
  codigo: string;
  descripcion: string;
  descripcion2: string;
  codigoEsigex: string;
  codigoMdg: string;
  codigoOtro: string;
}

///
export interface Tramite {
  numero: string;
  fecha: string;
  actividad: string;
  beneficiario: Beneficiario;
  beneficiarioId: string;
  calidadMigratoria: string;
  documentos: Documento[];
  grupo: string;
  solicitante: Solicitante;
  solicitanteId: string;
  tipoVisa: string;
  unidadAdministrativaIdCEV: string;
  unidadAdministrativaIdZonal: string;
  soporteGestiones: SoporteGestion[];
  movimientos: Movimiento[];
  servicioId: string;
  codigoPais: string;
  personaId: string;
  origenId: string;
  tipoTramite: string;
}

export interface Beneficiario {
  tipoCiudadano: TipoCiudadanoEnum;
  ciudadNacimiento: string;
  codigoMDG: string;
  correo: string;
  domicilio: Domicilio;
  domicilioId: string;
  edad: number;
  estadoCivil: string;
  fechaNacimiento: string;
  foto: string;
  genero: string;
  ocupacion: string;
  nacionalidadId: string;
  nacionalidad: string;
  nombres: string;
  paisNacimiento: string;
  pasaporte: Pasaporte;
  pasaporteId: string;
  poseeDiscapacidad: boolean;
  porcentajeDiscapacidad: number;
  carnetConadis: string;
  fechaEmisionConadis: string;
  fechaCaducidadConadis: string;
  primerApellido: string;
  segundoApellido: string;
  visa: Visa;
  visaId: string;
}

export interface Solicitante {
  identificacion: string;
  tipoIdentificacion: string;
  ciudad: string;
  consuladoNombre: string;
  consuladoPais: string;
  direccion: string;
  edad: number;
  nacionalidad: string;
  nombres: string;
  pais: string;
  telefono: string;
  correo: string;
}

export interface Documento {
    tramiteId: string;
    nombre: string;
    ruta: string;
    observacion: string;
    tipoDocumento: string;
    iconoNombre: string;
    imagenNombre: string;
    descripcionDocumento: string;
    estadoProceso: boolean;
}


export interface SoporteGestion {
    tramiteId: string;
    nombre: string;
    descripcion: string;
    ruta: string;
}


export interface Movimiento {
    tramiteId: string;
    orden: number;
    usuarioId: string;
    estado: string;
    nombreEstado: string;
    vigente: boolean;
    nombreRol: string;
    unidadAdministrativaId: string;
    observacionDatosPersonales: string;
    observacionDomicilios: string;
    observacionSoportesGestion: string;
    observacionMovimientoMigratorio: string;
    observacionMultas: string;
    diasTranscurridos: number;
    fechaHoraCita: string | null;
}

export enum TipoCiudadanoEnum {
  Titular,
  Conyuge,
  Hijo
}

export interface Domicilio {
  ciudad: string;
  direccion: string;
  pais: string;
  provincia: string;
  telefonoCelular: string;
  telefonoDomicilio: string;
  telefonoTrabajo: string;
}

export interface Pasaporte {
    ciudadEmision: string;
    fechaEmision: string;
    fechaExpiracion: string;
    fechaNacimiento: string;
    nombres: string;
    numero: string;
    paisEmision: string;
    tipoDocumentoIdentidadId: string;
}

export interface Visa {
  poseeVisa: boolean;
  confirmacionVisa: boolean;
  estadoVisa: string;
  fechaCaducidad: string;
  fechaConcesion: string;
  idActoConsularVisa: string;
  idCentroAdministrativo: string;
  idPersona: string;
  idTramite: string;
  nombreActoConsularVisa: string;
  nombreCentroAdministrativo: string;
  nombres: string;
  numeroPasaporte: string;
  numeroVisa: string;
  primerApellido: string;
  segundoApellido: string;
}