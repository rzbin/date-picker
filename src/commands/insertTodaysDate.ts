import moment from "moment";
import { Command } from "obsidian";

export const insertTodaysDate: Command = {
	id: "insert-todays-date",
	name: "Insert today's date",
	editorCallback: (editor) => {
		// TODO: Get date format from plugin settings
		const formattedDate = moment().format("YYYY-MM-DD");
		editor.replaceRange(formattedDate, editor.getCursor());
	},
};
