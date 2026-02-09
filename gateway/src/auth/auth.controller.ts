import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req, UseGuards } from '@nestjs/common';
import { SERVICE_NATS } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICE_NATS) private readonly ClientNats: ClientProxy,
  ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.ClientNats.send('auth.register.user', registerUserDto )
    .pipe( catchError( error => {
      throw new RpcException(error)
    }))
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.ClientNats.send('auth.login.user', loginUserDto)
    .pipe( catchError( error => {
      throw new RpcException(error)
    }))
  }

  @UseGuards( AuthGuard )
  @Get('verify')
  verifyToken( @User() user: any, @Token() token: string) {
    return this.ClientNats.send('auth.verify.user', {})
  }

}
