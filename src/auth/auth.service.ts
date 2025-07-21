import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { UserService } from 'src/user/user.service';
import { AuthGateway } from './auth.gateway';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authGateway: AuthGateway,
  ) {}

  async signUp(registerUser: CreateUserDto) {
    const user = await this.userService.registerUser(
      registerUser.email,
      registerUser.password,
      registerUser.name,
    );

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    this.authGateway.emitLoginEvent(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

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
