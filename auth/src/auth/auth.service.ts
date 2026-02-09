import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVER } from 'src/config/services';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtFormat } from './interfaces/jwt-format.interface';
import { jwtConstants } from './utils/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('authService');

    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
        @Inject(NATS_SERVER) private readonly ClientNats: ClientProxy,
    ) {}

    async signJWT(payload: JwtFormat) {
        return this.jwtService.sign(payload)
    }
    async register(registerUserDto: RegisterUserDto){
        const { name, email, password } = registerUserDto;
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            })
            if( user ) {
                throw new RpcException({ status: 400, message: 'user alredy exist '})
            }
            const pass = bcrypt.hashSync( password, 10 );
            console.log(pass);
            const newUser = await this.prisma.user.create({ data: {
                email: email,
                name: name,
                password: pass
            }})
            return {
                user: newUser,
                token: await this.signJWT({ id : newUser.id, email: newUser.email })
            }
        } catch (error) {
            throw new RpcException({ status: 400, message: error.message})
        }
    }

    async login(loginUserDto: LoginUserDto){
        const { email, password } = loginUserDto;
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            })
            if( !user ) {
                throw new RpcException({ status: 400, message: 'user not exist '})
            }

            if( !bcrypt.compareSync(password, user.password)) {
                throw new RpcException({ status: 400, message: 'wrong password'})
            }

            return { message: 'user log in', token: await this.signJWT({ id : user.id, email: user.email })}
        } catch (error) {
            throw new RpcException({ status: 400, message: error.message})
        }
    }

    async verify(token: string){
        try {
            const { sub, iat, exp, ...user} = this.jwtService.verify(token, jwtConstants);
            return { user: user, token : await this.signJWT(user)}
        } catch (error) {
            throw new RpcException({status:400, message: 'err'})
        }
    }
}