import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobTitleService } from './job_title.service';
import { CreateJobTitleDto } from './dto/create-job_title.dto';
import { UpdateJobTitleDto } from './dto/update-job_title.dto';
import { JobTitle } from './entities/job_title.entity';

@Controller('job')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Post()
  create(@Body() createJobTitleDto: CreateJobTitleDto) {
    return this.jobTitleService.create(createJobTitleDto);
  }

  @Get()
  findAll() {
    return this.jobTitleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobTitleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobTitleDto: UpdateJobTitleDto) {
    return this.jobTitleService.update(+id, updateJobTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobTitleService.remove(+id);
  }
}
