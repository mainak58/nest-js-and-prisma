import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { UserService } from 'src/user/user.service';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authGateway: AuthGateway,
  ) {}

  async signUp(username: string, password: string) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.signInUser(email, password);
    if (!user) {
      throw new CustomException('Please provide a valid email');
    }
    const payload = { sub: user.id, email: user.email };
    console.log('payload,---', payload);
    const token = await this.jwtService.signAsync(payload);

    this.authGateway.emitLoginEvent(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
