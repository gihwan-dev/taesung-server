import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://taesung-26b6fexaf-gihwan-dev-s-team.vercel.app",
    credentials: true,
  });
  // const config = new DocumentBuilder()
  //   .setTitle("Taesung")
  //   .setDescription("Taesung API")
  //   .setVersion("1.0")
  //   .addTag("Taesung")
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
