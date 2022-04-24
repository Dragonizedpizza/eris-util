import {
	SelectMenu as ErisSelectMenu,
	SelectMenuOptions as BaseSelectOption,
} from "eris";
import { BaseComponent, ComponentEmoji, ComponentEmojiOption } from "./BaseComponent";

export class SelectMenu
	extends BaseComponent<"SELECT_MENU">
	implements ErisSelectMenu
{
	public custom_id!: string;
	public options!: SelectOption[];
	public placeholder?: string;
	public min_values?: number;
	public max_values?: number;
	public disabled?: boolean;

	public constructor(data: SelectMenuOptions = {} as SelectMenuOptions) {
		super("SELECT_MENU");

		const one = <T = null>(...args: string[]) => this.one<T>(data, ...args);

		/**
		 * The select menu custom ID.
		 * @type {String}
		 */

		this.custom_id = one("customID", "custom_id")!;

		/**
		 * The select menu options.
		 * @type {SelectOption[]}
		 */

		this.options = data.options ?? [];

		if (data.options)
			for (const option of data.options)
				this.options.push(
					this._resolveOption(
						option,
						option.value,
						option.description,
						option.emoji,
						option.default,
					),
				);

		/**
		 * The select menu placeholder.
		 * @type {String?}
		 */

		this.placeholder = data.placeholder;

		/**
		 * The select menu minimum values.
		 * @type {String?}
		 */

		this.min_values = one("minValues", "min_values");

		/**
		 * The select menu maximum values.
		 * @type {String?}
		 */

		this.max_values = one("maxValues", "max_values");
	}

	/**
	 * Set the select menu custom ID.
	 * @param {String} id The select menu custom ID.
	 * @returns {SelectMenu}
	 * @example
	 * // Create a select menu with a custom ID.
	 * selectMenu.setCustomID("my-select-menu");
	 */

	public setCustomID(id: string): SelectMenu {
		this.custom_id = id;

		return this;
	}

	/**
	 * Set the select menu options.
	 * @param {SelectOption[]} options The select menu options.
	 * @returns {SelectMenu}
	 * @example
	 * // Create a select menu with options.
	 * selectMenu.setOptions({
	 *   label: "Option 1",
	 *   value: "option-1",
	 *   description: "This is option 1."
	 * }, {
	 *  label: "Option 2",
	 *  value: "option-2",
	 *  description: "This is option 2."
	 * });
	 */

	public addOptions(...options: SelectOption[]): SelectMenu {
		for (const option of options) this.options.push(option);

		return this;
	}

	/**
	 * Add an option to this select menu.
	 * @param {SelectOption | string} option The option to add, as an object or the option label, as a string.
	 * @param {String} value The option value.
	 * @param {String} description The option description.
	 * @param {ComponentEmojiOption} emoji The option emoji.
	 * @param {Boolean} isDefault Whether this option is the default option.
	 * @returns {SelectMenu}
	 * @example
	 * // Add an option to the select menu (as an object).
	 * selectMenu.addOption({
	 *  label: "Option 1",
	 *  value: "option-1",
	 *  description: "This is option 1.",
	 * });
	 * // Add an option to the select menu (as parameters).
	 * selectMenu.addOption("Option 2", "option-2", "This is option 2.", true);
	 */

	public addOption(
		option: string,
		value: string,
		description?: string,
		emoji?: ComponentEmojiOption,
		isDefault?: boolean,
	): SelectMenu;
	public addOption(option: SelectOption): SelectMenu;
	public addOption(
		option: SelectOption | string,
		value?: string,
		description?: string,
		emoji?: ComponentEmojiOption,
		isDefault?: boolean,
	): SelectMenu {
		this.options.push(
			this._resolveOption(option, value, description, emoji, isDefault),
		);

		return this;
	}

	private _resolveOption(
		option: SelectOption | string,
		value?: string,
		description?: string,
		emoji?: ComponentEmojiOption,
		isDefault?: boolean,
	): SelectOption {
		if (typeof option === "string")
			return {
				label: option,
				value: value!,
				description,
				emoji: emoji ? this._resolveEmoji(emoji!) : undefined,
				default: isDefault,
			};
		else if (option.emoji) option.emoji = this._resolveEmoji(option.emoji!);
		return option;
	}
}

interface SelectMenuOptions extends ErisSelectMenu {
	customID?: string;
	minValues?: number;
	maxValues?: number;
}

type SelectOption = BaseSelectOption & { emoji?: ComponentEmojiOption };