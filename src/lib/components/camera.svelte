<script lang="ts">
	let videoSource: HTMLVideoElement | null = null;
	let loading = false;
	let facing: 'user' | 'environment' = 'environment';
	const obtainVideoCamera = async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: facing
				}
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
	<button on:click={obtainVideoCamera}>Refresh camera</button>
	<button on:click={() => (facing = facing === 'user' ? 'environment' : 'user')}>
		{facing === 'user' ? 'Front camera' : 'Back camera'}
	</button>
</div>
