import type { INestApplication, OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

const logger = new Logger('RedisService')

@Injectable()
export class RedisService extends Redis implements OnModuleInit {
	public constructor() {
		super({
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			password: process.env.REDIS_PASSWORD,
			username: process.env.REDIS_USERNAME,
		});
	}

	public async onModuleInit() {
		logger.log('Redis connected');
	}

	public async enableShutdownHooks(app: INestApplication) {
		this.on('beforeExit', async () => {
			await app.close();
		});
	}
}
