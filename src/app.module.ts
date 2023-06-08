import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, UserModule, PublicationModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
