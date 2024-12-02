import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yourSecretKey',
        });
    }

    async validate(payload: any) {
        console.log('JWT Strategy - Payload:', payload);
        return { id: payload.sub, correo: payload.correo }; // Retorna 'id' basado en 'sub'
    }
}
