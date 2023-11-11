<script lang="ts">
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import VideoPlayer from '$lib/components/videoplayer.svelte';
	import { averageBpmReal } from '$lib/stores';
</script>

<main class="absolute top-0 left-0 h-screen z-10 flex-1 flex w-full">
	<h2 class="sr-only">Camera Tutorial - Step 3</h2>

	<BpmDisplay
		bpm={$averageBpmReal}
		abstract
		class="bg-white/40 backdrop-blur-xl w-16 rounded-full aspect-square justify-center absolute z-[2147483648] top-4 right-4"
	/>

	<VideoPlayer class="overflow-hidden flex-1" bpm={$averageBpmReal} />

	<a
		href="/scenes"
		class="z-[2147483648] rounded-lg w-fit py-2 px-3 font-medium text-lg bg-white/80 backdrop-blur-lg absolute bottom-6 right-6"
		>Finish scene</a
	>
</main>
