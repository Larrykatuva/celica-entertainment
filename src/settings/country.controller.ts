import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryDto, CountryResponse } from './country.dto';
import { Country } from './entities/country.entity';
import { ExtractPaginationFilters } from '../shared/decorators/pagination.decorators';
import { PaginationInterface } from '../shared/interfaces/pagination.interface';
import { ExtractOrderingFilters } from '../shared/decorators/ordering.decorator';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedResponsePipe } from '../shared/pipes/paginationResponse.pipe';
import { PaginationInterceptor } from '../shared/interceptor/pagination.interceptor';

@ApiTags('Settings')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('country')
  async createCountry(@Body() countryDto: CountryDto): Promise<CountryDto> {
    return await this.countryService.createCountry(countryDto);
  }

  @Get('countries')
  @PaginatedResponsePipe(CountryResponse)
  @UseInterceptors(PaginationInterceptor)
  async listCountries(
    @ExtractPaginationFilters() pagination: PaginationInterface,
    @ExtractOrderingFilters() ordering: any,
  ): Promise<[Country[], number]> {
    return await this.countryService.filterCounties(ordering, pagination);
  }

  @Get('country/:id')
  async getCountry(@Param() id: string): Promise<Country> {
    const country = await this.countryService.getCountry({ id: id });
    if (!country)
      throw new HttpException(
        'Country matching id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    return country;
  }

  @Patch('country/:id')
  async updateCountry(
    @Param() id: string,
    @Body() country: Partial<Country>,
  ): Promise<Country> {
    await this.countryService.updateCountryById(id, country);
    return this.countryService.getCountry({ id: id });
  }

  @Delete('country/:id')
  async deleteCountry(@Param() id: string): Promise<DeleteResult> {
    return await this.countryService.deleteCountry({ id: id });
  }
}
