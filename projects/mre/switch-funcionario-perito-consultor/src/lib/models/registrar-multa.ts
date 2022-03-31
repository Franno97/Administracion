import { Multa } from "./multa";

export interface RegistrarMulta {
    tramiteId:string,
    usuarioId:string,
    listaDetalleMultas:Array<Multa>
}
