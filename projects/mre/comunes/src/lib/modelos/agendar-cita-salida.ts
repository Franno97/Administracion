import { CreateUpdateCitaDto } from "@mre/cita/proxy/cita";

export interface AgendarCitaSalida {
    datos: CreateUpdateCitaDto;
    formularioValido: boolean;
}