<script lang="ts">
	import { browser } from '$app/environment';

	const SUPPORTS_IMAGE_CAPTURE = browser && 'ImageCapture' in window;

	let videoSource: HTMLVideoElement | null = null;
	let loading = false;

	const obtainVideoCamera = async () => {
		try {
			loading = true;
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameras = devices.filter((device) => device.kind === 'videoinput');

			if (cameras.length === 0) {
				throw new Error('No cameras found');
			}

			const camera = cameras[0];
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: camera.deviceId,
					facingMode: 'environment',
					width: { ideal: 4096 },
					height: { ideal: 2160 }
				}
			});
			const videoTrack = mediaStream.getVideoTracks()[0];
			const imageCapture = SUPPORTS_IMAGE_CAPTURE ? new ImageCapture(videoTrack) : undefined;
			const photoCapabilities = await imageCapture?.getPhotoCapabilities();
			if (photoCapabilities?.fillLightMode?.includes('flash')) {
				await videoTrack.applyConstraints({
					advanced: [{ torch: true }]
				});
			}

			if (videoSource) {
				videoSource.srcObject = mediaStream;
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
	<button on:click={obtainVideoCamera}>Get camera</button>
</div>
