import { GetCurrentPlaying } from '@app/use-cases/get-current-playing';
import { GetTopSongs } from '@app/use-cases/get-top-songs';
import { RedisService } from '@infra/cache/redis/redis.service';
import { RedisCacheRepository } from '@infra/cache/redis/repositories/redis-repository';
import { RedisCacheModule } from '@infra/cache/redis.module';
import { Module } from '@nestjs/common';
import { HttpController } from './controllers/http.controller';
import { SpotifyController } from './controllers/spotify.controller';

@Module({
	imports: [RedisCacheModule],
	controllers: [SpotifyController, HttpController],
	providers: [GetCurrentPlaying, GetTopSongs, RedisService, RedisCacheRepository],
})
export class HttpModule {}
