<script>
	import '@fontsource/kodchasan';
	import '@fontsource/poppins';
	import '../app.css';

	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:head>
	{@html webManifestLink}
	<title>lull</title>
</svelte:head>

<div
	class="h-screen backdrop-blur-2xl md:backdrop-blur-3xl bg-red-50/50 md:bg-red-50/10 flex items-center justify-center"
>
	<div class="w-full max-w-md p-4 flex flex-col gap-8 h-full max-h-[720px] relative">
		<h1 class="text-left uppercase text-3xl font-title"><a href="/">lu<br />ll</a></h1>
		<slot />
	</div>
</div>
