import { Domicilio } from "./domicilio";
import { Pasaporte } from "./pasaporte";
import { Visa } from "./visa";

export interface Beneficiario {
    id:string;
    carnetConadis:string;
    ciudadNacimiento:string;
    codigoMDG:string;
    correo:string;
    domicilio:Domicilio
    domicilioId:string;
    edad:string;
    estadoCivil:string;
    fechaNacimiento:Date;
    foto:string;
    genero:string;
    isDeleted:string;
    nacionalidad:string;
    nacionalidadId:string;
    nombres:string;
    paisNacimiento:string;

    pasaporte:Pasaporte;
    pasaporteId:string;

    porcentajeDiscapacidad:number;
    poseeDiscapacidad:boolean;
    primerApellido:string;
    segundoApellido:string;
    ocupacion:string;
    visa:Visa;
    visaId:string;

    
}



