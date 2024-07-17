import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true)
        // if (!origin || whitelist.indexOf(origin) !== -1) {
        // console.log("Allowed cors for:", origin??"Backend application/ REST Tool")
        //   callback(null, true)
        // } else {
        //   console.log("Blocked cors for:", origin)
        //   callback(new Error('Not allowed by CORS'))
        // }
      },
    credentials: true
    })
  await app.listen(process.env.PORT);
}
bootstrap();
