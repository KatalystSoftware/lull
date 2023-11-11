<script lang="ts">
	import { goto } from '$app/navigation';
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import { method } from '$lib/stores';

	const finishTutorial = () => {
		$method = 'camera';
		goto('/scenes');
	};
</script>

<main class="flex flex-1 flex-col justify-end items-end gap-4">
	<h2 class="sr-only">Camera Tutorial - Step 3</h2>

	<img
		src="https://picsum.photos/id/10/600/1200"
		width="600"
		height="1200"
		alt=""
		class="absolute inset-0 z-1"
	/>

	<BpmDisplay
		abstract
		class="z-10 bg-white/50 backdrop-blur-xl w-16 rounded-full aspect-square justify-center"
	/>

	<button
		on:click={finishTutorial}
		class="rounded-lg w-fit py-2 px-3 font-medium z-10 text-lg bg-white/50 backdrop-blur-xl"
		>Finish</button
	>
</main>
