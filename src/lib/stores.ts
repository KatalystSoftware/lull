import { writable } from 'svelte/store';

export const videoElement = writable<HTMLVideoElement | null>(null);
export const samplingCanvas = writable<HTMLCanvasElement | null>(null);
export const mediaStream = writable<MediaStream | null>(null);
export const monitoring = writable<boolean>(false);
