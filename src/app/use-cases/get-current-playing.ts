import { GetSpotifyAccessToken } from '@helpers/get-spotify-access-token';
import { CURRENT_CACHE_KEY, CURRENT_CACHE_TIME } from '@helpers/index';
import { RedisCacheRepository } from '@infra/cache/redis/repositories/redis-repository';
import { Injectable } from '@nestjs/common';
import type { NowPlaying } from 'src/typings/spotify';

@Injectable()
export class GetCurrentPlaying {
	public constructor(
		private readonly cacheManager: RedisCacheRepository,
		private readonly getSpotifyAccessToken: GetSpotifyAccessToken,
	) {}

	public async execute() {
		const cached = await this.cacheManager.get(CURRENT_CACHE_KEY);

		if (cached) {
			const parsedCache = JSON.parse(cached);

			if (!parsedCache.playing)
				return {
					playing: false,
					cached: true,
				};

			return {
				playing: true,
				data: parsedCache.data,
				cached: true,
			};
		}

		const accessToken = await this.getSpotifyAccessToken.execute()

		const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (res.status === 204 || res.status > 400) {
			await this.cacheManager.psetex(CURRENT_CACHE_KEY, CURRENT_CACHE_TIME, JSON.stringify({ playing: false }));
			return {
				playing: false,
				cached: false,
			};
		}

		const song: NowPlaying = await res.json();

		const data = {
			song: {
				title: song.item.name,
				artists: song.item.artists.map((artist) => artist.name).join(', '),
				url: song.item.external_urls.spotify,
				timestamps: {
					timestamp: song.timestamp,
					duration: song.item.duration_ms,
					progress_ms: song.progress,
				},
			},
			album: {
				name: song.item.album.name,
				image: song.item.album.images[0]?.url,
				url: song.item.album.external_urls.spotify,
			},
		};

		if (!song.is_playing) {
			await this.cacheManager.psetex(CURRENT_CACHE_KEY, CURRENT_CACHE_TIME, JSON.stringify({ playing: false }));

			return {
				playing: false,
			};
		}

		await this.cacheManager.psetex(CURRENT_CACHE_KEY, CURRENT_CACHE_TIME, JSON.stringify({ playing: true, data }));

		return {
			playing: true,
			data,
			cached: false,
		};
	}
}
