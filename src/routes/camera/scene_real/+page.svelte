<script lang="ts">
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import VideoPlayer from '$lib/components/videoplayer.svelte';
	import { averageBpmReal } from '$lib/stores';

</script>

<main
	class="bg-cover bg-no-repeat z-10 absolute left-0 top-0 w-screen h-screen"
>
	<h2 class="sr-only">Camera Tutorial - Step 3</h2>

	<VideoPlayer bpm={$averageBpmReal}></VideoPlayer>
	
	<BpmDisplay
		bpm={$averageBpmReal}
		abstract
		class=" bg-white/40 backdrop-blur-xl w-16 rounded-full aspect-square justify-center absolute top-4 right-4"
	/>

	<a
		href="/scenes"
		class="rounded-lg w-fit py-2 px-3 font-medium text-lg bg-white/80 backdrop-blur-lg absolute bottom-6 right-6"
		>Finish scene</a
	>
</main>
