import { UserDto } from '@melomaniapp/contracts/user';
import { Role } from '../constants';

const anonymousUser = () => new UserDto({ roles: [Role.User] });

export default anonymousUser;
