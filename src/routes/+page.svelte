<script lang="ts">
	import { goto } from '$app/navigation';
	import Camera from '$lib/icons/Camera.svelte';
	import Watch from '$lib/icons/Watch.svelte';
	import { method } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($method === 'camera') {
			goto('/scenes');
		}
	});
</script>

<main class="p-4 flex flex-1 flex-col justify-start gap-16">
	<p class="font-medium text-xl text-center">Choose a device for tracking your pulse</p>

	<div class="flex flex-col gap-4">
		<a
			href="/camera/tutorial/step-1"
			class="bg-white/40 rounded-lg flex items-center gap-4 px-8 py-6"
		>
			<Camera class="w-6 h-6" />
			<span class="font-medium text-lg">Phone camera</span>
		</a>
		<button
			disabled
			class="relative bg-white/40 rounded-lg flex items-center gap-4 px-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<Watch class="w-6 h-6" />
			<p class="flex flex-col items-start">
				<span class="font-medium text-lg">Smartwatch</span>
				<span class="text-xs">Coming soon</span>
			</p>
		</button>
	</div>
</main>
