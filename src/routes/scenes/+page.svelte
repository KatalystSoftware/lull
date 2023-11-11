<script lang="ts">
	const getDateDaysBefore = (days: number) => {
		const date = new Date();
		date.setDate(date.getDate() - days);
		return date;
	};

	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
</script>

<a href="/scenes/new" class="font-medium text-xl text-center">Start a new scene</a>

<ul class="space-y-4 pb-8">
	{#each { length: 8 } as _, index}
		<li class="rounded-xl overflow-clip">
			<a href="/scenes/{index}" class="font-medium text-xl relative">
				<span class="absolute left-0 top-0 rounded-br-xl bg-white/80 px-2 py-1"
					>{rtf.format(-index, 'days')}</span
				>
				<img src="https://picsum.photos/id/{index + 10}/600/200" alt="" width="600" height="200" />
			</a>
		</li>
	{/each}
</ul>
