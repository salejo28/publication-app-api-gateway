import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  User,
  USER_SERVICE_NAME,
  UpdateUserRequest,
  CommonResponse,
  UserServiceClient,
} from './user.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '@/auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController implements OnModuleInit {
  private svc: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Put()
  @UseGuards(AuthGuard)
  private async updateUser(
    @Body() body: UpdateUserRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.updateUser(body);
  }

  @Get()
  @UseGuards(AuthGuard)
  private async getUser(
    @Req() req: Request & { user: number },
  ): Promise<Observable<User>> {
    return this.svc.getUser({ id: req.user });
  }

  @Get('getUser/:uid')
  @UseGuards(AuthGuard)
  private async getUserById(@Req() req: Request) {
    return this.svc.getUserById({ id: +req.params.uid });
  }
}
