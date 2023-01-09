import type { INestApplication, OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

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
		Logger.log('Redis connected', 'RedisService');
	}

	public async enableShutdownHooks(app: INestApplication) {
		this.on('beforeExit', async () => {
			await app.close();
		});
	}
}
