import { Module } from '@nestjs/common';
import DatabaseConfig from './database/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseConfig],
  controllers: [],
  providers: [],
})
export class AppModule {}
