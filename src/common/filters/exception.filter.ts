import { ArgumentsHost, BadRequestException, Catch, ConflictException, ExceptionFilter, HttpException, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommonApiResponse } from "../base/base-api-response.dto";
import { ResponseCode } from "../constants";
import { Exception } from "../exceptions/exception";
import { Request, Response } from "express";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { isArray, isObject } from "class-validator";

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ){}

    public catch(exception: Error, host: ArgumentsHost) {
        const request: Request = host.switchToHttp().getRequest();
        const response: Response = host.switchToHttp().getResponse<Response>();

        let errorResponse: CommonApiResponse<unknown> = CommonApiResponse.error(ResponseCode.INTERNAL_ERROR.code, exception.message);
        
        errorResponse = this.handleNestError(exception, errorResponse);
        errorResponse = this.handleCoreException(exception, errorResponse);
        this.logger.error(JSON.stringify(errorResponse));
        response.statusCode = errorResponse.code;
        response.json(errorResponse);
    }

    private handleNestError(error: Error, errorResponse: CommonApiResponse<unknown>): CommonApiResponse<unknown> {
        if (error instanceof HttpException) {
          errorResponse = CommonApiResponse.error(error.getStatus(), error.message, null);
        }
        if (error instanceof UnauthorizedException) {
          errorResponse = CommonApiResponse.error(
            ResponseCode.UNAUTHORIZED_ERROR.code, 
            error.message ? error.message : ResponseCode.UNAUTHORIZED_ERROR.message, 
            null);
        }
        if(error instanceof ConflictException) {
          errorResponse = CommonApiResponse.error(
            ResponseCode.CONFLICT_ERROR.code, 
            error.message ? error.message : ResponseCode.CONFLICT_ERROR.message, 
            null);
        }
        if(error instanceof BadRequestException) {
          console.log("Error get response: ", error.getResponse())
          console.log("error message: ", error)
          errorResponse = CommonApiResponse.error(
            ResponseCode.BAD_REQUEST_ERROR.code, 
            error.getResponse()["error"] ?? ResponseCode.BAD_REQUEST_ERROR.message, 
            isObject(error.getResponse()) ? error.getResponse()["message"] : null);
        }
        if(error instanceof NotFoundException) {
          errorResponse = CommonApiResponse.error(
            ResponseCode.NOT_FOUND_ERROR.code, 
            error.message ? error.message : ResponseCode.NOT_FOUND_ERROR.message, 
            null);
        }
        return errorResponse;
      }
      
    private handleCoreException(error: Error, errorResponse: CommonApiResponse<unknown>): CommonApiResponse<unknown> {
        if (error instanceof Exception) {
          errorResponse = CommonApiResponse.error(error.code, error.message, error.data);
        }
        return errorResponse;
    }
}