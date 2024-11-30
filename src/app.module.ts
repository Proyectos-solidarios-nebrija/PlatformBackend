import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa los módulos de cada entidad
import { UsuarioModule } from './entidades/usuario/usuario.module';
import { MensajeModule} from "src/entidades/mensaje/mensaje.module";
import { ChatModule } from './entidades/chat/chat.module';
import {VideollamadaModule} from "src/entidades/videollamada/videollamada.module";
import { PreguntaModule } from "src/entidades/pregunta/pregunta.module";
import { RespuestaModule } from "src/entidades/respuesta/respuesta.module";
import { InteraccionARModule} from "src/entidades/interaccion_ar/interaccion_ar.module";
import { GestionUsuarioModule } from  "src/entidades/gestion_usuario/gestion_usuario.module";
import { NotificacionModule } from  "src/entidades/notificacion/notificacion.module";
import { PerfilUsuarioModule } from  "src/entidades/perfil_usuario/perfil_usuario.module";
import { SesionModule } from  "src/entidades/sesion/sesion.module";
 import { SignoModule } from  "src/entidades/signo/signo.module";
import { AuthModule } from './auth/auth.module';



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
import { Signo } from './entidades/signo/signo.entity';

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
          Signo,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // Importar módulos de cada entidad
    UsuarioModule,
      VideollamadaModule,
      MensajeModule,
      ChatModule,
      PreguntaModule,
      RespuestaModule,
      InteraccionARModule,
      PerfilUsuarioModule,
      NotificacionModule,
      SignoModule,
      GestionUsuarioModule,
      SesionModule,
      AuthModule,
  ],
})
export class AppModule {}
