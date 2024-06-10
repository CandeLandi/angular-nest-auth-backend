import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';

@Controller('heroes')
export class HeroesController {
    constructor(private readonly heroesService: HeroesService) {}

    @Post()
    create(@Body() createHeroeDto: CreateHeroeDto) {

        return this.heroesService.create(createHeroeDto);
    }

    @Get()
    findAll() {
        return this.heroesService.findAll();
    }

    @Get('id')
    findOne(@Param('id') id: string) {
        return this.heroesService.findOne(id);
    }

    @Put('id')
    update(@Param('id') id: string, @Body() updateHeroeDto: UpdateHeroeDto) {
        return this.heroesService.update(id, updateHeroeDto);
    }

    @Delete('id')
    remove(@Param('id') id: string) {
        return this.heroesService.remove(id);
    }
}
