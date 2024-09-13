import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto{
  @IsNotEmpty({message:"Name cannot be null"})
  @IsString({message:"Name must be string"})
  name: string;

  
}
