<script lang="ts">
	import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';

	export let bpm: number | undefined;

    function isAudioPlaying(audio : HTMLAudioElement) {
        return !audio.paused && audio.currentTime > 0 && !audio.ended;
    }

    var fadeInProgress = false

    function fadeIn(audio : HTMLAudioElement) {
        if (fadeInProgress || isAudioPlaying(audio)) {
            return
        }

        fadeInProgress = true
        audio.volume = 0;
        audio.play();
        let count = 10

        const fadeAudio = setInterval(function () {
            if (count > 0) {
                count -= 1
            } else {
                clearInterval(fadeAudio);
                fadeInProgress = false
                return
            }

            audio.volume += 0.1;
        }, 200);
    }

    function fadeOut(audio : HTMLAudioElement) {
        if (fadeInProgress || !isAudioPlaying(audio)) {
            return
        }

        fadeInProgress = true
        let count = 10

        const fadeAudio = setInterval(function () {
            if (count > 0) {
                count -= 1
            } else {
                clearInterval(fadeAudio)
                fadeInProgress = false
                audio.pause();
                audio.currentTime = 0
                return
            }

            audio.volume -= 0.1
        }, 200); 
    }

    var birdsSingingAudio : HTMLAudioElement;
    var oceanAudio : HTMLAudioElement;

    if (browser) {
        birdsSingingAudio = new Audio('/audio/birds.mp3');
        birdsSingingAudio.loop = true

        oceanAudio = new Audio('/audio/ocean.mp3');
        oceanAudio.loop = true
        oceanAudio.play()
    }

    $: {
        if (browser) {
            if (bpm !== undefined) {
                if (bpm < 60) {
                    fadeIn(birdsSingingAudio)
                } else {
                    fadeOut(birdsSingingAudio)
                }
            } else {
                console.log('got bpm: undefined');
            }
        }
    }

    onDestroy(() => {
		if (birdsSingingAudio) birdsSingingAudio.pause();
        if (oceanAudio) oceanAudio.pause();
	});
</script>

