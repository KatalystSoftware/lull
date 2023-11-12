<script lang="ts">
	import { cn } from '$lib/utils';
	export let abstract = false;
	export let label = false;
	export let size: 'sm' | 'lg' = 'lg';

	let _class = '';
	export { _class as class };

	export let bpm: number | undefined;

	import { bpm_limits } from '$lib/../resources/bpm_limits';

	import LoadingIcon from '$lib/icons/Loading.svelte';
	import Pulse1Icon from '$lib/icons/Pulse1.svelte';
	import Pulse2Icon from '$lib/icons/Pulse2.svelte';
	import Pulse3Icon from '$lib/icons/Pulse3.svelte';
	import Pulse4Icon from '$lib/icons/Pulse4.svelte';
	import Pulse5Icon from '$lib/icons/Pulse5.svelte';
</script>

<p class={cn('w-xs flex flex-col items-center gap-2 text-center z-10', _class)}>
	{#if bpm}
		<span
			class={cn('text-8xl font-medium w-xs', size === 'lg' ? 'text-8xl' : 'text-4xl text-white')}
		>
			{#if !abstract}
				{bpm?.toLocaleString('en', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})}
			{:else}
				<Pulse1Icon
					class={cn('sr-only text-red-50/70 w-12 h-12', bpm < bpm_limits.veryLow && 'not-sr-only')}
				/>
				<Pulse2Icon
					class={cn(
						'sr-only text-red-100/70 w-12 h-12',
						bpm_limits.veryLow < bpm && bpm <= bpm_limits.low && 'not-sr-only'
					)}
				/>
				<Pulse3Icon
					class={cn(
						'sr-only text-red-100/80 w-12 h-12',
						bpm_limits.low < bpm && bpm <= bpm_limits.medium && 'not-sr-only'
					)}
				/>
				<Pulse4Icon
					class={cn(
						'sr-only text-red-100/80 w-12 h-12',
						bpm_limits.medium < bpm && bpm <= bpm_limits.high && 'not-sr-only'
					)}
				/>
				<Pulse5Icon
					class={cn('sr-only text-red-200/80 w-12 h-12', bpm > bpm_limits.high && 'not-sr-only')}
				/>
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
