import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateHeroeDto {
  @IsString()
  _id?: string;

  @IsString()
  superhero: string;

  @IsString()
  publisher: string;

  @IsString()
  alter_ego?: string;

  @IsString()
  characters?: string;

  @IsString()
  alt_img?: string;
}
