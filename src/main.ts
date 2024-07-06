import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './configs/api-docs.config';
import { initializeTransactionalContext } from 'typeorm-transactional';
declare const module: any;
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {cors: true});
  configSwagger(app);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
