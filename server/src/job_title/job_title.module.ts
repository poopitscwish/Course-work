import { Module } from '@nestjs/common';
import { JobTitleService } from './job_title.service';
import { JobTitleController } from './job_title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTitle } from './entities/job_title.entity';

@Module({
  imports:[TypeOrmModule.forFeature([JobTitle])],
  controllers: [JobTitleController],
  providers: [JobTitleService]
})
export class JobTitleModule {}
