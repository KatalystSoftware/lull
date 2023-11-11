<script lang="ts">
	/*
	import ArrowDown from '$lib/icons/ArrowDown.svelte';
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import DoubleArrowDown from '$lib/icons/DoubleArrowDown.svelte';
	import DoubleArrowUp from '$lib/icons/DoubleArrowUp.svelte';
	import Line from '$lib/icons/Line.svelte';
	*/
	import LoadingIcon from '$lib/icons/Loading.svelte';
	import { cn } from '$lib/utils';
	export let abstract = false;
	export let label = false;
	export let size: 'sm' | 'lg' = 'lg';

	let _class = '';
	export { _class as class };

	export let bpm: number | undefined;

	import { bpm_limits } from '$lib/../resources/bpm_limits';

	import Heart from '$lib/icons/Heart.svelte';
	import Meditation from '$lib/icons/Meditation.svelte';
	import RevolvingHearts from '$lib/icons/RevolvingHearts.svelte';
	import TwoHearts from '$lib/icons/TwoHearts.svelte';
	import OutlineHeart from '$lib/icons/OutlineHeart.svelte';
</script>

<p class={cn('w-xs flex flex-col items-center gap-2 text-center z-10', _class)}>
	{#if bpm}
		<span class={cn('text-8xl font-medium w-xs', size === 'lg' ? 'text-8xl' : 'text-4xl')}>
			{#if !abstract}
				{bpm?.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}
			{:else if bpm < bpm_limits.veryLow}
				<Meditation class="w-12 h-12" />
			{:else if bpm < bpm_limits.low}
				<OutlineHeart class="w-12 h-12" />
			{:else if bpm < bpm_limits.medium}
				<Heart class="w-12 h-12" />
			{:else if bpm < bpm_limits.high}
				<TwoHearts class="w-12 h-12" />
			{:else if bpm < bpm_limits.veryHigh}
				<RevolvingHearts class="w-12 h-12" />
			{:else}
				<RevolvingHearts class="w-12 h-12" />
			{/if}
		</span>
	{:else}
		<span class="text-8xl font-medium w-xs">
			<LoadingIcon class="w-12 h-12" />
		</span>
	{/if}
	{#if label}
		<span class="font-medium">BPM</span>
	{/if}
</p>
