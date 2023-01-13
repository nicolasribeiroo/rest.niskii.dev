import { stringify } from 'node:querystring';
import { RedisCacheRepository } from '@infra/cache/redis/repositories/redis-repository';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_CACHE_KEY } from '.';

@Injectable()
export class GetSpotifyAccessToken {
	public constructor(private readonly cacheManager: RedisCacheRepository) {}

	public async execute() {
		const cached = await this.cacheManager.get(ACCESS_TOKEN_CACHE_KEY);

		if (cached) return cached;

		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: stringify({
				grant_type: 'refresh_token',
				refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
				client_id: process.env.SPOTIFY_CLIENT_ID,
				client_secret: process.env.SPOTIFY_CLIENT_SECRET,
			}),
		});

		const data = await res.json();

		await this.cacheManager.psetex(ACCESS_TOKEN_CACHE_KEY, data.expires_in * 1_000, data.access_token)

		return data.access_token as string;
	}
}
