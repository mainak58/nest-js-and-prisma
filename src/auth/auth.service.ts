import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string) {
    const user = await this.userService.findOne(userName);
    if (!user) {
      throw new CustomException('Please provide a valid username');
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      payload,
    };
  }
}
