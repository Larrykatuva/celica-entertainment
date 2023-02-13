import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  @ApiProperty()
  count: number;

  @ApiProperty()
  next?: string;

  @ApiProperty()
  previous?: string;

  @ApiProperty()
  data: T[];
}

export class ErrorResponse {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;
}