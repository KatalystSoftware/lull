<script lang="ts">
	import { page } from '$app/stores';
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import VideoPlayer from '$lib/components/videoplayer.svelte';
	import { averageBpmFake, averageBpmReal } from '$lib/stores';
	import { cn } from '$lib/utils';

	$: demo = $page.url.searchParams.get('demo') === 'true';
	$: debug = $page.url.searchParams.get('debug') === 'true';
	$: averageBpm = demo ? $averageBpmFake : $averageBpmReal;
</script>

<main class="absolute top-0 left-0 h-full z-10 flex flex-1 w-full">
	<h2 class="sr-only">Scene</h2>

	<BpmDisplay
		bpm={averageBpm}
		abstract={!debug}
		size={debug ? 'sm' : 'lg'}
		class={cn(
			'backdrop-blur w-12 rounded-full aspect-square justify-center absolute top-4 right-4 z-[2147483648]'
		)}
	/>

	<VideoPlayer class="overflow-hidden flex-1 md:rounded-lg" bpm={averageBpm} />

	<a
		href="/scenes"
		class="z-[2147483648] rounded-xl w-fit py-3 px-4 font-semibold tracking-wider text-lg bg-neutral-700/30 backdrop-blur-lg text-white shadow-lg drop-shadow-lg absolute bottom-6 right-0 left-0 mx-auto"
		>Finish scene</a
	>
</main>
