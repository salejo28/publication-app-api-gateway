import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  CommonResponse,
  LogoutResponse,
  RecoveryPasswordRequest,
  RecoveryPasswordResponse,
  RegisterRequest,
} from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http2';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.login(body);
  }

  @Post('refresh_token')
  @UseGuards(AuthGuard)
  private async refreshToken(
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<CommonResponse>> {
    return this.svc.refreshToken({
      refreshToken: headers.authorization ?? '',
    });
  }

  @Post('recovery_password')
  private async recoveryPassword(
    @Body() body: RecoveryPasswordRequest,
  ): Promise<Observable<RecoveryPasswordResponse>> {
    return this.svc.recoveryPassword(body);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  private async logout(
    @Headers() headers: IncomingHttpHeaders,
  ): Promise<Observable<LogoutResponse>> {
    return this.svc.logout({ accessToken: headers.authorization ?? '' });
  }
}
