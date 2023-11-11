<script lang="ts">
	import BPMMeter from '$lib/components/bpm-meter.svelte';
	import { mediaStream, samplingCanvas, videoElement } from '$lib/stores';
</script>

<h1 class="uppercase text-4xl text-center">lull</h1>

{#if $samplingCanvas && $videoElement && $mediaStream}
	<p>Place your index finger over the flashlight and back camera to measure your BPM</p>

	<p>Be sure to hold the phone still, preferable lay it down on a solid surface</p>

	<BPMMeter />
{:else}
	<p>Camera not setup correctly!</p>
	<a href="/" class="underline">Go back to home</a>
{/if}
