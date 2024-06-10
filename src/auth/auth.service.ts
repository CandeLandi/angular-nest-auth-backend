import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs'

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { LoginResponse } from 'src/interfaces/login-response';
import { LoginDto, CreateUserDto, RegisterUserDto, UpdateAuthDto } from './dto/index';



@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log({ createUserDto })
    try {
      let { password, ...userData } = createUserDto;

      let newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      })
     
      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();
      return user;

      // 1- Encriptar la contrasena
      // 2 - Guardar el usuario

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException('Something terrible happen!')
    }

  }


  async register(registerDto: RegisterUserDto) {

    const user = await this.create(registerDto);
    console.log({ user })

    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    }
  }


  async login(loginDto: LoginDto) {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email')
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password ')
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id })
    }

  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id)
    const { password, ...rest } = user.toJSON();
    return rest;
  }


  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.signAsync(payload);
    return token;
  }



  /*   findOne(id: number) {
      return `This action returns a #${id} auth`;
    }
  
    update(id: number, updateAuthDto: UpdateAuthDto) {
      return `This action updates a #${id} auth`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} auth`;
    } */


}
