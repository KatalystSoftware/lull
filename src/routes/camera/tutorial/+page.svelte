<script lang="ts">
	import { goto } from '$app/navigation';
	import BPMMeter from '$lib/components/bpm-meter.svelte';
	import { mediaStream, method, samplingCanvas, videoElement } from '$lib/stores';

	const finishTutorial = () => {
		$method = 'camera';
		goto('/camera/scenes');
	};
</script>

<h1 class="uppercase text-4xl text-center">lull</h1>

{#if $samplingCanvas && $videoElement && $mediaStream}
	<p>Place your index finger over the flashlight and back camera to measure your BPM</p>

	<p>Be sure to hold the phone still, preferable lay it down on a solid surface</p>

	<BPMMeter />

	<button
		on:click={finishTutorial}
		disabled
		class="bg-emerald-500 text-emerald-50 font-semibold text-lg py-2 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
		>Finish tutorial</button
	>
	<button
		on:click={finishTutorial}
		class="bg-emerald-500 text-emerald-50 font-semibold text-lg py-2 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
		>Skip tutorial</button
	>
{:else}
	<p>Camera not setup correctly!</p>
	<a href="/" class="underline">Go back to home</a>
{/if}
