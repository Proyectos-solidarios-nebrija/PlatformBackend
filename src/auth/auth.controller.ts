import {Controller, Post, Body, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: { correo: string; contrasena: string }) {
        console.log('Datos de login recibidos:', loginDto);
        const user = await this.authService.validateUser(loginDto.correo, loginDto.contrasena);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
