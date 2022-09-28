import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailService } from './mailer.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtp://localhost:1025',
      defaults: {
        from: '"No Reply" <info@melomaniapp.com>',
      },
      template: {
        dir: join(__dirname, 'assets/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
