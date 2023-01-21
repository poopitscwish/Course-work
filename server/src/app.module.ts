import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMError } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkersModule } from './workers/workers.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.module';
import { ListModule } from './list/list.module';
import { JobTitleModule } from './job_title/job_title.module';
import { ScheduleModule } from './schedule/schedule.module';
import CONNECTION from './db.connection';
import { JwtModule } from '@nestjs/jwt/dist';
import { SECRET } from './config';

@Module({
  //@ts-ignore
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },

    }),
    WorkersModule,
    OrdersModule,
    MenuModule,
    ListModule,
    ScheduleModule,
    JobTitleModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}//
