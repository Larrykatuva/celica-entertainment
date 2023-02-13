import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerController } from './controllers/organizer.controller';
import { OrganizerService } from './services/organizer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organizer])],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [],
})
export class OrganizerModule {}
