export interface AuthorData {
	name: string;
	url?: string;
	iconURL?: string;
	proxyIconURL?: string;
}

export interface FieldData {
	name: string;
	value: string;
	inline?: boolean;
}

export interface MediaData {
	url: string;
	proxyURL?: string;
	height?: number;
	width?: number;
}

export interface FooterData {
	text: string;
	iconURL?: string;
	proxyIconURL?: string;
}

export interface APIAuthorData {
	name: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}
export interface APIMediaData {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface APIFooterData {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedData {
	author?: AuthorData;
	title?: string;
	description?: string;
	url?: string;
	color?: number;
	fields?: FieldData[];
	thumbnail?: MediaData;
	image?: MediaData;
	video?: MediaData;
	timestamp?: number;
	footer?: FooterData;
}

export type HexColorString = `#${string}`;

export type ColorStrings =
	| "DEFAULT"
	| "WHITE"
	| "AQUA"
	| "GREEN"
	| "BLUE"
	| "YELLOW"
	| "PURPLE"
	| "LUMINOUS_VIVID_PINK"
	| "FUCHSIA"
	| "GOLD"
	| "ORANGE"
	| "RED"
	| "GREY"
	| "NAVY"
	| "DARK_AQUA"
	| "DARK_GREEN"
	| "DARK_BLUE"
	| "DARK_PURPLE"
	| "DARK_VIVID_PINK"
	| "DARK_GOLD"
	| "DARK_ORANGE"
	| "DARK_RED"
	| "DARK_GREY"
	| "DARKER_GREY"
	| "LIGHT_GREY"
	| "DARK_NAVY"
	| "BLURPLE"
	| "GREYPLE"
	| "DARK_BUT_NOT_BLACK"
	| "NOT_QUITE_BLACK";

export type ColorResolvable =
	| (ColorStrings | "DEFAULT" | "RANDOM")
	| number
	| number[]
	| HexColorString;
