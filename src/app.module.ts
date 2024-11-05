import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa los módulos de cada entidad
import { UsuarioModule } from './entidades/usuario/usuario.module';


// Importa las entidades
import { Usuario } from './entidades/usuario/usuario.entity';
import { PerfilUsuario } from './entidades/perfil_usuario/perfil_usuario.entity';
import { Sesion } from './entidades/sesion/sesion.entity';
import { Chat } from './entidades/chat/chat.entity';
import { Mensaje } from "./entidades/mensaje/mensaje.entity";
import { Videollamada } from './entidades/videollamada/videollamada.entity';
import { Pregunta } from './entidades/pregunta/pregunta.entity';
import { Respuesta } from './entidades/respuesta/respuesta.entity';
import { InteraccionAR } from './entidades/interaccion_ar/interaccion_ar.entity';
import { GestionUsuario } from './entidades/gestion_usuario/gestion_usuario.entity';
import { Notificacion } from './entidades/notificacion/notificacion.entity';
import { Gesto } from './entidades/signo/signo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          Usuario,
          PerfilUsuario,
          Sesion,
          Chat,
          Mensaje,
          Videollamada,
          Pregunta,
          Respuesta,
          InteraccionAR,
          GestionUsuario,
          Notificacion,
          Gesto,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // Importar módulos de cada entidad
    UsuarioModule,
  ],
})
export class AppModule {}
