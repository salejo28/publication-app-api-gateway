/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { ICommonResponse } from '@/types';

export const protobufPackage = 'auth';

export interface RegisterRequest {
  username: string;
  full_name: string;
  email: string;
  password: string;
}

export type RegisterResponse = ICommonResponse;

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = ICommonResponse;

export interface RefreshTokenRequest {
  refresh_token: string;
}

export type RefreshTokenResponse = ICommonResponse;

export interface LogoutRequest {
  access_token: string;
}

export interface LogoutResponse {
  success: boolean;
}

export interface RecoveryPasswordRequest {
  password: string;
}

export interface RecoveryPasswordResponse {
  success: boolean;
  message: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;
  login(request: LoginRequest): Observable<LoginResponse>;
  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;
  logout(request: LogoutRequest): Observable<LogoutResponse>;
  recoveryPassword(
    request: RecoveryPasswordRequest,
  ): Observable<RecoveryPasswordResponse>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest,
  ):
    | Promise<RegisterResponse>
    | Observable<RegisterResponse>
    | RegisterResponse;
  login(
    request: LoginRequest,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;
  refreshToken(
    request: RefreshTokenRequest,
  ):
    | Promise<RecoveryPasswordResponse>
    | Observable<RefreshTokenResponse>
    | RefreshTokenResponse;
  logout(
    request: LogoutRequest,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;
  recoveryPassword(
    request: RecoveryPasswordRequest,
  ):
    | Promise<RecoveryPasswordResponse>
    | Observable<RecoveryPasswordResponse>
    | RecoveryPasswordResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'refreshToken', 'logout', 'recoveryPassword'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
