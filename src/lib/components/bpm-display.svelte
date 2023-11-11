<script lang="ts">
	import LoadingIcon from '$lib/icons/Loading.svelte';
	import { averageBpm } from '$lib/stores';
</script>

<p class="w-xs flex flex-col items-center gap-2 text-center">
	{#if $averageBpm}
		<span class="text-8xl font-medium w-xs"
			>{$averageBpm?.toLocaleString('en', {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			})}
		</span>
	{:else}
		<span class="w-[96px] aspect-square flex items-center justify-center">
			<LoadingIcon class="w-12 h-12" />
		</span>
	{/if}
	<span class="font-medium">BPM</span>
</p>
