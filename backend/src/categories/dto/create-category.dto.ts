import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'title cannot be null' })
  @IsString({message:'title should be string'})
  title: string;

  @IsNotEmpty({ message: 'description cannot be null' })
  @IsString({message:'description should be string'})
  description: string;
}
