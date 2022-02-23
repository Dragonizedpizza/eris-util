import { Constants } from "eris";
import { BaseComponent } from "../struct/BaseComponent";

export type ValueOf<T> = T[keyof T];
export type ComponentTypes = typeof Constants.ComponentTypes;
export type UsableComponent = BaseComponent<"BUTTON" | "SELECT_MENU">;