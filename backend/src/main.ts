import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const environment = nunjucks.configure(
    [
      join(__dirname, '.', 'system_template'),
      join(__dirname, '..', 'template'),
    ],
    {
      autoescape: true,
      throwOnUndefined: false,
      trimBlocks: false,
      lstripBlocks: false,
      watch: true,
      noCache: process.env.NODE_ENV === 'local' ? true : false,
      express: app,
    },
  );

  app.engine('njk', environment.render);
  app.setViewEngine('njk');
  app.set('view cache', true);
  await app.listen(3000);
}
bootstrap();
