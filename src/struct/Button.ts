import { valueof } from "../util";
import { BaseComponent, ComponentEmoji } from "./BaseComponent";
import { Constants, ButtonBase } from "eris";

const { ButtonStyles } = Constants;

/**
 * Represents a button/provides easier button creation.
 * @extends {BaseComponent}
 */

export class Button<Style extends ButtonStyle> extends BaseComponent<"BUTTON"> {
	public custom_id: string;
	public disabled?: boolean;
	public emoji?: ComponentEmoji;
	public label?: string;
	public style: whichStyle<Style>;
	public url: whichStyle<Style> extends ButtonStyles["LINK"] ? string : null;

	public constructor(data: ButtonOptions<Style> = <ButtonOptions<Style>>{}) {
		super("BUTTON");

		const one = <T = null>(...args: string[]) => this.one<T>(data, ...args);

		/**
		 * The button custom ID.
		 * @type {String}
		 */

		this.custom_id = one("custom_id", "customID")!;

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

		this.url = (<any>data).url ?? null;
	}
	/**
	 * Set the custom ID of this button.
	 * @param {String} id The button custom ID.
	 * @returns {Button<Style>}
	 * @example
	 * // Create a button with a custom ID.
	 * button.setCustomID("my-button");
	 */

	public setCustomID(id: string): Button<Style> {
		this.custom_id = id;

		return this;
	}

	/**
	 * Sets whether the button is disabled.
	 * @param {Boolean} disabled Whether the button is disabled.
	 * @returns {Button<Style>}
	 * @example
	 * // Disable a button.
	 * button.setDisabled();
	 */

	public setDisabled(disabled: boolean = true): Button<Style> {
		this.disabled = disabled;

		return this;
	}

	/**
	 * Set the button emoji.
	 * @param {ComponentEmoji | string} emoji The button emoji.
	 * @returns {Button<Style>}
	 * @example
	 * // Create a button with an emoji.
	 * button.setEmoji("🔥");
	 */

	public setEmoji(emoji: ComponentEmoji | string): Button<Style> {
		this.emoji = this._resolveEmoji(emoji);

		return this;
	}

	/**
	 * Set the button label.
	 * @param {String?} label The button label.
	 * @returns {Button<Style>}
	 * @example
	 * // Create a button with a label.
	 * button.setLabel("My Button");
	 */

	public setLabel(label: string): Button<Style> {
		this.label = label;

		return this;
	}

	/**
	 * Set the button style.
	 * @param {keyof ButtonStyles | number} style The button style.
	 * @returns {Button<Style>}
	 * @example
	 * // Create a button with a style.
	 * button.setStyle("PRIMARY");
	 */

	public setStyle(style: keyof ButtonStyles | number): Button<Style> {
		this.style = this._resolveStyle(style);

		return this;
	}

	private _resolveStyle(style: keyof ButtonStyles | number): this["style"] {
		return <this["style"]>(
			(typeof style === "number"
				? style
				: (ButtonStyles as Record<string, number>)[style])
		);
	}

	/**
	 * Sets the button URL (only for buttons of 'LINK' type).
	 * @param {String?} url The button URL.
	 * @returns {Button<Style>}
	 * @example
	 * // Create a button with a URL.
	 * button.setURL("https://example.com");
	 */

	public setURL(url: string): Button<Style> {
		this.url = <any>url;

		return this;
	}
}

export type ButtonStyles = Constants["ButtonStyles"];
export type ButtonStyle = valueof<ButtonStyles> | keyof ButtonStyles;

export type ExcludeStyle<T extends keyof ButtonStyles> = Exclude<
	Exclude<ButtonStyle, T>,
	ButtonStyles[T]
>;
type whichStyle<T> = T extends keyof ButtonStyles ? ButtonStyles[T] : T;
export type ButtonOptions<Style extends ButtonStyle> = ButtonBase &
	(whichStyle<Style> extends ButtonStyles["LINK"]
	? { style: ButtonStyles["LINK"] | "LINK"; url: string }
	: {
			customID?: string;
			custom_id?: string;
			style: ExcludeStyle<"LINK">;
	  });
