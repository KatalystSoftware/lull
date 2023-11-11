/// <reference types="vite-plugin-pwa/svelte" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="@types/w3c-image-capture" />

import type { SpecialVideoPlayer } from '$lib/video-player';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var videoPlayer: SpecialVideoPlayer | undefined;
}

export {};
