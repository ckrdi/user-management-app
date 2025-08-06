import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, status: true },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true, status: true },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }

  async create(data: { name: string; email: string; password: string; status?: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: { ...data, password: hashed },
      select: { id: true, name: true, email: true, status: true },
    });
  }

  async update(id: string, data: { name?: string; email?: string; status?: string }) {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, status: true },
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User has been deleted' };
  }
}
