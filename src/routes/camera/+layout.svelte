<script lang="ts">
	import { browser } from '$app/environment';
	import { mediaStream, samplingCanvas, videoElement } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';

	const SUPPORTS_MEDIA_DEVICES = browser && 'mediaDevices' in navigator;
	const SUPPORTS_IMAGE_CAPTURE = browser && 'ImageCapture' in window;

	const obtainVideoCamera = async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameras = devices.filter((device) => device.kind === 'videoinput');

			if (cameras.length === 0) {
				throw new Error('No cameras found');
			}

			const camera = cameras[0];
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: camera.deviceId,
					facingMode: 'environment',
					width: { ideal: 4096 },
					height: { ideal: 2160 },

					whiteBalanceMode: 'manual',
					exposureMode: 'manual',
					focusMode: 'manual'
				}
			});
			const videoTrack = stream.getVideoTracks()[0];
			const imageCapture = SUPPORTS_IMAGE_CAPTURE ? new ImageCapture(videoTrack) : undefined;
			const photoCapabilities = await imageCapture?.getPhotoCapabilities();
			if (photoCapabilities?.fillLightMode?.includes('flash')) {
				await videoTrack.applyConstraints({
					advanced: [{ torch: true }]
				});
			}

			$mediaStream = stream;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		if (!$mediaStream) {
			obtainVideoCamera();
		}
	});

	onDestroy(() => {
		if ($mediaStream) {
			$mediaStream.getTracks().forEach((track) => track.stop());
			$mediaStream = null;
		}
	});
</script>

<slot />

{#if browser && !SUPPORTS_MEDIA_DEVICES}
	<p class="text-red-500">Unfortunately camera access is not supported on your device.</p>
{/if}

{#if browser && !SUPPORTS_IMAGE_CAPTURE}
	<p class="text-amber-500">
		Unable to turn on flashlight automatically, please turn it on manually.
	</p>
{/if}

<div class="sr-only">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="camera-feed" bind:this={$videoElement} />
	<canvas id="sampling-canvas" width="30" height="30" bind:this={$samplingCanvas} />
</div>
