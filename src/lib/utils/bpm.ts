const MIN_BPM = 30;
const MAX_BPM = 200;

export type Sample = {
	value: number;
	time: number;
};

export const averageBrightness = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
	// 1d array of r, g, b, a pixel data values
	const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;
	let sum = 0;

	// Only use the red and green channels as that combination gives the best readings
	for (let i = 0; i < pixelData.length; i += 4) {
		sum = sum + pixelData[i] + pixelData[i + 1];
	}

	// Since we only process two channels out of four we scale the data length to half
	const avg = sum / (pixelData.length * 0.5);

	// Scale to 0 ... 1
	return avg / 255;
};

export const getAverageCrossings = (samples: Sample[], average: number) => {
	// Get each sample at points where the graph has crossed below the average level
	// These are visible as the rising edges that pass the midpoint of the graph
	const crossingsSamples: Sample[] = [];
	let previousSample = samples[0]; // Avoid if statement in loop

	samples.forEach(function (currentSample) {
		// Check if next sample has gone below average.
		if (currentSample.value < average && previousSample.value > average) {
			crossingsSamples.push(currentSample);
		}

		previousSample = currentSample;
	});

	return crossingsSamples;
};

export const analyzeData = (samples: Sample[]) => {
	// Get the mean average value of the samples
	const average = samples.map((sample) => sample.value).reduce((a, c) => a + c) / samples.length;

	// Find the lowest and highest sample values in the data
	// Used for both calculating bpm and fitting the graph in the canvas
	let min = samples[0].value;
	let max = samples[0].value;
	samples.forEach((sample) => {
		if (sample.value > max) {
			max = sample.value;
		}
		if (sample.value < min) {
			min = sample.value;
		}
	});

	// The range of the change in values
	// For a good measurement it should be between  ~ 0.002 - 0.02
	const range = max - min;

	const crossings = getAverageCrossings(samples, average);
	return {
		average,
		min,
		max,
		range,
		crossings
	};
};

export const calculateBpm = (samples: Sample[]) => {
	if (samples.length < 2) {
		return;
	}

	const averageInterval =
		(samples[samples.length - 1].time - samples[0].time) / (samples.length - 1);

	const bpm = 60000 / averageInterval;

	// Clamp bpm to a reasonable range
	return Math.max(MIN_BPM, Math.min(bpm, MAX_BPM));
};
