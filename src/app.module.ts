import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [

    ConfigModule.forRoot(),

    MongooseModule.forRoot( process.env.MONGO_URI ),
    
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
