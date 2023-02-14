import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerController } from './controllers/organizer.controller';
import { OrganizerService } from './services/organizer.service';
import { SettingsModule } from '../settings/settings.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organizer]),
    SettingsModule,
    AuthenticationModule,
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [],
})
export class OrganizerModule {}
