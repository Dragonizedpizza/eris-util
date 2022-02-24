import { Constants } from "eris";

export interface ButtonOptions {
	url?: string;
	customID?: string;
	label?: string;
	emoji?: string;
	disabled?: boolean;
	style: keyof ButtonStyles | number;
}

export type ButtonStyles = typeof Constants.ButtonStyles;
