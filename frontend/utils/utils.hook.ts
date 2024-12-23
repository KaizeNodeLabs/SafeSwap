export const useUtils = () => {
	const renderStars = (rating: number) => {
		const filledStars = Math.floor(rating);
		const halfStars = rating % 1 >= 0.5 ? 1 : 0;
		const emptyStars = 5 - (filledStars + halfStars);

		return [
			...Array(filledStars).fill("filled"),
			...Array(halfStars).fill("half"),
			...Array(emptyStars).fill("empty"),
		];
	};

	return { renderStars };
};
