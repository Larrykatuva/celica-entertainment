import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryController } from './country.controller';
import { Country } from './entities/country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryService],
  controllers: [CountryController],
  exports: [CountryService],
})
export class SettingsModule {}
