import { Injectable } from '@nestjs/common';
import { Organizer } from '../entities/organizer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>,
  ) {}
}
