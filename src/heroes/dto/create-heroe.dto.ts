import { IsString } from 'class-validator';

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
    first_appearance?: string;

    @IsString()
    alt_img?: string ;
}
