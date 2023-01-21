import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from './entities/worker.entity';
import * as bcrypt from 'bcrypt';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
const jwt = require('jsonwebtoken');
@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    private jwtService: JwtService
  ) { }

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const phone_number = createWorkerDto.phone_number;
    const qb = await this.workerRepository
      .createQueryBuilder('worker')
      .where('worker.phone_number = :phone_number', { phone_number });
    const user = await qb.getOne();
    if (user) {
      const errors = { username: 'phone number must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }
    const worker = new Worker();
    worker.first_name = createWorkerDto.first_name;
    worker.second_name = createWorkerDto.second_name;
    worker.last_name = createWorkerDto.last_name;
    worker.job_id = createWorkerDto.job_id;
    worker.phone_number = createWorkerDto.phone_number;
    worker.password = await bcrypt.hash(createWorkerDto.password, 12);
    return this.workerRepository.save(worker);
  }

  async login(login: LoginWorkerDto) {
    const phone_number = login.phone_number
    const password = login.password

    const user = await this.workerRepository.findOneBy({ phone_number });
    if (!user) {
      throw new BadRequestException("Wrong password or login")
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Wrong password or login")
    }
    return user;
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const id = data['id'];
      const user = await this.workerRepository
      .createQueryBuilder("workers")
      .select([
        "workers.id",
        "workers.first_name",
        "workers.second_name",
        "workers.last_name",
        "workers.phone_number",
      ])
      .innerJoin("workers.job_id", "job_title")
      .addSelect(["job_title.name", "job_title.payment"])
      .where("workers.id = :id", { id })
      .getOne();
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }//
  }
  getJobId(id: string) {
    return this.workerRepository
    .createQueryBuilder("workers")
    .select("workers.job_id")
    .where("workers.id = :id", { id })
    .getRawOne();
  }
  findAll() {
    return this.workerRepository
      .createQueryBuilder("workers")
      .select([
        "workers.id",
        "workers.first_name",
        "workers.second_name",
        "workers.last_name",
        "workers.phone_number",
      ])
      .innerJoin("workers.job_id", "job_title")
      .addSelect(["job_title.name", "job_title.payment"])
      .getMany();
  }

  async findOneByPhone(phone_number: string) {
    return this.workerRepository
      .createQueryBuilder("workers")
      .select([
        "workers.id",
        "workers.first_name",
        "workers.second_name",
        "workers.last_name",
        "workers.phone_number",
        "workers.job_id",
      ])
      .where("workers.phone_number = :phone_number", { phone_number })
      .getOne();
  }

  async findOne(id: number) {
    return this.workerRepository.findOneBy({ id });
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return this.workerRepository.update(id, updateWorkerDto);
  }
  async remove(id: string): Promise<void> {
    await this.workerRepository.delete(id);
  }


}
