<script lang="ts">
	import { goto } from '$app/navigation';
	import Loading from '$lib/icons/Loading.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			goto('/camera/tutorial/step-3');
		}, 3000);
	});
</script>

<main class="p-4 flex flex-1 flex-col items-center justify-start gap-8">
	<h2 class="sr-only">Camera Tutorial - Step 2</h2>

	<p class="font-medium text-xl text-center">
		Follow your pulse through the changes in the landscape and calm yourself down
	</p>

	<Loading class="w-16 h-16" />
</main>
