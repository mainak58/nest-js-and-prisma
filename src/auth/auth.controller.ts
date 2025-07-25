import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { SubscribeMessage } from '@nestjs/websockets';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authServices.signIn(signInDto.email, signInDto.password);
  }


  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: CreateUserDto) {
    return this.authServices.signUp(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
