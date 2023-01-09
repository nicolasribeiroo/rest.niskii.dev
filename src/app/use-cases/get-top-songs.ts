import { getAccessToken } from '@helpers/get-access-token';
import { TOP_SONGS_CACHE_KEY, TOP_SONGS_CACHE_TIME } from '@helpers/index';
import { RedisCacheRepository } from '@infra/cache/redis/repositories/redis-repository';
import { HttpException, Injectable } from '@nestjs/common';
import type { TopSongs } from 'src/typings/spotify';

@Injectable()
export class GetTopSongs {
	public constructor(private readonly cacheManager: RedisCacheRepository) {}

	public async execute() {
		const cached = await this.cacheManager.get(TOP_SONGS_CACHE_KEY);

		if (cached)
			return {
				statusCode: 200,
				tracks: JSON.parse(cached),
				cached: true,
			};

		const accessToken = await getAccessToken();

		const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (res.status !== 200) {
			throw new HttpException('Failed to make the call with an external Api', 500);
		}

		const json: TopSongs = await res.json();

		const tracks = await Promise.all(
			json.items.slice(0, 6).map(async (track) => ({
				song: {
					name: track.name,
					artists: track.artists.map((artist) => artist.name).join(', '),
					url: track.external_urls.spotify,
				},
				album: {
					name: track.album.name,
					image: track.album.images[0].url,
					url: track.album.external_urls.spotify,
				},
			})),
		);

		await this.cacheManager.psetex(TOP_SONGS_CACHE_KEY, TOP_SONGS_CACHE_TIME, JSON.stringify(tracks));

		return {
			statusCode: 200,
			tracks,
			cached: false,
		};
	}
}
