import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CountryDto } from '../country.dto';
import { PaginationInterface } from '../../shared/interfaces/pagination.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  /**
   * Create a country if it does not exist.
   * @param country
   */
  async createCountry(country: CountryDto): Promise<Country> {
    if (
      await this.countryRepository.findOneBy({
        code: country.code,
        name: country.name,
      })
    )
      throw new HttpException('Country already exists', HttpStatus.BAD_REQUEST);
    return await this.countryRepository.save(country);
  }

  /**
   * Get a paginated list of countries.
   * Can also join optional tables which are passed as an object.
   * @param ordering
   * @param pagination
   * @param filterOptions
   * @param relations
   */
  async filterCounties(
    ordering: any,
    pagination: PaginationInterface = { skip: 0, take: 10 },
    filterOptions?: Partial<Country>,
    relations?: any,
  ): Promise<[Country[], number]> {
    return await this.countryRepository.findAndCount({
      ...pagination,
      ...filterOptions,
      ...relations,
    });
  }

  /**
   * Get a country by filter options.
   * Can also join optional tables which are passed as an object.
   * @param filterOptions
   * @param relations
   */
  async getCountry(
    filterOptions: Partial<Country>,
    relations?: any,
  ): Promise<Country> {
    return await this.countryRepository.findOneBy({
      ...filterOptions,
      ...relations,
    });
  }

  /**
   * Update country matching filter options by update fields.
   * @param filterOptions
   * @param updateFields
   */
  async updateCountry(
    filterOptions: any,
    updateFields: CountryDto,
  ): Promise<UpdateResult> {
    return await this.countryRepository.update(
      { ...filterOptions },
      { ...updateFields },
    );
  }

  /**
   * Update country by id.
   * @param id
   * @param country
   */
  async updateCountryById(
    id: string,
    country: Partial<Country>,
  ): Promise<UpdateResult> {
    if (!(await this.getCountry({ id: id })))
      throw new HttpException(
        'Country matching the id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    return await this.countryRepository.update({ id: id }, { ...country });
  }

  async deleteCountry(filterOptions: Partial<Country>): Promise<DeleteResult> {
    return await this.countryRepository.delete({ ...filterOptions });
  }
}
