import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UsePipes, ValidationPipe, HttpStatus, Req, Res } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { Worker } from './entities/worker.entity';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { PassThrough } from 'stream';

@Controller('workers')
export class WorkersController {
  constructor(
    private readonly workersService: WorkersService,
    private jwtService: JwtService
  ) { }

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiParam({ name: "id", required: true, description: "Идентификатор пользователя" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Worker })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  async create(@Body() userData: CreateWorkerDto) {
    const user = this.workersService.create(userData)
    delete (await user).password;
    return user;
  }
  @Get()
  findAll() {
    const user = this.workersService.findAll();

    return user;
  }

  @Get('jobID/:id')
  getJobId(@Param('id') id: string) {
    return this.workersService.getJobId(id);
  }
  @Get('user')
  async user(@Req() request: Request) {
    return this.workersService.user(request)
  }
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешно", type: Worker })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() loginUserDto: LoginWorkerDto,
    @Res({ passthrough: true }) response: Response) {

    const _user = await this.workersService.login(loginUserDto);
    const errors = { Worker: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);
    const jwt = await this.jwtService.signAsync({ id: _user.id })
    response.cookie('jwt', jwt, { httpOnly: true })
    return { message: 'success' }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return {
      message: 'success'
    }
  }

  @Get(':phone_number')
  async findOneByPhone(@Param('phone_number') phone_number: string) {
    return this.workersService.findOneByPhone(phone_number)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersService.remove(id);
  }
}
