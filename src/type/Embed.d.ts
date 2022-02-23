export interface AuthorData {
	name: string;
	url?: string;
	iconURL?: string;
}

export interface FieldData {
	name: string;
	value: string;
	inline: boolean;
}

export interface MediaData {
	url: string;
	proxyURL?: string;
	height?: number;
	width?: number;
}

export interface FooterData {
	text: string;
	iconURL: string;
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
	timestamp?: string;
	footer?: FooterData;
}
