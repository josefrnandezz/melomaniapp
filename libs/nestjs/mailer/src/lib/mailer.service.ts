import { UserDto } from '@melomaniapp/contracts/user';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventDTO } from '@melomaniapp/contracts/event';

export const MAIL_SERVICE = 'MAIL_SERVICE';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserDto, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.username,
        url,
      },
    });
  }

  async sendEventWasCanceled(emails: string[], event: EventDTO) {
    await this.mailerService.sendMail({
      to: emails,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Evento cancelado',
      template: './cancelado', // `.hbs` extension is appended automatically
      context: {
        name: event.name,
      },
    });
  }
}

export const mailProvider = {
  provide: MAIL_SERVICE,
  useClass: MailService,
};
