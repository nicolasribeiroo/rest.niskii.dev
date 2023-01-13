import { RedisCacheModule } from '@infra/cache/redis.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ThrottlerModule.forRoot({ ttl: 30, limit: 5 }),
		ConfigModule.forRoot({ envFilePath: '.env' }),
		HttpModule,
		RedisCacheModule,
	],
})
export class AppModule {}
