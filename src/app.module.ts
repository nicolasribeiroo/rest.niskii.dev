import { RedisCacheModule } from '@infra/cache/redis.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: '.env' }), HttpModule, RedisCacheModule],
})
export class AppModule {}
