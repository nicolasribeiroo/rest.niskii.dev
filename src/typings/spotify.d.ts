type Song = {
	album: {
		external_urls: {
			spotify: string;
		};
		images: {
			url: string;
		}[];

		name: string;
	};
	artists: {
		name: string;
	}[];
	duration_ms: number;
	external_urls: {
		spotify: string;
	};
	name: string;
};

export type NowPlaying = {
	is_playing: boolean;
	item: Song;
	progress: number;
	timestamp: number;
};

export type TopSongs = {
	items: Song[];
};
