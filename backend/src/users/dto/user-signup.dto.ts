import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUp {
  @IsNotEmpty({message:"Name cannot be null"})
  @IsString({message:"Name must be string"})
  name: string;

  @IsNotEmpty({message:"Email cannot be null"})
  @IsEmail({},{message:"Please provide a valid email"})
  email: string;


  @IsNotEmpty({message:"Password cannot be null"})
  @MinLength(5,{message:"Password minimum character should be 5"})
  password: string;
}
