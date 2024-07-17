import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './configs/api-docs.config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import dataSource from 'db/data-source';
import { runSeeders } from 'typeorm-extension';
declare const module: any;
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {cors: true});
  configSwagger(app);

  await app.listen(3000);
  // await dataSource.initialize()
  // .then(async () => {
  //   console.log('Data Source has been initialized!');

  //   // Chạy seeders
  //   await runSeeders(dataSource);
  //   const entityMetadatas = dataSource.entityMetadatas;
  //   console.log("Entities: ", entityMetadatas.map(entity => entity.name));
  //   console.log('Seeders have been executed!');
  // })
  // .catch((err) => {
  //   console.error('Error during Data Source initialization:', err);
  // });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
