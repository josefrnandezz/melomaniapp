export interface JwtPayloadInterface {
  sub: string;
  email: string;
  picture: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
  return arg && arg.username && arg.roles;
}
