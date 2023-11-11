<style>
    :global(.video) {
        position:absolute;
        opacity: 0;
        
    }

    :global(.visible-video) {
        transition: opacity 3s linear;
        opacity: 1 !important;
    }
</style>

<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	
    class SpecialVideoPlayer {
        crossfadeTimeMs = 3000
        currentlyActiveVideo : string | null = null
        videoElements : { [key: string]: HTMLVideoElement} = {}

        constructor(
            public element : HTMLElement,
            public videosPaths : { [key: string]: string}
        ) {
            for (let [key, value] of Object.entries(videosPaths)) {
                const videoElement = SpecialVideoPlayer.createVideoElement(value)
                element.appendChild(videoElement)
                this.videoElements[key] = videoElement
            }
        }
        
        setActiveVideo(videoId : string) {

            const activateVideo = (el : HTMLVideoElement) => {
                el.play()
                el.currentTime = 0
                this.currentlyActiveVideo = videoId
                el.classList.remove('visible-video')
                setTimeout(() => {

                    el.classList.add('visible-video')
                    el.style.zIndex = (Date.now() + "").slice(5)
                }, 50)
            }

            const deactivateVideo = (el : HTMLVideoElement) => {
                // this function is not useful if old videos are not paused for performance
                this.currentlyActiveVideo = null
            }

            if (this.currentlyActiveVideo === null) {
                activateVideo(this.videoElements[videoId])

                return
            }

            if (this.currentlyActiveVideo === videoId) {
                return
            }

            deactivateVideo(this.videoElements[this.currentlyActiveVideo])
            activateVideo(this.videoElements[videoId])
        }

        static createVideoElement(path : string) : HTMLVideoElement{
            const element = document.createElement('video')
            element.classList.add('video')
            element.autoplay = true
            element.loop = true
            element.src = path
            return element
        }

        changeSpeed(speed : number) {
            for (let [key, value] of Object.entries(this.videoElements)) {
                value.playbackRate = speed
            }
        }
    }


    onMount(() => {
        // @ts-ignore
        window.videoPlayer  = new SpecialVideoPlayer(
        document.getElementById('special-video-player')!,
        {
            'video1': '/videos/1.mp4',
            'video2': '/videos/2.mp4',
            'video3': '/videos/3.mp4',
            'video4': '/videos/4.mp4',
            'video5': '/videos/5.mp4',
        }
    )
    })
    


</script>

<div id="special-video-player">

</div>
