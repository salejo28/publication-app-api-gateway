/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "publication";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  id: number;
  text?: string | undefined;
  resourceUrl?: string | undefined;
  user: User | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface PaginateResponse {
  page: number;
  limit: number;
  totalPublications: number;
  totalPages: number;
  publications: Publication[];
}

export interface CommonResponse {
  success: boolean;
  message: string;
  publication: Publication | undefined;
}

/** CreatePublication */
export interface CreatePublicationRequest {
  text?:
    | string
    | undefined;
  /** Comming in base64 */
  resource?: string | undefined;
  userId: number;
}

/** UpdatePublicationPublication */
export interface UpdatePublicationRequest {
  id: number;
  text?:
    | string
    | undefined;
  /** Comming in base64 */
  resource?: string | undefined;
}

/** DeletePublicationRequest */
export interface DeletePublicationRequest {
  id: number;
}

export interface DeletePublicationResponse {
  success: boolean;
  message: string;
}

/** GetPublicationsRequest */
export interface GetPublicationsRequest {
  page: number;
  limit: number;
}

/** GetPublicationsByUser */
export interface GetPublicationsByUserRequest {
  userId: number;
  page: number;
  limit: number;
}

/** GetPublicationByIdRequest */
export interface GetPublicationByIdRequest {
  id: number;
}

export const PUBLICATION_PACKAGE_NAME = "publication";

export interface PublicationServiceClient {
  createPublication(request: CreatePublicationRequest): Observable<CommonResponse>;

  updatePublication(request: UpdatePublicationRequest): Observable<CommonResponse>;

  deletePublication(request: DeletePublicationRequest): Observable<DeletePublicationResponse>;

  getPublications(request: GetPublicationsRequest): Observable<PaginateResponse>;

  getPublicationsByUser(request: GetPublicationsByUserRequest): Observable<PaginateResponse>;

  getPublicationById(request: GetPublicationByIdRequest): Observable<Publication>;
}

export interface PublicationServiceController {
  createPublication(
    request: CreatePublicationRequest,
  ): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  updatePublication(
    request: UpdatePublicationRequest,
  ): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  deletePublication(
    request: DeletePublicationRequest,
  ): Promise<DeletePublicationResponse> | Observable<DeletePublicationResponse> | DeletePublicationResponse;

  getPublications(
    request: GetPublicationsRequest,
  ): Promise<PaginateResponse> | Observable<PaginateResponse> | PaginateResponse;

  getPublicationsByUser(
    request: GetPublicationsByUserRequest,
  ): Promise<PaginateResponse> | Observable<PaginateResponse> | PaginateResponse;

  getPublicationById(request: GetPublicationByIdRequest): Promise<Publication> | Observable<Publication> | Publication;
}

export function PublicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createPublication",
      "updatePublication",
      "deletePublication",
      "getPublications",
      "getPublicationsByUser",
      "getPublicationById",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PublicationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PublicationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PUBLICATION_SERVICE_NAME = "PublicationService";
