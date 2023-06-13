import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_SERVICE_NAME, CommentServiceClient } from './comment.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CommentService {
  private svc: CommentServiceClient;

  @Inject(COMMENT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<CommentServiceClient>(COMMENT_SERVICE_NAME);
  }
}
