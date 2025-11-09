import { Command, Notice } from "obsidian";
import {
	InlineDatePickerPluginValue,
	inlineDatePickerViewPlugin,
} from "src/decoration/plugin";

export const openDatePicker: Command = {
	id: "open-date-picker",
	name: "Open date picker",
	editorCallback: (editor, view) => {
		// @ts-expect-error, not typed
		const editorView = view.editor.cm as EditorView;

		const plugin = editorView.plugin(
			inlineDatePickerViewPlugin
		) as InlineDatePickerPluginValue;

		if (!plugin) {
			console.error("`inlineDatePickerViewPlugin` not found.");
		}

		// Attempt to open the date picker of an existing widget at the cursor position
		const offset = editor.posToOffset(editor.getCursor());
		const widgetPointers = plugin.widgetPointers;
		for (const pointer of widgetPointers) {
			if (offset >= pointer.from && offset <= pointer.to) {
				pointer.widget.showPicker();
				return;
			}
		}

		new Notice("No date picker found at cursor position.");
	},
};
