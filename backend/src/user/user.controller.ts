import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayload } from 'src/common/params/token-payload.decorator';
import { tokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthTokenGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @TokenPayload() tokenPayload: tokenPayloadDto,
  ) {
    return this.userService.findOne(+id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayload() tokenPayload: tokenPayloadDto,
  ) {
    return this.userService.update(+id, updateUserDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @TokenPayload() tokenPayload: tokenPayloadDto,
  ) {
    return this.userService.remove(+id, tokenPayload);
  }
}
