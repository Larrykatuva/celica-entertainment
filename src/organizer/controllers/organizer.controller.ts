import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizerService } from '../services/organizer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOrganizerDto } from '../dto/organizer.dto';

@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('logo', { dest: './storage/logos/' }))
  async registerOrganizer(
    @Body() createOrganizerDto: CreateOrganizerDto,
    @UploadedFile() logo: Express.Multer.File,
  ): Promise<any> {
    console.log(logo, createOrganizerDto);
  }
}
