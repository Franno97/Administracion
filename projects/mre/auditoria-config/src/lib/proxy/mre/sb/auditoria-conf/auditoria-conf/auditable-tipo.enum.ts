import { mapEnumToOptions } from '@abp/ng.core';

export enum AuditableTipo {
  Entidad = 1,
}

export const auditableTipoOptions = mapEnumToOptions(AuditableTipo);
