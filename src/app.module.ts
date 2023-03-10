import { Module } from '@nestjs/common';
import DatabaseConfig from './database/config';
import { ConfigModule } from '@nestjs/config';
import { OrganizerModule } from './organizer/organizer.module';
import { SettingsModule } from './settings/settings.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    OrganizerModule,
    SettingsModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
