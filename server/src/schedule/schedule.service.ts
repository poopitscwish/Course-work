import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) { }

  create(createScheduleDto: CreateScheduleDto):Promise<Schedule> {
    const schedule = new Schedule();
    schedule.day_start = createScheduleDto.day_start;
    schedule.day_end = createScheduleDto.day_end;
    schedule.worker_id = createScheduleDto.worker_id;
    return this.scheduleRepository.save(schedule);
  }

  findAll() {
    return this.scheduleRepository.
      createQueryBuilder("schedule")
      .select([
        "schedule.id",
        "schedule.day_start",
        "schedule.day_end",
      ])
      .innerJoin("schedule.worker_id", "workers")
      .addSelect([
        "workers.first_name",
        "workers.second_name",
        "workers.last_name"
      ])
      .innerJoin("workers.job_id", "job_title")
      .addSelect("job_title.name")
      .getMany();;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  getHours(id: string) {
    const hours = this.scheduleRepository.
    createQueryBuilder("schedule")
    .select()
    .where("schedule.worker_id = :id",{id})
    .getMany()
    return hours;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }//
}
