import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger connection
   const config = new DocumentBuilder()
     .setTitle('User AUth')
     .setDescription('User authentication')
     .setVersion('1.0')
     .addTag('User')
     .addBearerAuth({ in: 'header', type: 'http' })
    .build();
    const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, document);

  // Server Connection
  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();
