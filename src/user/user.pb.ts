/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommonResponse {
  success: boolean;
  message: string;
  user: User | undefined;
}

/** UpdateUser */
export interface UpdateUserRequest {
  id: number;
  username?: string | undefined;
  email?: string | undefined;
  fullName?: string | undefined;
  file?: string | undefined;
}

/** GetUser */
export interface GetUserRequest {
  id: number;
}

/** GetUserById */
export interface GetUserByIdRequest {
  id: number;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  updateUser(request: UpdateUserRequest): Observable<CommonResponse>;

  getUser(request: GetUserRequest): Observable<User>;

  getUserById(request: GetUserByIdRequest): Observable<User>;
}

export interface UserServiceController {
  updateUser(request: UpdateUserRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  getUser(request: GetUserRequest): Promise<User> | Observable<User> | User;

  getUserById(request: GetUserByIdRequest): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["updateUser", "getUser", "getUserById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
