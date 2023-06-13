import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PUBLICATION_PACKAGE_NAME,
  PUBLICATION_SERVICE_NAME,
} from './publication.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PUBLICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: PUBLICATION_PACKAGE_NAME,
          protoPath: 'node_modules/proto/proto/publication.proto',
        },
      },
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
