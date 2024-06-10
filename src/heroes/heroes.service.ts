import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Heroe } from './entities/heroe.entity';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';

@Injectable()
export class HeroesService {
    constructor(
        @InjectModel(Heroe.name)
        private heroeModel: Model<Heroe>,
    ) { }

    async create(createHeroeDto: CreateHeroeDto): Promise<Heroe> {
        const newHeroe = new this.heroeModel(createHeroeDto);
        return newHeroe.save();
    }

    async findAll(): Promise<Heroe[]> {
        return this.heroeModel.find().exec();
    }
    async findOne(id: string): Promise<Heroe | null> {
        const heroe = await this.heroeModel.findById(id).exec();
        return heroe;
    }


    async update(id: string, updateHeroeDto: UpdateHeroeDto): Promise<Heroe> {
        const updatedHeroe = await this.heroeModel.findByIdAndUpdate(id, updateHeroeDto, { new: true }).exec();
        if (!updatedHeroe) {
            throw new NotFoundException(`Heroe #${id} not found`);
        }
        return updatedHeroe;
    }

    async remove(id: string): Promise<Heroe> {
        const deletedHeroe = await this.heroeModel.findByIdAndDelete(id).exec();
        if (!deletedHeroe) {
            throw new NotFoundException(`Heroe #${id} not found`);
        }
        return deletedHeroe;
    }
}
