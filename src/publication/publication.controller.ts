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
  CreatePublicationRequest,
  DeletePublicationRequest,
  PUBLICATION_SERVICE_NAME,
  PaginateResponse,
  PublicationServiceClient,
  UpdatePublicationRequest,
  CommonResponse,
} from './publication.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@/auth/auth.guard';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ICommonResponse } from '@/types';

@Controller('publication')
export class PublicationController implements OnModuleInit {
  private svc: PublicationServiceClient;

  @Inject(PUBLICATION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<PublicationServiceClient>(
      PUBLICATION_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createPublication(
    @Body() body: CreatePublicationRequest,
    @Req() req: Request & { user: number },
  ): Promise<Observable<CommonResponse>> {
    return this.svc.createPublication({ ...body, userId: req.user });
  }

  @Put()
  @UseGuards(AuthGuard)
  private async updatePublication(
    @Body() body: UpdatePublicationRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.updatePublication(body);
  }

  @Delete()
  @UseGuards(AuthGuard)
  private async deletePublication(
    @Body() body: DeletePublicationRequest,
  ): Promise<Observable<ICommonResponse>> {
    return this.svc.deletePublication(body);
  }

  @Get('?')
  private async getPublications(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Observable<PaginateResponse>> {
    return this.svc.getPublications({ page, limit });
  }

  @Get('byUser/:user_id?')
  private async getPublicationsByUser(
    @Param('user_id') user_id: number,
    @Query('number') page: number,
    @Query('limit') limit: number,
  ): Promise<Observable<PaginateResponse>> {
    return this.svc.getPublicationsByUser({ userId: user_id, page, limit });
  }

  @Get(':publication_id')
  private async getPublicationById(
    @Param('publication_id') publication_id: number,
  ) {
    return this.svc.getPublicationById({ id: publication_id });
  }
}
