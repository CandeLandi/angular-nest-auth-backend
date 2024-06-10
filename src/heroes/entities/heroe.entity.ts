import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Heroe {
    _id?: string;
 
    @Prop({ unique: true, required: true })
    superhero: string;

    @Prop({ required: true })
    publisher: string;

    @Prop({ required: true })
    alter_ego?: string;

    @Prop()
    characters: string;

    @Prop({ default: true })
    images?: boolean;

}

export const HeroeSchema = SchemaFactory.createForClass(Heroe)


