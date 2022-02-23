import {
	AuthorData,
	FieldData,
	FooterData,
	MediaData,
	EmbedData,
	APIFooterData,
	APIAuthorData,
	APIMediaData,
	ColorResolvable,
} from "../type/Embed";
import { resolveColor } from "../util";

/**
 * Represents an embed/provides easier embed creation.
 */
export class Embed {
	public author?: AuthorData;
	public title?: string;
	public description?: string;
	public url?: string;
	public color?: number;
	public fields!: FieldData[];
	public thumbnail?: MediaData;
	public image?: MediaData;
	public video?: MediaData;
	public timestamp?: number;
	public footer?: FooterData;

	public constructor(data?: EmbedData) {
		if (!data) return;

		/**
		 * The embed author.
		 * @type {APIAuthorData?}
		 */

		this.author = data.author;

		/**
		 * The embed title.
		 * @type {String?}
		 */

		this.title = data.title;

		/**
		 * The embed description.
		 * @type {String?}
		 */

		this.description = data.description;

		/**
		 * The embed url.
		 * @type {String?}
		 */

		this.url = data.url;

		/**
		 * The embed color.
		 * @type {Number?}
		 */

		this.color = data.color;

		/**
		 * The embed fields.
		 * @type {APIFieldData[]}
		 */

		this.fields = [];

		if (data.fields)
			for (const field of data.fields) this.fields.push(field);

		/**
		 * The embed thumbnail.
		 * @type {APIMediaData?}
		 */

		this.thumbnail = data.thumbnail;

		/**
		 * The embed image.
		 * @type {APIMediaData?}
		 */

		this.image = data.image;

		/**
		 * The embed video.
		 * @type {APIMediaData?}
		 */

		this.video = data.video;

		/**
		 * The embed timestamp.
		 * @type {Number?}
		 */

		this.timestamp = data.timestamp;

		/**
		 * The embed footer.
		 * @type {APIFooterData?}
		 */

		this.footer = data.footer;
	}
	private one<T = null>(
		data: any,
		...keys: string[]
	): (T extends null ? any : T) | undefined {
		for (const key of keys) if (key in data) return data[key];

		return undefined;
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
	public setAuthor(
		author: string,
		url?: string,
		iconURL?: string,
		proxyIconURL?: string,
	): Embed;
	public setAuthor(
		author: AuthorData | APIAuthorData | string,
		url?: string,
		iconURL?: string,
		proxyIconURL?: string,
	): Embed {
		this.author = this._resolveAuthor(author, url, iconURL, proxyIconURL);

		return this;
	}

	private _resolveAuthor(
		author: AuthorData | APIAuthorData | string,
		url?: string,
		iconURL?: string,
		proxyIconURL?: string,
	): APIAuthorData {
		let returnAuthor;

		if (typeof author === "string")
			returnAuthor = {
				name: author,
				url,
				icon_url: iconURL,
				proxy_icon_url: proxyIconURL,
			};
		else
			returnAuthor = {
				name: author.name,
				url: this.one(author, "url", "URL"),
				icon_url: this.one<string>(author, "icon_url", "iconURL"),
				proxy_icon_url: this.one<string>(
					author,
					"proxy_icon_url",
					"proxyIconURL",
				),
			};

		return returnAuthor;
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
	 * // Inline field.
	 * embed.addField({
	 * 	name: "Cool Field 2",
	 * 	value: "What a cool value!",
	 * 	inline: true,
	 * });
	 * @example
	 * // Add a field to the embed (as parameters).
	 * embed.addField("Cool Field 1", "What a cool value!");
	 * // Inline field.
	 * embed.addField("Cool Field 2", "What a cool value!", true);
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
	 * 	// An inline field.
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
	 *  proxyURL: "https://example.com/proxy-thumbnail",
	 *  height: 128,
	 *  width: 128,
	 * });
	 * @example
	 * // Set the thumbnail of the embed (as a string).
	 * embed.setThumbnail("https://example.com/thumbnail.png", "https://example.com/proxy-thumbnail");
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
		this.thumbnail = this._resolveMedia(thumbnail, proxyURL, height, width);

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
	 * 	proxyURL: "https://example.com/proxy-image",
	 * 	height: 128,
	 * 	width: 128,
	 * });
	 * @example
	 * // Set the image of the embed (as a string).
	 * embed.setImage("https://example.com/image.png", "https://example.com/proxy-image", 128, 128);
	 */

	public setImage(image: MediaData): Embed;
	public setImage(
		image: string,
		proxyURL?: string,
		height?: number,
		width?: number,
	): Embed;
	public setImage(
		image: MediaData | string,
		proxyURL?: string,
		height?: number,
		width?: number,
	): Embed {
		this.image = this._resolveMedia(image, proxyURL, height, width);

		return this;
	}

	private _resolveMedia(
		media: MediaData | string,
		proxyURL?: string,
		height?: number,
		width?: number,
	): APIMediaData {
		let returnMedia;

		if (typeof media === "string")
			returnMedia = {
				url: media,
				proxy_url: proxyURL,
				height,
				width,
			};
		else
			returnMedia = {
				url: media.url,
				proxy_url: this.one<string>(media, "proxy_url", "proxyURL"),
				height: media.height,
				width: media.width,
			};

		return returnMedia;
	}

	/**
	 * Set the timestamp of this embed.
	 * @param {Date | number} timestamp The timestamp of the embed.
	 * @returns {Embed}
	 * @example
	 * // Set the timestamp of the embed (as a date).
	 * embed.setTimestamp(new Date());
	 * // Set the timestamp of the embed (as a number).
	 * embed.setTimestamp(1568888888);
	 */

	public setTimestamp(timestamp: Date): Embed;
	public setTimestamp(timestamp: number): Embed;
	public setTimestamp(timestamp: Date | number = Date.now()): Embed {
		let setTimestamp;

		if (typeof timestamp === "object") setTimestamp = timestamp;
		else setTimestamp = setTimestamp;

		return this;
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
	 * embed.setFooter("Example footer", "https://example.com/footer.png", "https://example.com/proxy-footer");
	 */

	public setFooter(footer: FooterData): Embed;
	public setFooter(
		footer: string,
		iconURL?: string,
		proxyIconURL?: string,
	): Embed;
	public setFooter(
		footer: FooterData | string,
		iconURL?: string,
		proxyIconURL?: string,
	): Embed {
		this.footer = this._resolveFooter(footer, iconURL, proxyIconURL);

		return this;
	}

	private _resolveFooter(
		footer: FooterData | string,
		iconURL?: string,
		proxyIconURL?: string,
	): APIFooterData {
		let returnFooter;

		if (typeof footer === "string")
			returnFooter = {
				text: footer,
				icon_url: iconURL,
				proxy_icon_url: proxyIconURL,
			};
		else
			returnFooter = {
				text: footer.text,
				icon_url: this.one<string>(footer, "icon_url", "iconURL"),
				proxy_icon_url: this.one<string>(
					footer,
					"proxy_icon_url",
					"proxyIconURL",
				),
			};

		return returnFooter;
	}
}
