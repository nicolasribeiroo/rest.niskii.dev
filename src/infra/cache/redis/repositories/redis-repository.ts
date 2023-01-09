import type { RedisRepository } from '@app/repositories/redis-repository';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';

@Injectable()
export class RedisCacheRepository implements RedisRepository {
	public constructor(private readonly redis: RedisService) {}

	public async get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}

	public async set(key: string, value: string, ttl: number): Promise<string> {
		return this.redis.set(key, value, 'EX', ttl);
	}

	public async psetex(key: string, milliseconds: number, value: string): Promise<unknown> {
		return this.redis.psetex(key, milliseconds, value);
	}

	public async del(key: string): Promise<number> {
		return this.redis.del(key);
	}
}
