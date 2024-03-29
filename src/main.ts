import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   credentials: true,
  //   origin: "http://localhost:3000",
  // });

  app.setGlobalPrefix("api");

  // const config = new DocumentBuilder()
  //   .setTitle("Taesung")
  //   .setDescription("Taesung API")
  //   .setVersion("1.0")
  //   .addTag("Taesung")
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
