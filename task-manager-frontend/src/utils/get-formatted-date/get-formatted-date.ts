export const getFormattedDate = (date?: string): string => {
	if (!date) {
		return "No due date.";
	}

	const [year, month, day] = date.split("T")[0].split("-").map(Number);
	const newDate = new Date();
	newDate.setFullYear(year);
	newDate.setMonth(month - 1);
	newDate.setDate(day);

	const monthName = newDate.toLocaleString("en-US", { month: "long" });

	return `${day} ${monthName}, ${year}`;
};
