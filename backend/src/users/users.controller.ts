import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  status?: string;
}

type UpdateUserDto = {
  name?: string;
  email?: string;
  status?: string;
}

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  async findAll() {
    return await this.users.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.users.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.users.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.users.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.users.remove(id);
  }
}
