<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { mediaStream } from '$lib/stores';

	const SUPPORTS_MEDIA_DEVICES = browser && 'mediaDevices' in navigator;
	const SUPPORTS_IMAGE_CAPTURE = browser && 'ImageCapture' in window;

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
			loading = false;

			goto('/camera/tutorial');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h1 class="uppercase text-4xl text-center">lull</h1>

{#if browser && !SUPPORTS_MEDIA_DEVICES}
	<p class="text-red-500">Unfortunately camera access is not supported on your device.</p>
{/if}

{#if browser && !SUPPORTS_IMAGE_CAPTURE}
	<p class="text-amber-500">
		Unable to turn on flashlight automatically, please turn it on manually.
	</p>
{/if}

<p>We need your permission to use the device camera and flash.</p>

<button
	class="bg-emerald-500 text-emerald-50 font-semibold text-lg py-2 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
	disabled={!browser || loading || !SUPPORTS_MEDIA_DEVICES}
	on:click={obtainVideoCamera}>Allow camera</button
>
