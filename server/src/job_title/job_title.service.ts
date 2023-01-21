import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobTitleDto } from './dto/create-job_title.dto';
import { UpdateJobTitleDto } from './dto/update-job_title.dto';
import { JobTitle } from './entities/job_title.entity';

@Injectable()
export class JobTitleService {

  constructor(
    @InjectRepository(JobTitle)
    private readonly jobRepository:Repository<JobTitle>,
  ){}

  async create(createJobTitleDto: CreateJobTitleDto): Promise<JobTitle> {
    const job = new JobTitle();
    job.name = createJobTitleDto.name;
    job.payment = createJobTitleDto.payment;
    return this.jobRepository.save(job);
  }

  async findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: number){
    return this.jobRepository.findOneBy({id:id});
  }

  async update(id: number, updateJobTitleDto: UpdateJobTitleDto) {
    return this.jobRepository.update(id,updateJobTitleDto);
  }

  async remove(id: number) {
    await this.jobRepository.delete(id);
  }
}
