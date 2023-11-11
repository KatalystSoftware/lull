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

<div class="p-8 flex flex-col gap-8 h-screen relative backdrop-blur-2xl bg-red-50/50">
	<h1 class="text-left uppercase text-3xl font-title"><a href="/">lu<br />ll</a></h1>
	<slot />
</div>
