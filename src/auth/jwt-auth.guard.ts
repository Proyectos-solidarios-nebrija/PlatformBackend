import {Injectable, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
        console.log('JwtAuthGuard inicializado');
    }

    handleRequest(err, user, info) {
        console.log('JWT Guard - Error:', err);
        console.log('JWT Guard - Usuario autenticado:', user);
        console.log('JWT Guard - Info:', info);

        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
