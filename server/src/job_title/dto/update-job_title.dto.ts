import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTitleDto } from './create-job_title.dto';

export class UpdateJobTitleDto extends PartialType(CreateJobTitleDto) {}
