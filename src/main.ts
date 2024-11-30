import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {RequestMethod, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'], // Aqui agregamos nuestros dominios autorizados, en la mayoria de caso agregaremos nuestras rutas para guardar credenciales, login, etc...
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodos aceptados
    allowedHeaders: ['Content-Type', 'Authorization'], // Los headers a utilizar, en este caso headers de autorización
    credentials: true, // Habilitamos el envio de credenciales
  });


  // Agrega prefijo global "api"
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'auth/login', method: RequestMethod.POST }],
  });


  // Usa validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
      .setTitle('API Usuarios')
      .setDescription('API para la gestión de usuarios')
      .setVersion('1.0')
      .addBearerAuth() // Para permitir autenticación por JWT en Swagger
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger disponible en /api-docs

  await app.listen(3000); // Puerto 3000
}

bootstrap();
