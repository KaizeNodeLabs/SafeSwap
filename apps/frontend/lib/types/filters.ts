export interface FilterState {
	categories: string[];
	priceRanges: Array<{
		min: number;
		max: number;
	}>;
}
