import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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

    async findOne(_id: string): Promise<Heroe | null> {
        if (!isValidObjectId(_id)) {
            throw new BadRequestException(`Invalid ID format: ${_id}`);
        }
        const heroe = await this.heroeModel.findById(_id).exec();
        if (!heroe) {
            throw new NotFoundException(`Heroe #${_id} not found`);
        }
        return heroe;
    }

    async update(_id: string, updateHeroeDto: UpdateHeroeDto): Promise<Heroe> {
        if (!isValidObjectId(_id)) {
            throw new BadRequestException(`Invalid ID format: ${_id}`);
        }
        const updatedHeroe = await this.heroeModel.findByIdAndUpdate(_id, updateHeroeDto, { new: true }).exec();
        if (!updatedHeroe) {
            throw new NotFoundException(`Heroe #${_id} not found`);
        }
        return updatedHeroe;
    }

    async remove(_id: string): Promise<Heroe> {
        if (!isValidObjectId(_id)) {
            throw new BadRequestException(`Invalid ID format: ${_id}`);
        }
        const deletedHeroe = await this.heroeModel.findByIdAndDelete(_id).exec();
        if (!deletedHeroe) {
            throw new NotFoundException(`Heroe #${_id} not found`);
        }
        return deletedHeroe;
    }
}
