export const getTimestamp = () => {
	return Math.round(new Date().getTime() / 1000);
};

export const getWeek = (date) => {
	var onejan = new Date(date.getFullYear(), 0, 1);
	return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
