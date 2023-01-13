import { GITHUB_URL, SPOTIFY_URL, TWITTER_URL } from '@helpers/index';
import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';

@Controller()
export class HttpController {

	@Throttle(10, 60)
	@Get()
	@HttpCode(200)
	public routes() {
		return {
			health: '/health',
			spotify: {
				currentlyPlaying: '/spotify/currently-playing',
				topSongs: '/spotify/top-songs',
			},
			socials: {
				github: '/github',
				spotify: '/spotify',
				twitter: '/twitter',
			}
		}
	}

	@Get('github')
	@HttpCode(301)
	public github(@Res() res: Response) {
		res.redirect(GITHUB_URL)
	}

	@Get('spotify')
	@HttpCode(301)
	public spotify(@Res() res: Response) {
		res.redirect(SPOTIFY_URL)
	}

	@Get('twitter')
	@HttpCode(301)
	public twitter(@Res() res: Response) {
		res.redirect(TWITTER_URL)
	}

	@Throttle(5, 60)
	@Get('health')
	@HttpCode(200)
	public health() {
		return 'Ok';
	}
}
