import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/entidades/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(correo: string, password: string): Promise<any> {
        console.log(`Buscando usuario con correo: ${correo}`);
        const user = await this.usuarioService.findByEmail(correo);
        if (user) {
            console.log(`Usuario encontrado: ${JSON.stringify(user)}`);
            console.log(`Comparando contraseñas: ${password} === ${user.contrasena}`);
        }
        if (user && user.contrasena === password) {
            const { contrasena, ...result } = user;
            return result;
        }
        console.log('Credenciales inválidas');
        return null;
    }





    async login(user: any) {
        const payload = { sub: user.id, correo: user.correo }; // Usa 'sub' para ID
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}
