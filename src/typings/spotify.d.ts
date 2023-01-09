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
	external_urls: {
		spotify: string;
	};
	name: string;
};

export type NowPlaying = {
	is_playing: boolean;
	item: Song;
};

export type TopSongs = {
	items: Song[];
};
