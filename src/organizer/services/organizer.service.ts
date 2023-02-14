import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Organizer } from '../entities/organizer.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizerDto } from '../dto/organizer.dto';
import { CountryService } from '../../settings/services/country.service';
import { UserService } from '../../authentication/services/user.service';
import { PaginationInterface } from '../../shared/interfaces/pagination.interface';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>,
    private readonly countryService: CountryService,
    private readonly userService: UserService,
  ) {}

  /**
   * Register organizer.
   * Set is kyc to false for pending kyc documents.
   * @param createOrganizerDto
   * @param userId
   * @param countryId
   */
  async createOrganizer(
    createOrganizerDto: CreateOrganizerDto,
    userId: string,
    countryId: string,
  ): Promise<Organizer> {
    const country = await this.countryService.getCountry({ id: countryId });
    if (!country)
      throw new HttpException('Invalid country id', HttpStatus.BAD_REQUEST);
    const user = await this.userService.getUser({ id: userId });
    if (!user)
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    return await this.organizerRepository.save({
      ...createOrganizerDto,
      country: country,
      owner: user,
      isActive: true,
      isKyc: false,
    });
  }

  /**
   * Filter a country by filter options and get optional related
   * tables which are passed as a list of strings.
   * @param filterOptions
   * @param relations
   */
  async getOrganizer(
    filterOptions: any,
    relations?: string[],
  ): Promise<Organizer> {
    return await this.organizerRepository.findOneBy({
      ...filterOptions,
      ...relations,
    });
  }

  /**
   * Filter organizers by filter options, with a default of 10 records per query.
   * Also, can get additional related tables passed as an object.
   * @param filterOptions
   * @param pagination
   * @param relations
   */
  async filterPaginatedOrganizers(
    pagination: PaginationInterface = { skip: 0, take: 10 },
    filterOptions?: any,
    relations?: any,
  ): Promise<[Organizer[], number]> {
    return await this.organizerRepository.findAndCount({
      ...pagination,
      ...filterOptions,
      ...relations,
    });
  }

  /**
   * Update organizer by filter options with update fields.
   * @param filterOptions
   * @param updateFields
   */
  async updateOrganizer(
    filterOptions: any,
    updateFields: Partial<Organizer>,
  ): Promise<UpdateResult> {
    return await this.organizerRepository.update(
      { ...filterOptions },
      { ...updateFields },
    );
  }
}
