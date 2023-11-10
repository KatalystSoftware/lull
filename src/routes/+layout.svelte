<script>
	import '../app.css';

	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:head>
	{@html webManifestLink}
	<title>lull</title>
</svelte:head>

<main>
	<slot />
</main>
