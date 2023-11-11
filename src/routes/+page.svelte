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

<h1 class="uppercase text-4xl text-center">lull</h1>

<p>Measure your heart rate with your phone camera or smartwatch.</p>

<div class="flex flex-col gap-4">
	<a
		href="/camera/tutorial"
		class="bg-emerald-200 border-2 rounded-lg flex items-center gap-4 px-4 py-8 border-emerald-800"
	>
		<div class="bg-sky-200 p-4 rounded-full aspect-square w-fit">
			<Camera class="w-6 h-6" />
		</div>
		<span class="font-medium text-lg">Use phone camera.</span>
	</a>
	<button
		disabled
		class="relative bg-emerald-200 border-2 rounded-lg flex items-center gap-4 px-4 py-8 border-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		<div class="bg-amber-200 p-4 rounded-full aspect-square w-fit">
			<Watch class="w-6 h-6" />
		</div>
		<p class="flex flex-col items-start">
			<span class="font-medium text-lg">Use smartwatch.</span>
			<span class="text-xs">Coming soon.</span>
		</p>
	</button>
</div>
