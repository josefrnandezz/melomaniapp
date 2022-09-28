import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EventDTO } from '@melomaniapp/contracts/event';

export const MAIL_SERVICE = 'MAIL_SERVICE';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEventWasCanceled(emails: string[], event: EventDTO) {
    await this.mailerService.sendMail({
      to: emails,
      subject: 'Evento cancelado',
      template: './event-canceled',
      context: {
        name: event.name,
      },
    });
  }

  async sendArtistFollowedArtist(
    email: string,
    artistInfo: { id: string; name: string }
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Nueva conexión!',
      template: './artist-follow-artist',
      context: {
        name: artistInfo.name,
        url: `http://localhost:3000/artists/${artistInfo.id}`,
      },
    });
  }
}

export const mailProvider = {
  provide: MAIL_SERVICE,
  useClass: MailService,
};
