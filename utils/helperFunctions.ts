export function msToTime(ms) {
	return new Date(ms).toISOString().slice(11, 19);
}
