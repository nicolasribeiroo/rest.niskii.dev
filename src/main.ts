import type { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app: INestApplication

async function bootstrap() {
	const logger = new Logger('Main')
	app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT);
	logger.log(`Process is running on ${await app.getUrl()}`)
}

void bootstrap();
