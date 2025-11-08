import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { insertTodaysDate } from "src/commands/insertTodaysDate";
import { fitsDateFormat } from "src/utils/helpers";

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
		console.log("Inline Date Picker plugin loaded");

		this.addSettingTab(new InlineDatePickerSettingTab(this.app, this));

		this.registerDomEvent(document, "mouseover", (evt: MouseEvent) => {
			const target = evt.target as HTMLElement;

			if (fitsDateFormat(target.innerText, this.settings.dateFormat)) {
				console.log("Date format matched:", target.innerText);
			}
		});
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
				"Dates will be generated and parsed using this format. Must include YYYY, MM, and DD."
			)
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.dateFormat)
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						// TODO: Validate date format
						this.plugin.settings.dateFormat = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
