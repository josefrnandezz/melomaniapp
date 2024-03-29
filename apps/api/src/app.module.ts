import {
  EVENTSTORE_KEYSTORE_CONNECTION,
  EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { ArtistModule } from '@melomaniapp/nestjs/artist';
import { AuthModule } from '@melomaniapp/nestjs/auth';
import { EstablishmentModule } from '@melomaniapp/nestjs/establishment';
import { EventModule } from '@melomaniapp/nestjs/event';
import { FollowModule } from '@melomaniapp/nestjs/follow';
import { GenreModule } from '@melomaniapp/nestjs/genre';
import { MailModule } from '@melomaniapp/nestjs/mailer';
import { UserModule } from '@melomaniapp/nestjs/user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { ConsoleModule } from 'nestjs-console';

import { acl } from './app.acl';
import configuration from './app.config';
import { AppLoggerMiddleware } from './app.middleware';
import { appProviders } from './app.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MailModule,
    ConsoleModule,
    CqrsModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27018/melomaniapp',
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      }
    ),
    MongooseModule.forRoot(
      process.env.KEYSTORE_URI || 'mongodb://localhost:27018/keystore',
      {
        connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      }
    ),
    EventStoreModule.forRoot({
      category: process.env.EVENTSTORE_STREAM || 'melomaniapp',
      connection:
        process.env.EVENTSTORE_URL || 'esdb://localhost:2113?tls=false',
    }),
    // Security
    AccessControlModule.forRoles(acl),
    // Project modules
    AuthModule,
    UserModule,
    GenreModule,
    EstablishmentModule,
    ArtistModule,
    EventModule,
    FollowModule,
  ],
  providers: [...appProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
