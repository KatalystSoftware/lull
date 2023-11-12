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
<style>
	li {
		transition: height 0.2s;
	}

	:global(li.active) {
		height: 11rem;
	}

	.graph {
		transition: opacity 0.1s;
		opacity: 0;
		position: absolute;
		top: 89px;
		background-color: #595959e8;
		border-radius: 24px;
		padding: 7px;
		left: 50%;
    	transform: translate(-50%, -50%);
	}

	button {
		width: -webkit-fill-available;
	}

	:global(li.active > button > .graph) {
		opacity: 1 !important
	}

	img {
		object-position: 50% 50%;
		height: calc(82px * 1.25);
   		width: calc(171px * 1.25);
		max-width: unset;
	}

	.imagediv {
		background-size: cover;
		background-position: 50% 70%;
		background-repeat: no-repeat;
		width: 100%;
		height: 200px;
	}

</style>

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
			class="space-y-4 overflow-y-scroll h-full"
			bind:this={sceneList}
			on:scroll={updateScroll}	
		>
			{#each { length: 8 } as _, index}
				<li class="rounded-xl overflow-clip h-24 ">
					<button
						on:click={(event) => event?.currentTarget?.parentElement?.classList?.toggle('active')}
						class="font-medium text-xl relative focus-visible:opacity-60 hover:opacity-80"
					>
						<span
							class="absolute left-0 text-sm top-0 rounded-br-xl rounded-tl-xl w-30 text-center bg-neutral-700/30 backdrop-blur-lg text-white px-2 py-1"
							>{rtf.format(-index, 'days')}</span
						>
						<div
							class="imagediv"
							style="background-image:url(https://picsum.photos/id/{index + 11}/600/400)"
						/>
						<div class="graph">
							<img
								src="/graphs/{index%3 +1}.png"
								alt="Graph Showing Pulse"
							/>
						</div>
					</button>
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
