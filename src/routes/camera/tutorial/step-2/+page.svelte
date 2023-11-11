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
	<h2 class="sr-only">Camera Tutorial - Step 2</h2>

	<p class="font-medium text-xl text-center">
		Follow your pulse through the changes in the landscape and calm yourself down
	</p>

	<BpmDisplay />

	<div class="flex flex-col gap-4">
		<a
			href={$averageBpm ? '/camera/tutorial/step-3' : undefined}
			aria-disabled={!$averageBpm}
			class="block text-center font-medium text-lg aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
			>Continue</a
		>
		<button
			on:click={finishTutorial}
			class="font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>Skip tutorial</button
		>
	</div>
</main>
