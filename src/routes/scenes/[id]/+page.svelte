<script lang="ts">
	import { page } from '$app/stores';
</script>

<main
	class="flex flex-1 relative z-10 bg-cover bg-no-repeat p-4"
	style="{`background-image: url('https://picsum.photos/id/${$page.params.id}/720/1280');`}}"
>
	<h2 class="sr-only">Scene view for {$page.params.id}</h2>
	<a
		href="/scenes"
		class="absolute top-4 left-4 font-medium text-lg bg-white/80 backdrop-blur-lg py-2 px-3 rounded-lg"
		>Back</a
	>
</main>
