<script lang="ts">
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import DoubleArrowDown from '$lib/icons/DoubleArrowDown.svelte';
	import DoubleArrowUp from '$lib/icons/DoubleArrowUp.svelte';
	import Line from '$lib/icons/Line.svelte';
	import LoadingIcon from '$lib/icons/Loading.svelte';
	import { cn } from '$lib/utils';
	export let abstract = false;

	let _class = '';
	export { _class as class };

	export let bpm : number | undefined

	import {bpm_limits} from '$lib/../resources/bpm_limits';
</script>

<p class={cn('w-xs flex flex-col items-center gap-2 text-center z-10', _class)}>
	{#if bpm}
		<span class="text-8xl font-medium w-xs">
			{#if !abstract}
				{bpm?.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}
			{:else if bpm < bpm_limits.veryLow}
				<DoubleArrowDown class="w-12 h-12" />
			{:else if bpm < bpm_limits.low}
				<ArrowDown class="w-12 h-12" />
			{:else if bpm < bpm_limits.medium}
				<Line class="w-12 h-12" />
			{:else if bpm < bpm_limits.high}
				<ArrowUp class="w-12 h-12" />
			{:else if bpm < bpm_limits.veryHigh}
				<DoubleArrowUp class="w-12 h-12" />
			{:else}
				<DoubleArrowUp class="w-12 h-12" />
			{/if}
		</span>
	{:else}
		<span class="text-8xl font-medium w-xs">
			<LoadingIcon class="w-12 h-12" />
		</span>
	{/if}
	{#if !abstract}
		<span class="font-medium">BPM</span>
	{/if}
</p>
