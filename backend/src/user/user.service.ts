import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';

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

  async findOne(id: number) {
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const partialUser = {
      name: updateUserDto?.name,
    };

    if (updateUserDto.password) {
      partialUser['passwordHash'] = updateUserDto.password;
    }

    const personToUpdate = await this.userService.preload({
      id,
      ...partialUser,
    });

    if (!personToUpdate) throw new NotFoundException('User not found');

    return this.userService.save(personToUpdate);
  }

  async remove(id: number) {
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.userService.remove(user);
  }
}
