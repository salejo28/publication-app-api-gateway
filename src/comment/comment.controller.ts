import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  COMMENT_SERVICE_NAME,
  CommentServiceClient,
  DeleteCommentRequest,
  NewCommentRequest,
  PaginateResponse,
  CommonResponse,
  UpdateCommentRequest,
} from './comment.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@/auth/auth.guard';
import { Observable } from 'rxjs';
import { ICommonResponse } from '@/types';
import { Request } from 'express';

@Controller('comment')
export class CommentController implements OnModuleInit {
  private svc: CommentServiceClient;

  @Inject(COMMENT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<CommentServiceClient>(COMMENT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async newComment(
    @Body() body: NewCommentRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.newComment(body);
  }

  @Put()
  @UseGuards(AuthGuard)
  private async updateComment(
    @Body() body: UpdateCommentRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.updateComment(body);
  }

  @Delete()
  @UseGuards(AuthGuard)
  private async deleteComment(
    @Body() body: DeleteCommentRequest,
  ): Promise<Observable<ICommonResponse>> {
    return this.svc.deleteComment(body);
  }

  @Get(':publication_id?')
  @UseGuards(AuthGuard)
  private async getPublicationComments(
    @Param('publication_id') publication_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Observable<PaginateResponse>> {
    return this.svc.getPublicationComments({
      publicationId: publication_id,
      page,
      limit,
    });
  }

  @Get('response_comment/:parent_comment_id?')
  @UseGuards(AuthGuard)
  private async getResponseComments(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Observable<PaginateResponse>> {
    return this.svc.getResponseComments({
      limit,
      page,
      parentCommentId: +req.params.parent_comment_id,
    });
  }
}
