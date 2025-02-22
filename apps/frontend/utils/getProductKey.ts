export const getProductKey = (id: number) => {
	switch (id) {
		case 1:
			return "macbook";
		case 2:
			return "galaxy";
		case 3:
			return "chair";
		case 4:
			return "coffee";
		case 5:
			return "shoes";
		case 6:
			return "earbuds";
		default:
			return "";
	}
};
