export const arrayRange = (start: number, stop: number): number[] =>
	Array.from(
		{length: (stop - start)},
		(_value, index) => start + index,
	)
