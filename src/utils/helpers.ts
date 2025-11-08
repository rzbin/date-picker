/**
 * Formats a date according to the specified format. Replaces YYYY, MM, and DD in the format string.
 * @param date Date object to format.
 * @param format Format that can contain YYYY, MM, and DD (e.g. "YYYY-MM-DD").
 * @returns Formatted date.
 */
export function formatDate(date: Date, format: string): string {
	const year = String(date.getFullYear());
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	let formattedDate = format
		.replace("YYYY", year.toString())
		.replace("MM", month)
		.replace("DD", day);

	return formattedDate;
}

/**
 * Checks if a given date string fits the specified format.
 * @param dateString The string to check.
 * @param format The date format to match against (e.g. "YYYY-MM-DD").
 * @returns True if the date string fits the format, false otherwise.
 */
export function fitsDateFormat(dateString: string, format: string): boolean {
	if (dateString.length !== format.length) {
		return false;
	}

	const yearIndex = format.indexOf("YYYY");
	const year = dateString.substring(yearIndex, yearIndex + 4);
	if (isNaN(Number(year))) {
		return false;
	}
	dateString =
		dateString.substring(0, yearIndex) +
		"YYYY" +
		dateString.substring(yearIndex + 4);

	const monthIndex = format.indexOf("MM");
	const month = dateString.substring(monthIndex, monthIndex + 2);
	if (isNaN(Number(month))) {
		return false;
	}
	dateString =
		dateString.substring(0, monthIndex) +
		"MM" +
		dateString.substring(monthIndex + 2);

	const dayIndex = format.indexOf("DD");
	const day = dateString.substring(dayIndex, dayIndex + 2);
	if (isNaN(Number(day))) {
		return false;
	}
	dateString =
		dateString.substring(0, dayIndex) +
		"DD" +
		dateString.substring(dayIndex + 2);

	return dateString === format;
}
