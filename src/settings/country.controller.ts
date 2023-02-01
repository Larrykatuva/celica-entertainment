import { Body, Controller, Get, Post } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryDto } from './country.dto';
import { Country } from './entities/country.entity';
import { ExtractPaginationFilters } from '../shared/decorators/pagination.decorators';
import { PaginationInterface } from '../shared/interfaces/pagination.interface';
import { ExtractOrderingFilters } from '../shared/decorators/ordering.decorator';

@Controller('settings')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('country')
  async createCountry(@Body() countryDto: CountryDto): Promise<CountryDto> {
    return await this.countryService.createCountry(countryDto);
  }

  @Get('countries')
  async listCountries(
    @ExtractPaginationFilters() pagination: PaginationInterface,
    @ExtractOrderingFilters() ordering: any,
  ): Promise<[Country[], number]> {
    return await this.countryService.filterCounties(ordering, pagination);
  }
}
