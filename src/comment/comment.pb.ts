/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "comment";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  text?: string | undefined;
  resourceUrl?: string | undefined;
  publicationId: number;
  user: User | undefined;
  parentCommentId?: number | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface PaginateResponse {
  page: number;
  limit: number;
  totalComments: number;
  totalPages: number;
  comments: Comment[];
}

export interface CommonResponse {
  success: boolean;
  message: string;
  comment: Comment | undefined;
}

/** NewComment */
export interface NewCommentRequest {
  text?: string | undefined;
  resource?: string | undefined;
  userId: number;
  publicationId: number;
  parentComment?: number | undefined;
}

/** UpdateComment */
export interface UpdateCommentRequest {
  id: number;
  text?: string | undefined;
  resource?: string | undefined;
}

/** DeleteComment */
export interface DeleteCommentRequest {
  id: number;
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}

/** GetPublicationComments */
export interface GetPublicationCommentsRequest {
  publicationId: number;
  page: number;
  limit: number;
}

/** GetResponseComments */
export interface GetResponseCommentsRequest {
  parentCommentId: number;
  page: number;
  limit: number;
}

export const COMMENT_PACKAGE_NAME = "comment";

export interface CommentServiceClient {
  newComment(request: NewCommentRequest): Observable<CommonResponse>;

  updateComment(request: UpdateCommentRequest): Observable<CommonResponse>;

  deleteComment(request: DeleteCommentRequest): Observable<DeleteCommentResponse>;

  getPublicationComments(request: GetPublicationCommentsRequest): Observable<PaginateResponse>;

  getResponseComments(request: GetResponseCommentsRequest): Observable<PaginateResponse>;
}

export interface CommentServiceController {
  newComment(request: NewCommentRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  updateComment(request: UpdateCommentRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  deleteComment(
    request: DeleteCommentRequest,
  ): Promise<DeleteCommentResponse> | Observable<DeleteCommentResponse> | DeleteCommentResponse;

  getPublicationComments(
    request: GetPublicationCommentsRequest,
  ): Promise<PaginateResponse> | Observable<PaginateResponse> | PaginateResponse;

  getResponseComments(
    request: GetResponseCommentsRequest,
  ): Promise<PaginateResponse> | Observable<PaginateResponse> | PaginateResponse;
}

export function CommentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "newComment",
      "updateComment",
      "deleteComment",
      "getPublicationComments",
      "getResponseComments",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CommentService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CommentService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMMENT_SERVICE_NAME = "CommentService";
