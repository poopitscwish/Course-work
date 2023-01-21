import { IsNotEmpty } from 'class-validator';

export class LoginWorkerDto {

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}