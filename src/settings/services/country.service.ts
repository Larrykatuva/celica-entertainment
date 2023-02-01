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

  async getCountry(
    filterOptions: Partial<Country>,
    relations?: any,
  ): Promise<Country> {
    return await this.countryRepository.findOneBy({
      ...filterOptions,
      ...relations,
    });
  }

  async updateCountry(
    filterOptions: Partial<Country>,
    updateFields: CountryDto,
  ): Promise<UpdateResult> {
    return await this.countryRepository.update(
      { ...filterOptions },
      { ...updateFields },
    );
  }

  async deleteCountry(filterOptions: Partial<Country>): Promise<DeleteResult> {
    return await this.countryRepository.delete({ ...filterOptions });
  }
}
