import { Resource, Role } from '@melomaniapp/nestjs/common';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

// prettier-ignore
acl
  .grant(Role.User)
    .createAny(Resource.Establishment)
    .readAny(Resource.Establishment)
    .createAny(Resource.Artist)
    .readAny(Resource.Artist)
  .grant(Role.EstablishmentOwner)
    .updateOwn(Resource.Establishment)
    .deleteOwn(Resource.Establishment)
  .grant(Role.UserOwner)
    .readOwn(Resource.User)
  .grant(Role.Admin)
    .inherit(Role.User)
    .inherit(Role.EstablishmentOwner)
    .inherit(Role.UserOwner)
