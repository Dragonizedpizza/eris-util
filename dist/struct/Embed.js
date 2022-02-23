"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const util_1 = require("../util");
/**
 * Represents an embed/provides easier embed creation.
 * @typedef {APIAuthorData?} author The embed author.
 * @typedef {String?} title The embed title.
 * @typedef {String?} description The embed description.
 * @typedef {String?} url The embed url.
 * @typedef {Number?} color The embed color.
 * @typedef {APIFieldData[]?} fields The embed fields.
 * @typedef {APIMediaData?} thumbnail The embed thumbnail.
 * @typedef {APIMediaData?} image The embed image.
 * @typedef {APIMediaData?} video The embed video.
 * @typedef {number?} timestamp The embed timestamp.
 * @typedef {APIFooterData?} footer The embed footer.
 */
class Embed {
    constructor(data) {
        this.fields = [];
        if (!data)
            return;
        if ("author" in data)
            this.setAuthor(data.author);
        if ("title" in data)
            this.setTitle(data.title);
        if ("description" in data)
            this.setDescription(data.description);
        if ("url" in data)
            this.setURL(data.url);
        if ("color" in data)
            this.setColor(data.color);
        if ("fields" in data)
            this.addFields(...data.fields);
        if ("thumbnail" in data)
            this.setThumbnail(data.thumbnail);
        if ("image" in data)
            this.setImage(data.image);
        if ("video" in data)
            this.video = data.video;
        if ("timestamp" in data)
            this.setTimestamp(data.timestamp);
        if ("footer" in data)
            this.setFooter(data.footer);
    }
    one(data, ...keys) {
        for (const key of keys)
            if (key in data)
                return data[key];
        return undefined;
    }
    setAuthor(author, url, iconURL, proxyIconURL) {
        this.author = this._resolveAuthor(author, url, iconURL, proxyIconURL);
        return this;
    }
    _resolveAuthor(author, url, iconURL, proxyIconURL) {
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
                icon_url: this.one(author, "icon_url", "iconURL"),
                proxy_icon_url: this.one(author, "proxy_icon_url", "proxyIconURL"),
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
    setTitle(title) {
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
    setDescription(description) {
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
    setURL(url) {
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
    setColor(color) {
        this.color = (0, util_1.resolveColor)(color);
        return this;
    }
    addField(field, value, inline) {
        let endField;
        if (typeof field === "string")
            endField = {
                name: field,
                value: value,
                inline,
            };
        else
            endField = field;
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
    addFields(...fields) {
        this.fields = fields;
        return this;
    }
    setThumbnail(thumbnail, proxyURL, height, width) {
        this.thumbnail = this._resolveMedia(thumbnail, proxyURL, height, width);
        return this;
    }
    setImage(image, proxyURL, height, width) {
        this.image = this._resolveMedia(image, proxyURL, height, width);
        return this;
    }
    _resolveMedia(media, proxyURL, height, width) {
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
                proxy_url: this.one(media, "proxy_url", "proxyURL"),
                height: media.height,
                width: media.width,
            };
        return returnMedia;
    }
    setTimestamp(timestamp = Date.now()) {
        let setTimestamp;
        if (typeof timestamp === "object")
            setTimestamp = timestamp;
        else
            setTimestamp = setTimestamp;
        return this;
    }
    setFooter(footer, iconURL, proxyIconURL) {
        this.footer = this._resolveFooter(footer, iconURL, proxyIconURL);
        return this;
    }
    _resolveFooter(footer, iconURL, proxyIconURL) {
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
                icon_url: this.one(footer, "icon_url", "iconURL"),
                proxy_icon_url: this.one(footer, "proxy_icon_url", "proxyIconURL"),
            };
        return returnFooter;
    }
}
exports.Embed = Embed;
