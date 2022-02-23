import { Constants } from "eris";

export interface ButtonOptions {
    url?: string;
    customID?: string;
    label?: string;
    emoji?: string;
    disabled?: boolean;
    style: keyof typeof Constants.ButtonStyles | number;
};