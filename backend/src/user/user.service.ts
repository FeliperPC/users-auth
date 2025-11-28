import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { tokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await this.hashingService.hash(createUserDto.password);
    try {
      const userData = {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash,
      };
      const newUser = this.userService.create(userData);
      return await this.userService.save(newUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.userService.find({
      order: {
        id: 'desc',
      },
    });
    return users;
  }

  async findOne(id: number, tokenPayload: tokenPayloadDto) {
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    if (tokenPayload.sub != id)
      throw new UnauthorizedException(
        'Cannot access information about this user',
      );
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    tokenPayload: tokenPayloadDto,
  ) {
    const partialUser = {
      name: updateUserDto?.name,
    };

    if (updateUserDto.password) {
      partialUser['passwordHash'] = await this.hashingService.hash(
        updateUserDto.password,
      );
    }

    const personToUpdate = await this.userService.preload({
      id,
      ...partialUser,
    });

    if (!personToUpdate) throw new NotFoundException('User not found');
    if (tokenPayload.sub != id)
      throw new UnauthorizedException(
        'Cannot update information about this user',
      );

    return this.userService.save(personToUpdate);
  }

  async remove(id: number, tokenPayload: tokenPayloadDto) {
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    if (tokenPayload.sub != id)
      throw new UnauthorizedException('Cannot remove this user');

    return this.userService.remove(user);
  }
}
