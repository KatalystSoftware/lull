<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let bpm: number | undefined;

	import { getBpmRangeName, getVideoSpeedFromBpm } from '$lib/../resources/bpm_limits';
	import { SpecialVideoPlayer } from '$lib/video-player';

	onMount(() => {
		window.videoPlayer = new SpecialVideoPlayer(document.getElementById('special-video-player')!, {
			veryLow: '/lull_videot/lull_lvl1.mp4',
			low: '/lull_videot/lull_lvl2.mp4',
			medium: '/lull_videot/lull_lvl3.mp4',
			high: '/lull_videot/lull_lvl4.mp4',
			veryHigh: '/lull_videot/lull_lvl5.mp4'
		});
	});

	$: {
		if (browser) {
			if (bpm !== undefined) {
				//console.log('type', getBpmRangeName)
				const level = getBpmRangeName(bpm);
				let videoPlayer = window['videoPlayer'];
				if (videoPlayer instanceof SpecialVideoPlayer) {
					videoPlayer.setActiveVideo(level);
					videoPlayer.setSpeed(getVideoSpeedFromBpm(bpm));
				}
			} else {
				console.log('got bpm: undefined');
			}
		}
	}
</script>

<div id="special-video-player" style="position: relative;z-index: 1;"></div>

<style>
	:global(.video) {
		position: absolute;
		opacity: 0;
	}

	:global(.visible-video) {
		transition: opacity 3s linear;
		opacity: 1 !important;
	}
</style>
