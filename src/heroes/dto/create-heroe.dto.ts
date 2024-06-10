import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateHeroeDto {

    
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
    images?: string;
}
