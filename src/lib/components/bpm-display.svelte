<script lang="ts">
	import HeartrateIcon from '$lib/icons/HeartRate.svelte';
	import { averageBpm } from '$lib/stores';
</script>

<p
	class="text-2xl text-center self-center bg-red-200 rounded-full w-xs p-8 flex flex-col items-center aspect-square"
>
	<HeartrateIcon class="inline-block w-6 h-6 text-red-950" />
	<span class="text-4xl font-bold w-xs"
		>{$averageBpm?.toLocaleString('en', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}) ?? '-'}
	</span>
</p>
