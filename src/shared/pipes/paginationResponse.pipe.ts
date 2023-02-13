/**
 * Response swagger dto for pagnated request from universal bill service.
 * @param dto
 * @constructor
 */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse, PaginatedResponse } from '../dto/pagination.dto';

export const PaginatedResponsePipe = <T extends Type<any>>(dto: T) => {
  return applyDecorators(
    ApiQuery({ name: 'limit', type: String, required: false }),
    ApiQuery({ name: 'offset', type: String, required: false }),
    ApiExtraModels(PaginatedResponse, dto),
    ApiOkResponse({
      description: 'Successful request',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dto) },
              },
            },
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden.',
      type: ErrorResponse,
    }),
    ApiBadRequestResponse({
      description: 'Bad request',
      type: ErrorResponse,
    }),
  );
};
