import {
	AuthorData,
	FieldData,
	FooterData,
	MediaData,
	EmbedData,
} from "../type/Embed";
import { ColorResolvable, resolveColor } from "../util";

/**
 * Represents an embed/provides easier embed creation.
 */

export class Embed {
	public author?: AuthorData;
	public title?: string;
	public description?: string;
	public url?: string;
	public color?: number;
	public fields?: FieldData[];
	public thumbnail?: MediaData;
	public image?: MediaData;
	public video?: MediaData;
	public timestamp?: string;
	public footer?: FooterData;

	public constructor(data: EmbedData) {
		Object.assign(this, data);
	}

	/**
	 * Set the embed author.
	 * @param {AuthorData | string} author The author of this embed.
	 * @param {string?} url The url of the author.
	 * @param {string?} iconURL The icon url of the author.
	 * @returns {Embed}
	 * @example
	 * // Set the author of this embed (as an object).
	 * embed.setAuthor({
	 *    name: "John Doe",
	 *    url: "https://example.com",
	 *    iconURL: "https://example.com/icon.png"
	 * });
	 * @example
	 * // Set the author of this embed (as a multiple parameters.
	 * embed.setAuthor("John Doe", "https://example.com", "https://example.com/icon.png");
	 */
	public setAuthor(author: AuthorData): Embed;
	public setAuthor(author: string, url?: string, iconURL?: string): Embed;
	public setAuthor(
		author: AuthorData | string,
		url?: string,
		iconURL?: string,
	): Embed {
		let setAuthor;

		if (typeof author === "object") setAuthor = author;
		else
			setAuthor = {
				name: author,
				url,
				iconURL,
			};

		this.author = setAuthor;

		return this;
	}

	/**
	 * Set the title of this embed.
	 * @param {String} title The title of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the title of this embed.
	 * embed.setTitle("Hello, world!");
	 */

	public setTitle(title: string): Embed {
		this.title = title;

		return this;
	}

	/**
	 * Set the description of this embed.
	 * @param {String} description The description of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the description of the embed.
	 * embed.setDescription("What a cool description!");
	 */

	public setDescription(description: string): Embed {
		this.description = description;

		return this;
	}

	/**
	 * Set the URL of this embed.
	 * @param {String} url The URL of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the URL of the embed.
	 * embed.setURL("https://google.com/");
	 */

	public setURL(url: string): Embed {
		this.url = url;

		return this;
	}

	/**
	 * Set the color of this embed.
	 * @param {Number} color The color of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the color of the embed.
	 * embed.setColor(0xFF0000);
	 * // Set the color of the embed (as a string).
	 * embed.setColor("AQUA");
	 */

	public setColor(color: ColorResolvable): Embed {
		this.color = resolveColor(color);

		return this;
	}
};
