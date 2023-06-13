import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COMMENT_PACKAGE_NAME, COMMENT_SERVICE_NAME } from './comment.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COMMENT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: COMMENT_PACKAGE_NAME,
          protoPath: 'node_modules/proto/proto/comment.proto',
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
