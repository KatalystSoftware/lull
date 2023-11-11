<script lang="ts">
	import { browser } from '$app/environment';

	const SUPPORS_MEDIA_DEVICES = browser && 'mediaDevices' in navigator;
	const SUPPORTS_IMAGE_CAPTURE = browser && 'ImageCapture' in window;

	const MIN_BPM = 30;
	const MAX_BPM = 200;

	let videoElement: HTMLVideoElement | null = null;
	let samplingCanvas: HTMLCanvasElement | null = null;
	$: samplingContext = samplingCanvas?.getContext('2d', {
		willReadFrequently: true
	});
	type Sample = {
		value: number;
		time: number;
	};

	let sampleBuffer: Sample[] = [];
	const maxSamples = 60 * 5; // 5 minutes of samples

	let bpmMeasurements: number[] = [];
	const maxBpmMeasurements = 20;

	let averageBpm: number | undefined;

	let loading = false;
	const obtainVideoCamera = async () => {
		try {
			loading = true;
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameras = devices.filter((device) => device.kind === 'videoinput');

			if (cameras.length === 0) {
				throw new Error('No cameras found');
			}

			const camera = cameras[0];
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: camera.deviceId,
					facingMode: 'environment',
					width: { ideal: 4096 },
					height: { ideal: 2160 },

					whiteBalanceMode: 'manual',
					exposureMode: 'manual',
					focusMode: 'manual'
				}
			});
			const videoTrack = mediaStream.getVideoTracks()[0];
			const imageCapture = SUPPORTS_IMAGE_CAPTURE ? new ImageCapture(videoTrack) : undefined;
			const photoCapabilities = await imageCapture?.getPhotoCapabilities();
			if (photoCapabilities?.fillLightMode?.includes('flash')) {
				await videoTrack.applyConstraints({
					advanced: [{ torch: true }]
				});
			}

			if (videoElement) {
				videoElement.srcObject = mediaStream;
				videoElement.play();

				setTimeout(() => {
					monitorLoop();
				}, 1000);
			} else {
				console.error('videoSource not found');
			}
			loading = false;
		} catch (error) {
			console.error(error);
		}
	};

	const monitorLoop = () => {
		processFrame();
		window.requestAnimationFrame(monitorLoop);
	};

	const averageBrightness = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
		// 1d array of r, g, b, a pixel data values
		const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		let sum = 0;

		// Only use the red and green channels as that combination gives the best readings
		for (let i = 0; i < pixelData.length; i += 4) {
			sum = sum + pixelData[i] + pixelData[i + 1];
		}

		// Since we only process two channels out of four we scale the data length to half
		const avg = sum / (pixelData.length * 0.5);

		// Scale to 0 ... 1
		return avg / 255;
	};

	const getAverageCrossings = (samples: Sample[], average: number) => {
		// Get each sample at points where the graph has crossed below the average level
		// These are visible as the rising edges that pass the midpoint of the graph
		const crossingsSamples: Sample[] = [];
		let previousSample = samples[0]; // Avoid if statement in loop

		samples.forEach(function (currentSample) {
			// Check if next sample has gone below average.
			if (currentSample.value < average && previousSample.value > average) {
				crossingsSamples.push(currentSample);
			}

			previousSample = currentSample;
		});

		return crossingsSamples;
	};

	const analyzeData = (samples: Sample[]) => {
		// Get the mean average value of the samples
		const average = samples.map((sample) => sample.value).reduce((a, c) => a + c) / samples.length;

		// Find the lowest and highest sample values in the data
		// Used for both calculating bpm and fitting the graph in the canvas
		let min = samples[0].value;
		let max = samples[0].value;
		samples.forEach((sample) => {
			if (sample.value > max) {
				max = sample.value;
			}
			if (sample.value < min) {
				min = sample.value;
			}
		});

		// The range of the change in values
		// For a good measurement it should be between  ~ 0.002 - 0.02
		const range = max - min;

		const crossings = getAverageCrossings(samples, average);
		return {
			average,
			min,
			max,
			range,
			crossings
		};
	};

	const calculateBpm = (samples: Sample[]) => {
		if (samples.length < 2) {
			return;
		}

		const averageInterval =
			(samples[samples.length - 1].time - samples[0].time) / (samples.length - 1);

		const bpm = 60000 / averageInterval;

		// Clamp bpm to a reasonable range
		return Math.max(MIN_BPM, Math.min(bpm, MAX_BPM));
	};

	const processFrame = () => {
		// Get a sample from the canvas pixels
		if (!samplingCanvas || !samplingContext || !videoElement) {
			throw new Error('Sampling canvas, context or video not found');
		}
		samplingContext.drawImage(videoElement, 0, 0, samplingCanvas.width, samplingCanvas.height);

		const value = averageBrightness(samplingCanvas, samplingContext);
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
		averageBpm = bpmMeasurements.length
			? bpmMeasurements.reduce((a, c) => a + c) / bpmMeasurements.length
			: undefined;
	};
</script>

<div>
	{#if browser && !SUPPORS_MEDIA_DEVICES}
		<p>Media devices not supported</p>
	{/if}
	{#if browser && !SUPPORTS_IMAGE_CAPTURE}
		<p>Image capture not supported</p>
	{/if}

	{#if loading}
		<p>Loading...</p>
	{/if}
	<p class="text-2xl">
		BPM: {averageBpm?.toLocaleString('en', {
			maximumSignificantDigits: 3,
			maximumFractionDigits: 0,
			minimumFractionDigits: 0
		}) ?? '-'}
	</p>
	<div class="sr-only">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="camera-feed" bind:this={videoElement} />
		<canvas id="sampling-canvas" width="30" height="30" bind:this={samplingCanvas} />
	</div>
	<button
		class="bg-emerald-500 text-emerald-50 text-lg py-2 px-3 rounded-full"
		on:click={obtainVideoCamera}>Get camera</button
	>
</div>
