import { Inject, Injectable } from '@nestjs/common';
import {
  PUBLICATION_SERVICE_NAME,
  PublicationServiceClient,
} from './publication.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PublicationService {
  private svc: PublicationServiceClient;

  @Inject(PUBLICATION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<PublicationServiceClient>(
      PUBLICATION_SERVICE_NAME,
    );
  }
}
