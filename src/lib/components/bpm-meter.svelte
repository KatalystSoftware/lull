<script lang="ts">
	import HeartrateIcon from '$lib/icons/HeartRate.svelte';
	import { mediaStream, samplingCanvas, videoElement } from '$lib/stores';
	import { analyzeData, averageBrightness, calculateBpm, type Sample } from '$lib/utils/bpm';
	import { onDestroy, onMount } from 'svelte';

	$: samplingContext = $samplingCanvas?.getContext('2d', {
		willReadFrequently: true
	});

	let sampleBuffer: Sample[] = [];
	const maxSamples = 60 * 5; // 5 minutes of samples

	let bpmMeasurements: number[] = [];
	const maxBpmMeasurements = 20;

	let averageBpm: number | undefined;

	const startMonitoring = () => {
		if ($videoElement && $mediaStream) {
			$videoElement.srcObject = $mediaStream;
			$videoElement.play();
		}
	};

	const stopMonitoring = () => {
		if ($videoElement) {
			$videoElement.pause();
			$videoElement.srcObject = null;
		}
	};

	const monitorLoop = () => {
		processFrame();
		window.requestAnimationFrame(monitorLoop);
	};

	const processFrame = () => {
		// Get a sample from the canvas pixels
		if (!$samplingCanvas || !samplingContext || !$videoElement) {
			throw new Error('Sampling canvas, context or video not found');
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
		averageBpm = bpmMeasurements.length
			? bpmMeasurements.reduce((a, c) => a + c) / bpmMeasurements.length
			: undefined;
	};

	onMount(() => {
		startMonitoring();
		setTimeout(() => {
			monitorLoop();
		}, 1000);
	});

	onDestroy(() => {
		stopMonitoring();
	});
</script>

<p
	class="text-2xl text-center self-center bg-red-200 rounded-full w-xs p-8 flex flex-col items-center w-fit aspect-square"
>
	<HeartrateIcon class="inline-block w-6 h-6 text-red-950" />
	<span class="text-4xl font-bold"
		>{averageBpm?.toLocaleString('en', {
			maximumSignificantDigits: 3,
			maximumFractionDigits: 0,
			minimumFractionDigits: 0
		}) ?? '-'}
	</span>
</p>
