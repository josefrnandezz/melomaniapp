import { IQuery } from '@nestjs/cqrs';

export class GetGenreQuery implements IQuery {
  constructor(public readonly id: string) {}
}
