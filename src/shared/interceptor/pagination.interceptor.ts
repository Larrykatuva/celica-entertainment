import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';
import { PaginatedResponse } from '../dto/pagination.dto';

const preparePreviousUrlLink = (
  request: Request,
  url: string,
): string | null => {
  const {
    query: { offset = 0, limit = 10 },
  } = request;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (offset - limit < 0 || offset == 0) return null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const previousOffset = offset - limit;
  return `${url}?limit=${limit}&offset=${previousOffset}`;
};

const prepareNextUrlLink = (
  request: Request,
  count: number,
  url: string,
): string | null => {
  const {
    query: { offset = 0, limit = 10 },
  } = request;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let nextOffset = parseInt(offset) + parseInt(limit);
  console.log(nextOffset, count);
  if (nextOffset > count) nextOffset = count;
  return `${url}?limit=${limit}&offset=${nextOffset}`;
};

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<T, PaginatedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginatedResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const relativeUrl = request.route.path;
    return next.handle().pipe(
      map((data) => ({
        count: data[1],
        next: prepareNextUrlLink(request, data[1], relativeUrl),
        previous: preparePreviousUrlLink(request, relativeUrl),
        data: data[0],
      })),
    );
  }
}
