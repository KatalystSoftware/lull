<script lang="ts">
	import BpmDisplay from '$lib/components/bpm-display.svelte';
	import { averageBpmReal } from '$lib/stores';
</script>

<main class="p-4 flex flex-1 flex-col justify-start gap-12 md:gap-16">
	<h2 class="sr-only">Camera Tutorial- Step 1</h2>

	<p class="font-medium text-xl text-center">
		Place your index finger over the flashlight and back camera
	</p>

	<BpmDisplay label bpm={$averageBpmReal} />

	<p class="text-center">
		Be sure to hold the phone still, preferable lay it down on a solid surface
	</p>

	<div class="space-y-4">
		<a
			href={$averageBpmReal ? '/camera/tutorial/step-2' : undefined}
			aria-disabled={!$averageBpmReal}
			class="block text-center font-medium text-lg aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
			>Continue</a
		>
		<a
			href="/scenes"
			class="block text-center font-medium text-lg aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
			>Skip tutorial</a
		>
	</div>
</main>
