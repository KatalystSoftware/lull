<script>
	import '@fontsource/kodchasan';
	import '../app.css';

	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:head>
	{@html webManifestLink}
	<title>lull</title>
</svelte:head>

<main class="p-4 flex flex-col bg-emerald-50 gap-4 h-screen">
	<slot />
</main>
