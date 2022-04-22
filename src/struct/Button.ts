import { BaseComponent } from "./BaseComponent";
import { Constants } from "eris";

const { ButtonStyles } = Constants;

/**
 * Represents a button/provides easier button creation.
 * @extends {BaseComponent}
 */

export class Button extends BaseComponent<"BUTTON"> {
	public custom_id?: string;
	public disabled?: boolean;
	public emoji?: string;
	public label?: string;
	public style?: number;
	public url?: string;

	public constructor(data: ButtonOptions = {} as ButtonOptions) {
		super("BUTTON");

		/**
		 * The button custom ID.
		 * @type {String}
		 */

		this.custom_id = data.customID;

		/**
		 * Whether the button is disabled.
		 * @type {Boolean?}
		 */

		this.disabled = data.disabled;

		/**
		 * The button emoji.
		 * @type {String}
		 */

		this.emoji = data.emoji;

		/**
		 * The button label.
		 * @type {String}
		 */

		this.label = data.label;

		/**
		 * The button style.
		 * @type {typeof keyof ButtonStyles}
		 */

		this.style = this._resolveStyle(data.style);

		/**
		 * The button URL (only for buttons of 'LINK' type).
		 * @type {String?}
		 */

		this.url = data.url;
	}
	/**
	 * Set the custom ID of this button.
	 * @param {String} id The button custom ID.
	 * @returns {Button}
	 * @example
	 * // Create a button with a custom ID.
	 * button.setCustomID("my-button");
	 */

	public setCustomID(id: string): Button {
		this.custom_id = id;

		return this;
	}

	/**
	 * Sets whether the button is disabled.
	 * @param {Boolean} disabled Whether the button is disabled.
	 * @returns {Button}
	 * @example
	 * // Disable a button.
	 * button.setDisabled();
	 */

	public setDisabled(disabled: boolean = true): Button {
		this.disabled = disabled;

		return this;
	}

	/**
	 * Set the button emoji.
	 * @param {String} emoji The button emoji.
	 * @returns {Button}
	 * @example
	 * // Create a button with an emoji.
	 * button.setEmoji("🔥");
	 */

	public setEmoji(emoji: string): Button {
		this.emoji = emoji;

		return this;
	}

	/**
	 * Set the button label.
	 * @param {String?} label The button label.
	 * @returns {Button}
	 * @example
	 * // Create a button with a label.
	 * button.setLabel("My Button");
	 */

	public setLabel(label: string): Button {
		this.label = label;

		return this;
	}

	/**
	 * Set the button style.
	 * @param {keyof ButtonStyles | number} style The button style.
	 * @returns {Button}
	 * @example
	 * // Create a button with a style.
	 * button.setStyle("PRIMARY");
	 */

	public setStyle(style: keyof ButtonStyles | number): Button {
		this.style = this._resolveStyle(style);

		return this;
	}

	private _resolveStyle(style: keyof ButtonStyles | number): number {
		return typeof style === "number"
			? style
			: (ButtonStyles as Record<string, number>)[style];
	}

	/**
	 * Sets the button URL (only for buttons of 'LINK' type).
	 * @param {String?} url The button URL.
	 * @returns {Button}
	 * @example
	 * // Create a button with a URL.
	 * button.setURL("https://example.com");
	 */

	public setURL(url: string): Button {
		this.url = url;

		return this;
	}
}

export type ButtonStyles = Constants["ButtonStyles"];

export interface ButtonOptions {
	url?: string;
	customID?: string;
	label?: string;
	emoji?: string;
	disabled?: boolean;
	style: keyof ButtonStyles | number;
}
