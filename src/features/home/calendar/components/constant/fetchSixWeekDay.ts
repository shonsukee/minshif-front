export const fetchSixWeekDay = (startDate: Date) => {
	startDate.setDate(1);
	const endDate = new Date(startDate);
	endDate.setMonth(startDate.getMonth() + 1);
	endDate.setDate(7);
	const weeks = [];
	let current = startDate;

	while (current <= endDate) {
		const weekStart = new Date(current);
		weekStart.setDate(current.getDate() - current.getDay());
		const weekDates = [];

		for (let day = 0; day < 7; day++) {
			const date = new Date(weekStart);
			date.setDate(weekStart.getDate() + day);
			weekDates.push(date);
		}

		weeks.push(weekDates);
		current.setDate(current.getDate() + 7);
	}

	return weeks;
};