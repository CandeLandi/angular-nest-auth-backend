import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateHeroeDto {
    @IsString()
    superhero: string;

    @IsString()
    publisher: string;

    @IsString()
    alter_ego?: string;

    @IsString()
    characters?: string;

    @IsString()
    @IsOptional()
    alt_img?: boolean;
}
