import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Extract query ordering filters if any else set the default ordering to id ASC
 */
export const ExtractOrderingFilters = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const {
      query: { order },
    } = request;
    if (order) {
      const keys = order.toString().split(',');
      const orderPattern: any = {};
      keys.map((key) => {
        if (key.charAt(0) == '-') {
          orderPattern[key.substring(1)] = 'DESC';
        } else {
          orderPattern[key] = 'ASC';
        }
      });
      return orderPattern;
    } else {
      return { id: 'ASC' };
    }
  },
);
