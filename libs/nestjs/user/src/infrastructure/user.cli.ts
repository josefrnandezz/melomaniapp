import { delay } from '@melomaniapp/nestjs/common';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command, Console } from 'nestjs-console';
import { v4 as uuid } from 'uuid';

import { CreateUserCommand } from '../application';

@Console({
  command: 'user',
  description: 'Command to manipulate users',
})
export class UserCli {
  private readonly logger = new Logger(UserCli.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Command({
    command: 'add <username> <password> <email>',
    description: 'Create a new admin user',
  })
  async create(username: string, email: string) {
    await this.commandBus.execute(
      new CreateUserCommand(uuid(), username, email, ['ROLE_ADMIN'])
    );

    await delay(2000);

    this.logger.log('User was created');
    process.exit(0);
  }
}
