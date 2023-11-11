<script lang="ts">
	import { samplingCanvas, videoElement } from '$lib/stores';
</script>

<slot />

<div class="sr-only">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="camera-feed" bind:this={$videoElement} />
	<canvas id="sampling-canvas" width="30" height="30" bind:this={$samplingCanvas} />
</div>
