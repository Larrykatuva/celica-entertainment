import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Extract request pagination query parameters.
 */
export const ExtractPaginationFilters = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const {
      query: { limit = 10, offset = 0 },
    } = request;
    return {
      skip: parseInt(offset.toString()),
      take: parseInt(limit.toString()),
    };
  },
);
