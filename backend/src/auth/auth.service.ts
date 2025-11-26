import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import * as config from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { tokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly hashingService: HashingService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,

    private readonly userService : UserService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
    });

    if (!user) throw new NotFoundException('User not found');

    const authorization = await this.hashingService.compare(
      user.passwordHash,
      loginDto.password,
    );

    if (!authorization) throw new UnauthorizedException('Invalid password');

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email
      },
      {
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        expiresIn: this.jwtConfiguration.expieres_in,
      }
    );

    return {
      token: token,
    };
  }

  async getMe(req:Request){
    const token = req.headers?.authorization?.split(' ')[1]
    if(!token) {
      throw new UnauthorizedException("User without session")
    }
    const tokenInfo : tokenPayloadDto = this.jwtService.verify(token)
    if(!tokenInfo) throw new UnauthorizedException("Token expired, please login again")

    return this.getUserInfo(tokenInfo)
  }

  private async getUserInfo(jwtDecoded: tokenPayloadDto) {
    const userInfo = await this.userService.findOne(jwtDecoded.sub,jwtDecoded)
    return {
      name:userInfo.name,
      email: userInfo.email,
      id: userInfo.id
    }
  }
}
