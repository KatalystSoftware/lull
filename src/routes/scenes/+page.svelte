<script lang="ts">
	import Landscape from '$lib/icons/Landscape.svelte';

	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
</script>

<a
	href="/scenes/new"
	class="rounded-xl bg-white/40 gap-4 px-8 py-6 font-medium text-xl text-center flex items-center justify-center relative"
>
	<Landscape class="w-12 h-12" />
	<span>Start a new scene</span>
</a>
<ul class="space-y-4 pb-8 overflow-y-scroll snap-y snap-proximity relative">
	{#each { length: 8 } as _, index}
		<li class="rounded-xl overflow-clip snap-start">
			<a
				href="/scenes/{index + 11}"
				class="font-medium text-xl relative focus-visible:opacity-60 hover:opacity-80"
			>
				<span
					class="absolute left-0 text-sm top-0 rounded-br-xl w-30 text-center bg-neutral-700/30 backdrop-blur-lg text-white px-2 py-1"
					>{rtf.format(-index, 'days')}</span
				>
				<img src="https://picsum.photos/id/{index + 11}/600/200" alt="" width="600" height="200" />
			</a>
		</li>
	{/each}
</ul>
