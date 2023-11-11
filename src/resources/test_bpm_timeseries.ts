/*
veryLow: 50,
low: 60,
medium: 70,
high: 80,
veryHigh: 90

Max values of each state
*/

let tick = 0;

export const getNextHeartRate = () => {
	return test_time_series[tick++ % test_time_series.length];
};

export const test_time_series = [
	83, 82, 82, 81, 80, 79, 78, 77, 76, 75, 74, 75, 72, 70, 70, 68, 68, 70, 75, 79, 80, 80, 79, 79,
	78, 77, 77, 76, 75, 75, 74, 73, 72, 71, 70, 69, 69, 68, 67, 66, 66, 66, 66, 65, 64, 64, 64, 63,
	63, 62, 62, 62, 61, 61, 60, 59, 55, 52, 51, 49, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45
];
/*
export const test_time_series = [
	83, 82, 82, 81, 80, 79, 78, 77, 76, 75, 74, 75, 63, 62, 62, 62, 61, 61, 60, 59, 55, 52, 51, 49,
	45, 45, 45, 45, 45
];
*/
/*

Generate me an array of 60 integers. They represent bpm values captured over 60 seconds. The bpm value list should start from 83.
Then it should go down to 68. Then it should  go up to 72. Then it should go down to 45. Add some random variation to the DataTransfer, so that it's not a linear list . 
Only output the array containing the values and comments marking the transtion points
const test_time_series = [
    83,
    ...,
    45
]
*/
