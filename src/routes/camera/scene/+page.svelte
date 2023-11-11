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
			'bg-white/40 backdrop-blur-xl w-20 rounded-full aspect-square justify-center absolute top-4 right-4 z-[2147483648]'
		)}
	/>

	<VideoPlayer class="overflow-hidden flex-1" bpm={averageBpm} />

	<a
		href="/scenes"
		class="z-[2147483648] rounded-lg w-fit py-2 px-3 font-medium text-lg bg-white/80 backdrop-blur-lg absolute bottom-6 right-6"
		>Finish scene</a
	>
</main>
