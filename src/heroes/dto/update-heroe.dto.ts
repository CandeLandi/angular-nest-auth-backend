import { IsString, IsOptional } from 'class-validator';

export class UpdateHeroeDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsOptional()
  @IsString()
  superhero?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  alter_ego?: string;

  @IsOptional()
  @IsString()
  first_appearance?: string;

  @IsOptional()
  @IsString()
  characters?: string;

  @IsOptional()
  @IsString()
  alt_img?: string;
}
