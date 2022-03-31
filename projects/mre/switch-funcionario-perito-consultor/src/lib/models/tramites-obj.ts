import { Beneficiario } from "./beneficiario";
import { Documento } from "./documento";
import { Movimiento } from "./movimiento";
import { MovimientoRequest } from "./movimiento-request";
import { Solicitante } from "./solicitante";
import { SoporteGestion } from "./soporte-gestion";

export interface TramitesObj {
    actividad:string;

    beneficiario:Beneficiario
    beneficiarioId:string;

    calidadMigratoria:string;
    created:string;
    creatorId:string;
    
    documentos:Array<Documento>;
    
    fecha:string;
    grupo:string;
    id:string;
    isDelete:boolean;
    lastModifierdId:string;
    
    movimientos:Array<MovimientoRequest>;
    
    numero:string;
    
    solicitante:Solicitante;
    solicitanteId:string;
    
    soporteGestiones:Array<SoporteGestion>
    
    tipoVisa:string;
}
