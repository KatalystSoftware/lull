export const bpm_limits = {
	veryLow: 50,
	low: 60,
	medium: 70,
	high: 80,
	veryHigh: 90
};

export const getBpmRangeName = (bpm: number) => {
	if (bpm < bpm_limits.veryLow) {
		return 'veryLow';
	}
	if (bpm < bpm_limits.low) {
		return 'low';
	}
	if (bpm < bpm_limits.medium) {
		return 'medium';
	}
	if (bpm < bpm_limits.high) {
		return 'high';
	}
	return 'veryHigh';
};

export const getVideoSpeedFromBpm = (bpm: number) => {
	/*
    min bpm = 40
    min speed = 0.5

    max bpm = 100
    max speed = 2
    */

	const minBpm = 40;
	const maxBpm = 120;
	const minSpeed = 0.75;
	const maxSpeed = 1.5;

	const speedRange = maxSpeed - minSpeed;
	const bpmRange = maxBpm - minBpm;

	const bpmOffset = bpm - minBpm;
	const bpmRatio = bpmOffset / bpmRange;

	const speedOffset = bpmRatio * speedRange;
	const speed = minSpeed + speedOffset;

	// cap speed
	if (speed < minSpeed) {
		return minSpeed;
	}
	if (speed > maxSpeed) {
		return maxSpeed;
	}

	return speed;
};
