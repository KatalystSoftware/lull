<script lang="ts">
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import VideoPlayer from '$lib/components/videoplayer.svelte';
	import { averageBpmReal } from '$lib/stores';
</script>

<main class="absolute top-0 left-0 z-10 flex-1 h-full flex w-full">
	<h2 class="sr-only">Camera Tutorial - Step 3</h2>

	<BpmDisplay
		bpm={$averageBpmReal}
		abstract
		class="backdrop-blur w-12 rounded-full aspect-square justify-center absolute z-[2147483648] top-4 right-4"
	/>

	<VideoPlayer class="overflow-hidden flex-1" bpm={$averageBpmReal} />

	<a
		href="/scenes"
		class="z-[2147483648] rounded-xl w-fit py-3 px-4 font-semibold tracking-wider text-lg bg-neutral-700/30 backdrop-blur-lg text-white shadow-lg drop-shadow-lg absolute bottom-6 right-0 left-0 mx-auto"
		>Finish tutorial</a
	>
</main>
