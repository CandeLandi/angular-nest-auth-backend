import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Heroe {

  @Prop({ unique: true, required: true })
  superhero: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  alter_ego?: string;

  @Prop({ required: true })
  first_appearance?: string;

  @Prop()
  characters: string;

  @Prop({ default: 'true' })
  alt_img: string;
}

export const HeroeSchema = SchemaFactory.createForClass(Heroe);
