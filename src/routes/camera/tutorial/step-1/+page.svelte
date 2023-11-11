<script lang="ts">
	import { goto } from '$app/navigation';
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import { averageBpm, method } from '$lib/stores';

	const finishTutorial = () => {
		$method = 'camera';
		goto('/scenes');
	};
</script>

<main class="p-4 flex flex-1 flex-col justify-start gap-8">
	<h2 class="sr-only">Camera Tutorial- Step 1</h2>

	<p class="font-medium text-xl text-center">
		Place your index finger over the flashlight and back camera
	</p>

	<BpmDisplay />

	<p class="text-center">
		Be sure to hold the phone still, preferable lay it down on a solid surface
	</p>

	<div class="flex flex-col gap-4">
		<a
			href={$averageBpm ? '/camera/tutorial/step-2' : undefined}
			aria-disabled={!$averageBpm}
			class="block text-center font-medium text-lg aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
			>Continue</a
		>
		<button
			on:click={finishTutorial}
			class="font-medium text-lg text-center disabled:opacity-50 disabled:cursor-not-allowed"
			>Skip tutorial</button
		>
	</div>
</main>
