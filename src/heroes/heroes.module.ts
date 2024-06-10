import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesService } from './heroes.service';
import { Heroe, HeroeSchema } from './entities/heroe.entity';
import { HeroesController } from './heroe.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Heroe.name, schema: HeroeSchema }]),
    ],
    controllers: [HeroesController],
    providers: [HeroesService],
})
export class HeroesModule {}
