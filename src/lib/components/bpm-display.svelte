<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import DoubleArrowDown from '$lib/icons/DoubleArrowDown.svelte';
	import DoubleArrowUp from '$lib/icons/DoubleArrowUp.svelte';
	import Line from '$lib/icons/Line.svelte';
	import LoadingIcon from '$lib/icons/Loading.svelte';
	import { averageBpm } from '$lib/stores';
	import { cn } from '$lib/utils';
	export let abstract = false;

	let _class = '';
	export { _class as class };

	const abstractThresholds = {
		veryLow: 50,
		low: 60,
		medium: 70,
		high: 80,
		veryHigh: 90
	};
</script>

<p class={cn('w-xs flex flex-col items-center gap-2 text-center', _class)}>
	{#if $averageBpm}
		<span class="text-8xl font-medium w-xs">
			{#if !abstract}
				{$averageBpm?.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}
			{:else if $averageBpm < abstractThresholds.veryLow}
				<DoubleArrowDown class="w-12 h-12" />
			{:else if $averageBpm < abstractThresholds.low}
				<ArrowDown class="w-12 h-12" />
			{:else if $averageBpm < abstractThresholds.medium}
				<Line class="w-12 h-12" />
			{:else if $averageBpm < abstractThresholds.high}
				<ArrowUp class="w-12 h-12" />
			{:else if $averageBpm < abstractThresholds.veryHigh}
				<DoubleArrowUp class="w-12 h-12" />
			{:else}
				<DoubleArrowUp class="w-12 h-12" />
			{/if}
		</span>
	{:else}
		<span class="w-[96px] aspect-square flex items-center justify-center">
			<LoadingIcon class="w-12 h-12" />
		</span>
	{/if}
	{#if !abstract}
		<span class="font-medium">BPM</span>
	{/if}
</p>
