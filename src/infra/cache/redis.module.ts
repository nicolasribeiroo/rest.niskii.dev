import { RedisRepository } from '@app/repositories/redis-repository';
import { Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
// eslint-disable-next-line import/extensions
import { RedisCacheRepository } from './redis/repositories/redis-repository';

@Module({
	providers: [RedisService, { provide: RedisRepository, useClass: RedisCacheRepository }],
	exports: [RedisRepository],
})
export class RedisCacheModule {}
