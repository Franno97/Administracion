// Modelo para mostrar los datos del beneficiario
export interface DatosBeneficiarioModelo {
    fechaSolicitud: string;
    primerApellido: string;
    segundoApellido: string;
    nombreCompleto: string;
    numeroMdg: string;
    nacionalidad: string;
    fechaNacimiento: string;
    edad: number;
    ciudadNacimiento: string;
    estadoCivil: string;
    genero: string;
    correoElectronico: string;
    calidadMigratoria: string;
    grupo: string;
    tipoVisa: string;
    actividadDesarrollar: string;
    tieneDiscapacidad: string;
    porcientoDiscapacidad: number;
    numeroCarnetConadis: string;
}