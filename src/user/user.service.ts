import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomException } from 'src/common/exceptions/custom-exception';

export type User = any;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(email: string, password: string, name: string) {
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isEmailExist) {
      throw new CustomException('this email id already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      throw new CustomException('Failed to created new user');
    }

    return {
      newUser: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    };
  }

  async signInUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new CustomException('this email is not existed please create one');
    }

    const decrytPassword = await bcrypt.compare(password, user.password);

    if (!decrytPassword) {
      throw new CustomException('Password does not match');
    }

    return user;
  }
}
