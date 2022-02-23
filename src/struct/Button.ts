import { ButtonOptions } from "../type/Button";
import { Constants } from "eris";

const { ComponentTypes, ButtonStyles } = Constants;

/**
 * Represents a button/provides easier button creation.
 */

export class Button {
	public type: number = ComponentTypes.BUTTON;
	public custom_id?: string;
	public disabled?: boolean;
	public emoji?: string;
	public label?: string;
	public style?: number;
	public url?: string;

	public constructor(data: ButtonOptions) {
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
	 */

	public setCustomID(id: string): Button {
		this.custom_id = id;

		return this;
	}

	/**
	 * Sets whether the button is disabled.
	 * @param {Boolean} disabled Whether the button is disabled.
	 * @returns {Button}
	 */

	public setDisabled(disabled: boolean = true): Button {
		this.disabled = disabled;

		return this;
	}

	/**
	 * Set the button emoji.
	 * @param {String} emoji The button emoji.
	 * @returns {Button}
	 */

	public setEmoji(emoji: string): Button {
		this.emoji = emoji;

		return this;
	}

	/**
	 * Set the button label.
	 * @param {String?} label The button label.
	 * @returns {Button}
	 */

	public setLabel(label: string): Button {
		this.label = label;

		return this;
	}

	/**
	 * Set the button style.
	 * @param {keyof typeof ButtonStyles | number} style The button style.
	 * @returns {Button}
	 */

	public setStyle(style: keyof typeof ButtonStyles | number): Button {
		this.style = this._resolveStyle(style);

		return this;
	}

	private _resolveStyle(style: keyof typeof ButtonStyles | number): number {
		return typeof style === "number"
			? style
			: (ButtonStyles as Record<string, number>)[style];
	}

	/**
	 * Sets the button URL (only for buttons of 'LINK' type).
	 * @param {String?} url The button URL.
	 * @returns {Button}
	 */

	public setURL(url: string): Button {
		this.url = url;

		return this;
	}
};