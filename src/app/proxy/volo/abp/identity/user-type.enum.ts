import { mapEnumToOptions } from '@abp/ng.core';

export enum UserType {
  Internal = 1,
  External = 2,
}

export const userTypeOptions = mapEnumToOptions(UserType);
