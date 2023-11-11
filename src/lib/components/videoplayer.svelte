<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import AudioPlayer from '$lib/components/audioplayer.svelte';

	export let bpm: number | undefined;
	let _class: string | undefined = '';
	export { _class as class };

	import { getBpmRangeName, getVideoSpeedFromBpm } from '$lib/../resources/bpm_limits';
	import { cn } from '$lib/utils';
	import { SpecialVideoPlayer } from '$lib/video-player';

	let videoPlayer: HTMLDivElement | undefined;

	onMount(() => {
		window.videoPlayer = new SpecialVideoPlayer(videoPlayer!, {
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

<div bind:this={videoPlayer} class={cn('relative', _class)} />
<AudioPlayer {bpm}></AudioPlayer>
<style lang="postcss">
	:global(.video) {
		@apply absolute top-0 opacity-0;
	}

	:global(.visible-video) {
		@apply !opacity-100;
		transition: opacity 3s linear;
	}
</style>
