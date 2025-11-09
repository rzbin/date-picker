import moment from "moment";
import { Command } from "obsidian";
import {
	InlineDatePickerPluginValue,
	inlineDatePickerViewPlugin,
} from "src/decoration/plugin";

export const openDatePicker: Command = {
	id: "open-date-picker",
	name: "Open date picker",
	editorCallback: (editor, view) => {
		// TODO: Get date format from settings.
		const format = "YYYY-MM-DD";

		// @ts-expect-error, not typed
		const editorView = view.editor.cm as EditorView;

		const plugin = editorView.plugin(
			inlineDatePickerViewPlugin
		) as InlineDatePickerPluginValue;

		// Attempt to open the date picker of an existing widget at the cursor position
		const openWidgetPicker = (plugin: InlineDatePickerPluginValue) => {
			const offset = editor.posToOffset(editor.getCursor());
			const widgetPointers = plugin.widgetPointers;
			for (const pointer of widgetPointers) {
				if (offset >= pointer.from && offset <= pointer.to) {
					pointer.widget.showPicker();
					return true;
				}
			}
			return false;
		};

		if (!plugin) {
			console.error("`inlineDatePickerViewPlugin` not found.");
		}

		// Try to open existing widget picker, if successful, return
		if (openWidgetPicker(plugin)) {
			return;
		}

		// // Otherwise, insert a new date link with today's date and open its picker
		// const formattedDate = moment().format(format);
		// editor.replaceRange(`[[${formattedDate}]]`, editor.getCursor());
		// editor.setCursor({
		// 	line: editor.getCursor().line,
		// 	ch: editor.getCursor().ch + 2,
		// });
		// openWidgetPicker(plugin);
	},
};
