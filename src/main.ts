import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { appendFile } from "fs";
import { AppModule } from "./app.module";
import * as cookieparser  from 'cookie-parser';

async function start() {
    const PORT = process.env.APPLICATION_PORT ?? 5000;
    const app = await NestFactory.create(AppModule);

    app.use(cookieparser());

    const config = new DocumentBuilder()
        .setTitle('Group Location API')
        .setDescription('This is API has groups and users and we can track all locations of users in every particular group, also we can track marks for an user')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

start();

 