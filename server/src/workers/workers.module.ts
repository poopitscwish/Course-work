import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/config';

@Module({
  imports:[TypeOrmModule.forFeature([Worker]),
  JwtModule.register({
    secret: SECRET,
    signOptions:{expiresIn:'1d'}
  })],
  controllers: [WorkersController],
  providers: [WorkersService]
})
export class WorkersModule {}
