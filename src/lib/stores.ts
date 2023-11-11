import { browser } from '$app/environment';
import { writable, type Updater, type Writable } from 'svelte/store';

export const videoElement = writable<HTMLVideoElement | null>(null);
export const samplingCanvas = writable<HTMLCanvasElement | null>(null);
export const mediaStream = writable<MediaStream | null>(null);
export const monitoring = writable<boolean>(false);

function storable<T>(key: string, defaultValue: T): Writable<T> {
	const store = writable(defaultValue);
	const { subscribe, set } = store;

	browser && localStorage.getItem(key) && set(JSON.parse(localStorage.getItem(key) as string));

	return {
		subscribe,
		set: (value: T) => {
			browser && localStorage.setItem(key, JSON.stringify(value));
			set(value);
		},
		update: (callback: Updater<T>) =>
			store.update((last) => {
				const value = callback(last);
				browser && localStorage.setItem(key, JSON.stringify(value));
				return value;
			})
	};
}

export const method = storable<'camera' | 'watch' | undefined>('method', undefined);
