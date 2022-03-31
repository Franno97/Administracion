import { mapEnumToOptions } from '@abp/ng.core';

export enum EstadoCita {
  Registrado = 1,
  Atendido = 2,
  Cancelado = 3,
  Caducado = 4,
}

export const estadoCitaOptions = mapEnumToOptions(EstadoCita);
