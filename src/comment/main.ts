import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommentModule } from './comment.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);

  const config = new DocumentBuilder()
    .setTitle('Comment API')
    .setDescription('API used to study framework Nest js')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
  console.log(`API running on: PORT 4000`);

}
bootstrap();
