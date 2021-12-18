import { Resource, Role } from '@melomaniapp/nestjs/common';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

// prettier-ignore
acl
  .grant(Role.User)
    .createOwn(Resource.Establishment)
    .readAny(Resource.Establishment)
  .grant(Role.EstablishmentOwner)
    .updateOwn(Resource.Establishment)
    .deleteOwn(Resource.Establishment)
  .grant(Role.Admin)
    .inherit(Role.EstablishmentOwner)