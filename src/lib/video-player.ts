export class SpecialVideoPlayer {
	crossfadeTimeMs = 3000;
	currentlyActiveVideo: string | null = null;
	videoElements: { [key: string]: HTMLVideoElement } = {};
	interval : NodeJS.Timeout | null = null;

	constructor(
		public element: HTMLElement,
		public videosPaths: { [key: string]: string }
	) {
		for (const [key, value] of Object.entries(videosPaths)) {
			const videoElement = SpecialVideoPlayer.createVideoElement(value);
			element.appendChild(videoElement);
			this.videoElements[key] = videoElement;
		}
		this.interval = setInterval(() => {
			this.processActivationQueue();
		}, 3000)
		
	}

	activationQueue : string[] = [];

	processActivationQueue() {
		if (this.activationQueue.length === 0) {
			return
		}

		if (this.activationQueue.length > 1) {
			this.activationQueue = [this.activationQueue.at(-1)!]
		}
		
		const videoId = this.activationQueue[0];
		this.activationQueue.shift()

		const activateVideo = (el: HTMLVideoElement) => {
			el.play();
			this.currentlyActiveVideo = videoId;
			el.classList.remove('visible-video');
			setTimeout(() => {
				el.classList.add('visible-video');
				el.style.zIndex = (Date.now() + '').slice(5);
			}, 50);
		};

		const deactivateVideo = (_el: HTMLVideoElement) => {
			// this function is not useful if old videos are not paused for performance
		};

		if (this.currentlyActiveVideo === null) {
			activateVideo(this.videoElements[videoId]);

			return;
		}

		if (this.currentlyActiveVideo === videoId) {
			return;
		}

		console.log('activating new video', videoId)
		deactivateVideo(this.videoElements[this.currentlyActiveVideo]);
		activateVideo(this.videoElements[videoId]);
	}

	setActiveVideo(videoId: string) {
		this.activationQueue.push(videoId);
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
