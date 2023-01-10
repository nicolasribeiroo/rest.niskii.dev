import { GetCurrentPlaying } from '@app/use-cases/get-current-playing';
import { GetTopSongs } from '@app/use-cases/get-top-songs';
import { Controller, Get } from '@nestjs/common';

@Controller('spotify')
export class SpotifyController {
	public constructor(
		private readonly getCurrentPlaying: GetCurrentPlaying,
		private readonly getTopSongs: GetTopSongs,
	) {}

	@Get('currently-playing')
	public async current() {
		return this.getCurrentPlaying.execute();
	}

	@Get('top-songs')
	public async topSongs() {
		return this.getTopSongs.execute();
	}
}
