<script lang="ts">
	import Landscape from '$lib/icons/Landscape.svelte';

	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	let sceneList: HTMLUListElement | undefined;
	let scrollRatio = 0;
	const updateScroll = () => {
		const scroll = sceneList?.scrollTop ?? 0;
		const maxScroll = (sceneList?.scrollHeight ?? 0) - (sceneList?.clientHeight ?? 0);

		scrollRatio = scroll / maxScroll;
	};
</script>

<main class="p-4 flex flex-1 flex-col justify-start gap-8 h-full">
	<a
		href="/scenes/new"
		class="rounded-xl bg-white/40 gap-4 px-8 py-6 font-medium text-xl text-center flex items-center justify-center relative"
	>
		<Landscape class="w-12 h-12" />
		<span>Start a new scene</span>
	</a>
	<div class="relative h-96 rounded-xl overflow-clip">
		<ul
			class="space-y-4 overflow-y-scroll snap-y snap-proximity h-full"
			bind:this={sceneList}
			on:scroll={updateScroll}
		>
			{#each { length: 8 } as _, index}
				<li class="rounded-xl overflow-clip snap-start h-24">
					<a
						href="/scenes/{index + 11}"
						class="font-medium text-xl relative focus-visible:opacity-60 hover:opacity-80"
					>
						<span
							class="absolute left-0 text-sm top-0 rounded-br-xl rounded-tl-xl w-30 text-center bg-neutral-700/30 backdrop-blur-lg text-white px-2 py-1"
							>{rtf.format(-index, 'days')}</span
						>
						<img
							src="https://picsum.photos/id/{index + 11}/600/200"
							alt=""
							width="600"
							height="200"
						/>
					</a>
				</li>
			{/each}
		</ul>
		{#if scrollRatio > 0.1}
			<div
				class="absolute z-20 top-0 w-full bg-gradient-to-b from-red-50/80 h-24 rounded-b-2xl pointer-events-none"
			/>
		{/if}

		{#if scrollRatio < 0.9}
			<div
				class="absolute z-20 bottom-0 w-full bg-gradient-to-t from-red-50/80 h-24 rounded-t-2xl pointer-events-none"
			/>
		{/if}
	</div>
</main>
