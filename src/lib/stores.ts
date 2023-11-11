import { browser } from '$app/environment';
import { analyzeData, averageBrightness, calculateBpm, type Sample } from '$lib/utils/bpm';
import { derived, writable, type Readable, type Updater, type Writable } from 'svelte/store';

export const videoElement = writable<HTMLVideoElement | null>(null);
export const samplingCanvas = writable<HTMLCanvasElement | null>(null);
export const mediaStream = writable<MediaStream | null>(null);

export const averageBpm: Readable<number | undefined> = derived(
	[videoElement, samplingCanvas, mediaStream],
	([$videoElement, $samplingCanvas, $mediaStream], set) => {
		const samplingContext = $samplingCanvas?.getContext('2d', {
			willReadFrequently: true
		});

		const sampleBuffer: Sample[] = [];
		const maxSamples = 60 * 5; // 5 minutes of samples
		const bpmMeasurements: number[] = [];
		const maxBpmMeasurements = 20;

		const startMonitoring = () => {
			if (!$videoElement || !$mediaStream) {
				console.warn('Video element or media stream not found');
				return;
			}

			$videoElement.srcObject = $mediaStream;
			$videoElement.play();
		};

		const stopMonitoring = () => {
			if (!$videoElement) {
				console.warn('Video element not found');
				return;
			}

			$videoElement.pause();
			$videoElement.srcObject = null;
		};

		const monitorLoop = () => {
			processFrame();
			window.requestAnimationFrame(monitorLoop);
		};

		const processFrame = () => {
			// Get a sample from the canvas pixels
			if (!$samplingCanvas || !samplingContext || !$videoElement) {
				return;
			}
			samplingContext.drawImage($videoElement, 0, 0, $samplingCanvas.width, $samplingCanvas.height);

			const value = averageBrightness($samplingCanvas, samplingContext);
			const time = Date.now();

			sampleBuffer.push({ value, time });
			if (sampleBuffer.length > maxSamples) {
				sampleBuffer.shift();
			}

			const dataStats = analyzeData(sampleBuffer);

			const calculatedBpm = calculateBpm(dataStats.crossings);
			if (calculatedBpm) {
				bpmMeasurements.push(calculatedBpm);
				if (bpmMeasurements.length > maxBpmMeasurements) {
					bpmMeasurements.shift();
				}
			}
			set(
				bpmMeasurements.length
					? bpmMeasurements.reduce((a, c) => a + c) / bpmMeasurements.length
					: undefined
			);
		};

		if (browser) {
			startMonitoring();
			setTimeout(() => {
				monitorLoop();
			}, 1000);
		}

		return () => {
			stopMonitoring();
		};
	}
);

function storable<T>(key: string, defaultValue: T): Writable<T> {
	const store = writable(defaultValue);
	const { subscribe, set } = store;

	browser && localStorage.getItem(key) && set(JSON.parse(localStorage.getItem(key) as string));

	return {
		subscribe,
		set: (value: T) => {
			browser && localStorage.setItem(key, JSON.stringify(value));
			set(value);
		},
		update: (callback: Updater<T>) =>
			store.update((last) => {
				const value = callback(last);
				browser && localStorage.setItem(key, JSON.stringify(value));
				return value;
			})
	};
}

export const method = storable<'camera' | 'watch' | undefined>('method', undefined);
