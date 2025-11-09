import { syntaxTree } from "@codemirror/language";
import { EditorState, RangeSetBuilder } from "@codemirror/state";
import {
	ViewUpdate,
	PluginValue,
	EditorView,
	ViewPlugin,
	DecorationSet,
	Decoration,
	WidgetType,
	PluginSpec,
} from "@codemirror/view";
import moment from "moment";

class InlineDatePickerWidget extends WidgetType {
	toDOM(view: EditorView): HTMLElement {
		const input = createEl("input");
		input.type = "date";
		input.classList.add("inline-date-picker-input");

		// To prevent using the text input
		input.addEventListener("mouseup", (e) => {
			e.preventDefault();
			input.blur();
			input.showPicker();
		});

		input.onchange = () => {
			const date = moment(input.value);
			// TODO: Get date format from settings.
			const formattedDate = date.format("YYYY-MM-DD");
			console.log("Selected date:", formattedDate);
		};

		return input;
	}
}

class InlineDatePickerPluginValue implements PluginValue {
	decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = this.buildDecorations(view);
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged) {
			this.decorations = this.buildDecorations(update.view);
		}
	}

	destroy() {}

	buildDecorations(view: EditorView): DecorationSet {
		const builder = new RangeSetBuilder<Decoration>();

		for (let { from, to } of view.visibleRanges) {
			syntaxTree(view.state).iterate({
				from,
				to,
				enter(node) {
					if (node.type.name.startsWith("hmd-internal-link")) {
						const nodeText = view.state.doc.sliceString(
							node.from,
							node.to
						);
						// TODO: Get date format from settings.
						const fitsDateFormat = moment(
							nodeText,
							"YYYY-MM-DD",
							true
						).isValid();

						if (!fitsDateFormat) {
							return;
						}

						builder.add(
							node.from,
							node.from,
							Decoration.replace({
								widget: new InlineDatePickerWidget(),
							})
						);
					}
				},
			});
		}

		return builder.finish();
	}
}

const pluginSpec: PluginSpec<InlineDatePickerPluginValue> = {
	decorations: (value: InlineDatePickerPluginValue) => value.decorations,
};

export const InlineDatePickerViewPlugin = ViewPlugin.fromClass(
	InlineDatePickerPluginValue,
	pluginSpec
);
