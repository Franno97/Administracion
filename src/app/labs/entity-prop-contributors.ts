// src/app/entity-prop-contributors.ts

import {
  eIdentityComponents,
  IdentityEntityPropContributors,
  IdentityUserDto,
} from '@abp/ng.identity';
import { EntityProp, EntityPropList, ePropType } from '@abp/ng.theme.shared/extensions';

import { of } from 'rxjs';

const nameProp = new EntityProp<IdentityUserDto>({
  type: ePropType.String,
  name: 'name',
  displayName: 'AbpIdentity::Name.NewColumn',
  sortable: true,
  columnWidth: 250,
  valueResolver: data => {
    const name = data.record.name || '';
    return of(name.toUpperCase());
  },
});

export function namePropContributor(propList: EntityPropList<IdentityUserDto>) {
  propList.addBefore(nameProp, 'userName', (value, name) => value.name === name);
}


const fooProp = new EntityProp<IdentityUserDto>({
  type: ePropType.String,
  name: 'foo',
  displayName: 'AbpIdentity::Name.foo',
  sortable: true,
  columnWidth: 250
});

export function fooPropContributor(propList: EntityPropList<IdentityUserDto>) {
  propList.addBefore(fooProp, 'userName', (value, name) => value.name === name);
}

const isActiveProp = new EntityProp<IdentityUserDto>({
  type: ePropType.Boolean,
  name: 'isActive',
  displayName: '::isActive',
  sortable: true,
  columnWidth: 250
});

export function isActiveContributor(propList: EntityPropList<IdentityUserDto>) {
  propList.addBefore(isActiveProp, 'userName', (value, name) => value.name === name);
}




export const identityEntityPropContributors: IdentityEntityPropContributors = {
  // enum indicates the page to add contributors to
  [eIdentityComponents.Users]: [
    //namePropContributor,
    //fooPropContributor
    isActiveContributor
    // You can add more contributors here
  ],
};

