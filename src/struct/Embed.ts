import {
	AuthorData,
	FieldData,
	FooterData,
	MediaData,
	EmbedData,
	APIFooterData
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
	public fields: FieldData[] = [];
	public thumbnail?: MediaData;
	public image?: MediaData;
	public video?: MediaData;
	public timestamp?: string;
	public footer?: FooterData;

	public constructor(data?: EmbedData) {
		if (!data) return;

		if ("author" in data) this.setAuthor(data.author!);
		if ("title" in data) this.setTitle(data.title!);
		if ("description" in data) this.setDescription(data.description!);
		if ("url" in data) this.setURL(data.url!);
		if ("color" in data) this.setColor(data.color!);
		if ("fields" in data) this.addFields(...data.fields!);
	}

	/**
	 * Set the embed author.
	 * @param {AuthorData | string} author The author of this embed.
	 * @param {string?} url The url of the author.
	 * @param {string?} iconURL The icon url of the author.
	 * @param {string?} proxyIconURL The proxy icon url of the author.
	 * @returns {Embed}
	 * @example
	 * // Set the author of this embed (as an object).
	 * embed.setAuthor({
	 *    name: "John Doe",
	 *    url: "https://example.com",
	 *    iconURL: "https://example.com/icon.png",
	 *    proxyIconURL: "https://example.com/proxy-icon.png"
	 * });
	 * @example
	 * // Set the author of this embed (as a multiple parameters.
	 * embed.setAuthor("John Doe", "https://example.com", "https://example.com/icon.png", "https://example.com/proxy-icon.png");
	 */

	public setAuthor(author: AuthorData): Embed;
	public setAuthor(author: string, url?: string, iconURL?: string, proxyIconURL?: string): Embed;
	public setAuthor(
		author: AuthorData | string,
		url?: string,
		iconURL?: string,
		proxyIconURL?: string,
	): Embed {
		let setAuthor;

		if (typeof author === "object") setAuthor = author;
		else
			setAuthor = {
				name: author,
				url,
				iconURL,
				proxyIconURL,
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
	 * @param {ColorResolvable} color The color of the embed.
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

	/**
	 * Add a field to this embed.
	 * @param {FieldData | string} field The field data as an object, or the field name as a string.
	 * @param {string?} value The field value (if you're providing the field data as parameters).
	 * @param {boolean?} inline Whether the field is inline (if you're providing the field data as parameters).
	 * @example
	 * // Add a field to the embed (as an object).
	 * embed.addField({
	 * 	name: "Cool Field 1",
	 * 	value: "What a cool value!",
	 * });
	 * @example
	 * // Add a field to the embed (as parameters).
	 * embed.addField("Cool Field 1", "What a cool value!");
	 */

	public addField(field: FieldData): Embed;
	public addField(field: string, value: string, inline?: boolean): Embed;
	public addField(
		field: FieldData | string,
		value?: string,
		inline?: boolean,
	): Embed {
		let endField;

		if (typeof field === "string")
			endField = {
				name: field,
				value: value!,
				inline,
			};
		else endField = field;

		this.fields.push(endField);

		return this;
	}

	/**
	 * Add multiple fields to this embed.
	 * @param {FieldData[]} fields The fields you want to add as objects split with parameters.
	 * @returns {Embed}
	 * @example
	 * // Add fields to the embed.
	 * embed.addFields({
	 * 	name: "Cool Field 1",
	 * 	value: "What a cool field!",
	 * }, {
	 * 	name: "Cool Field 2",
	 * 	value: "What a cool inline field!",
	 * 	inline: true,
	 * });
	 */

	public addFields(...fields: FieldData[]): Embed {
		this.fields = fields;

		return this;
	}

	/**
	 * Set the thumbnail of this embed.
	 * @param {MediaData | string} thumbnail The thumbnail data as an object, or the thumbnail url as a string.
	 * @param {string?} proxyURL The proxy url of the thumbnail.
	 * @param {number?} height The height of the thumbnail.
	 * @param {number?} width The width of the thumbnail.
	 * @returns {Embed}
	 * @example
	 * // Set the thumbnail of the embed (as an object).
	 * embed.setThumbnail({
	 * 	url: "https://example.com/thumbnail.png",
	 *  proxyURL: "https://example.com/thumbnail.png",
	 *  height: 128,
	 *  width: 128,
	 * });
	 * @example
	 * // Set the thumbnail of the embed (as a string).
	 * embed.setThumbnail("https://example.com/thumbnail.png", "https://example.com/thumbnail.png");
	 */

	public setThumbnail(thumbnail: MediaData): Embed;
	public setThumbnail(
		thumbnail: string,
		proxyURL?: string,
		height?: number,
		width?: number,
	): Embed;
	public setThumbnail(
		thumbnail: MediaData | string,
		proxyURL?: string,
		height?: number,
		width?: number,
	): Embed {
		let setThumbnail;

		if (typeof thumbnail === "string")
			setThumbnail = {
				url: thumbnail,
				proxyURL,
				height,
				width,
			};
		else setThumbnail = thumbnail;

		this.thumbnail = setThumbnail;

		return this;
	}

	/**
	 * Set the image of this embed.
	 * @param {MediaData | string} image The image data as an object, or the image url as a string.
	 * @param {string?} proxyURL The proxy url of the image.
	 * @param {number?} height The height of the image.
	 * @param {number?} width The width of the image.
	 * @returns {Embed}
	 * @example
	 * // Set the image of the embed (as an object).
	 * embed.setImage({
	 * 	url: "https://example.com/image.png",
	 * proxyURL: "https://example.com/image.png",
	 * height: 128,
	 * width: 128,
	 * });
	 * @example
	 * // Set the image of the embed (as a string).
	 * embed.setImage("https://example.com/image.png", "https://example.com/image.png", 128, 128);
	 */

	public setImage(image: MediaData): Embed;
	public setImage(image: string, proxyURL?: string, height?: number, width?: number): Embed;
	public setImage(image: MediaData | string, proxyURL?: string, height?: number, width?: number): Embed {
		let setImage;

		if (typeof image === "string")
			setImage = {
				url: image,
				proxyURL,
				height,
				width,
			};
		else setImage = image;

		this.image = setImage;

		return this;
	}

	/**
	 * Set the timestamp of this embed.
	 * @param {Date | number} timestamp The timestamp of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the timestamp of the embed (as a date).
	 * embed.setTimestamp(new Date());
	 * // Set the timestamp of the embed (as a number).
	 */

	public setTimestamp(timestamp: Date): Embed;
	public setTimestamp(timestamp: number): Embed;
	public setTimestamp(timestamp: Date | number = Date.now()): Embed {
		let setTimestamp;

		if (typeof timestamp === "object") setTimestamp = timestamp;
		else setTimestamp = setTimestamp;

		return this;
	}

	private _resolveFooter(footer: FooterData | string, iconURL?: string, proxyIconURL?: string): APIFooterData {
		let returnFooter;

		if (typeof footer === "string")
			returnFooter = {
				text: footer,
				icon_url: iconURL,
				proxy_icon_url: proxyIconURL,
			};
		else returnFooter = {
			text: footer.text,
			icon_url: footer.iconURL,
			proxy_icon_url: footer.proxyIconURL,
		};

		return returnFooter;
	}

	/**
	 * Set the footer of this embed.
	 * @param {FooterData | string} footer The footer data as an object, or the footer text as a string.
	 * @param {string?} iconURL The proxy url of the footer.
	 * @param {string?} proxyIconURL The proxy url of the footer.
	 * @returns {Embed}
	 * @example
	 * // Set the footer of the embed (as an object).
	 * embed.setFooter({
	 * 	text: "Example footer",
	 *  iconURL: "https://example.com/footer.png",
	 *  proxyIconUrl: "https://example.com/proxy-footer.png",
	 * });
	 * @example
	 * // Set the footer of the embed (as a string).
	 * embed.setFooter("Example footer", "https://example.com/footer.png", "https://example.com/proxy-footer.png");
	 */

	public setFooter(footer: FooterData): Embed;
	public setFooter(footer: string, iconURL?: string, proxyIconURL?: string): Embed;
	public setFooter(footer: FooterData | string, iconURL?: string, proxyIconURL?: string): Embed {
		this.footer = this._resolveFooter(footer, iconURL, proxyIconURL);

		return this;
	}
}
