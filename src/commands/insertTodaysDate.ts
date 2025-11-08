import { Command } from "obsidian";
import { formatDate } from "src/utils/helpers";

export const insertTodaysDate: Command = {
	id: "insert-todays-date",
	name: "Insert today's date",
	editorCallback: (editor) => {
		const today = new Date();
		const formattedDate = formatDate(today, "YYYY-MM-DD");
		editor.replaceSelection(formattedDate);
	},
};
