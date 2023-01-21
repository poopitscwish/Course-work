import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateScheduleDto {
    @Type(() => Date)
    @IsDate()
    day_start:string
    @Type(() => Date)
    @IsDate()
    day_end:string
    worker_id:number
}
