import moment from "moment";
import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { insertTodaysDate } from "src/commands/insertTodaysDate";
import { openDatePicker } from "src/commands/openDatePicker";
import { inlineDatePickerViewPlugin } from "src/decoration/plugin";

interface InlineDatePickerSettings {
	dateFormat: string;
}

const DEFAULT_SETTINGS: InlineDatePickerSettings = {
	dateFormat: "YYYY-MM-DD",
};

export default class InlineDatePickerPlugin extends Plugin {
	settings: InlineDatePickerSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand(insertTodaysDate);
		this.addCommand(openDatePicker);

		this.addSettingTab(new InlineDatePickerSettingTab(this.app, this));

		this.registerEditorExtension([inlineDatePickerViewPlugin]);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class InlineDatePickerSettingTab extends PluginSettingTab {
	plugin: InlineDatePickerPlugin;

	constructor(app: App, plugin: InlineDatePickerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Date Format")
			.setDesc(
				"Dates will be generated and parsed using this (Moment.js) format."
			)
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.dateFormat)
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						this.plugin.settings.dateFormat = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
