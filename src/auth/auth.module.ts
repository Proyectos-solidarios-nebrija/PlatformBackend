import { Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { UsuarioModule } from '@usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@auth/jwt.strategy';

@Module({
    imports: [
        UsuarioModule, // <- Asegúrate de que esto esté presente
        PassportModule,
        JwtModule.register({
            secret: 'yourSecretKey', // Cambia por tu clave secreta real
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
