<script lang="ts">
	import { goto } from '$app/navigation';
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import { method } from '$lib/stores';

	const finishTutorial = () => {
		$method = 'camera';
		goto('/scenes');
	};
</script>

<main
	class="bg-cover bg-no-repeat z-10 absolute left-0 top-0 w-screen h-screen"
	style="background-image: url('https://picsum.photos/id/10/720/1280');"
>
	<h2 class="sr-only">Camera Tutorial - Step 3</h2>

	<BpmDisplay
		abstract
		class=" bg-white/40 backdrop-blur-xl w-16 rounded-full aspect-square justify-center absolute top-4 right-4"
	/>

	<button
		on:click={finishTutorial}
		class="rounded-lg w-fit py-2 px-3 font-medium text-lg bg-white/80 backdrop-blur-lg absolute bottom-6 right-6"
		>Finish scene</button
	>
</main>
