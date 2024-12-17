import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa los módulos de cada entidad
import { UsuarioModule } from '@usuario/usuario.module';
import { MensajeModule } from '@mensaje/mensaje.module';
import { ChatModule } from '@chat/chat.module';
import { VideollamadaModule } from '@videollamada/videollamada.module';
import { PreguntaModule } from '@pregunta/pregunta.module';
import { RespuestaModule } from '@respuesta/respuesta.module';
import { InteraccionARModule } from '@interaccion_ar/interaccion_ar.module';
import { GestionUsuarioModule } from '@gestion_usuario/gestion_usuario.module';
import { NotificacionModule } from '@notificacion/notificacion.module';
import { PerfilUsuarioModule } from '@perfil_usuario/perfil_usuario.module';
import { SesionModule } from '@sesion/sesion.module';
import { SignoModule } from '@signo/signo.module';
import { AuthModule } from '@auth/auth.module';
import { CategoriaModule } from '@categoria/categoria.module';
import { HiloModule } from '@hilo/hilo.module';

// Importa las entidades
import { Usuario } from '@usuario/usuario.entity';
import { PerfilUsuario } from '@perfil_usuario/perfil_usuario.entity';
import { Sesion } from '@sesion/sesion.entity';
import { Chat } from '@chat/chat.entity';
import { Mensaje } from '@mensaje/mensaje.entity';
import { Videollamada } from '@videollamada/videollamada.entity';
import { Pregunta } from '@pregunta/pregunta.entity';
import { Respuesta } from '@respuesta/respuesta.entity';
import { InteraccionAR } from '@interaccion_ar/interaccion_ar.entity';
import { GestionUsuario } from '@gestion_usuario/gestion_usuario.entity';
import { Notificacion } from '@notificacion/notificacion.entity';
import { Signo } from '@signo/signo.entity';
import { Categoria } from '@categoria/categoria.entity';
import { Hilo } from '@hilo/hilo.entity';

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
          Categoria,
          Hilo,
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
    CategoriaModule,
    HiloModule,
    GestionUsuarioModule,
    SesionModule,
    AuthModule,
  ],
})
export class AppModule {}
