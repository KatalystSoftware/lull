<script lang="ts">
	let videoSource: HTMLVideoElement | null = null;
	let loading = false;
	const obtainVideoCamera = async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			if (videoSource) {
				videoSource.srcObject = stream;
				videoSource.play();
			} else {
				console.error('videoSource not found');
			}
			loading = false;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div>
	{#if loading}
		<p>Loading...</p>
	{/if}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoSource} />
	<button on:click={obtainVideoCamera}>Open camera</button>
</div>
