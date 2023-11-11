export class SpecialVideoPlayer {
	crossfadeTimeMs = 3000;
	currentlyActiveVideo: string | null = null;
	videoElements: { [key: string]: HTMLVideoElement } = {};

	constructor(
		public element: HTMLElement,
		public videosPaths: { [key: string]: string }
	) {
		for (const [key, value] of Object.entries(videosPaths)) {
			const videoElement = SpecialVideoPlayer.createVideoElement(value);
			element.appendChild(videoElement);
			this.videoElements[key] = videoElement;
		}
	}

	setActiveVideo(videoId: string) {
		const activateVideo = (el: HTMLVideoElement) => {
			el.play();
			el.currentTime = 0;
			this.currentlyActiveVideo = videoId;
			el.classList.remove('visible-video');
			setTimeout(() => {
				el.classList.add('visible-video');
				el.style.zIndex = (Date.now() + '').slice(5);
			}, 50);
		};

		const deactivateVideo = (_el: HTMLVideoElement) => {
			// this function is not useful if old videos are not paused for performance
			this.currentlyActiveVideo = null;
		};

		if (this.currentlyActiveVideo === null) {
			activateVideo(this.videoElements[videoId]);

			return;
		}

		if (this.currentlyActiveVideo === videoId) {
			return;
		}

		deactivateVideo(this.videoElements[this.currentlyActiveVideo]);
		activateVideo(this.videoElements[videoId]);
	}

	static createVideoElement(path: string): HTMLVideoElement {
		const element = document.createElement('video');
		element.classList.add('video');
		element.autoplay = true;
		element.loop = true;
		element.src = path;
		return element;
	}

	setSpeed(speed: number) {
		for (const value of Object.values(this.videoElements)) {
			value.playbackRate = speed;
		}
	}
}
