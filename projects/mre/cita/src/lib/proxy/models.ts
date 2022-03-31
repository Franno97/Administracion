import { mapEnumToOptions } from '@abp/ng.core';

export enum EstadoCita {
  Registrado = 1,
  Atendido = 2,
  Cancelado = 3,
  Caducado = 4,
}

export const estadoCitaOptions = mapEnumToOptions(EstadoCita);

export interface Descanso {
  descansos: Horario[];
}

export interface Horario {
  inicio?: string;
  fin?: string;
}

export interface PlanDiario {
  dia?: string;
  horario: Horario;
  descanso: Descanso;
}

export interface PlanSemanal {
  configuraciones: PlanDiario[];
}
