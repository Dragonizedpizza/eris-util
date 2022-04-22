import { Constants } from "eris";
import { type Button } from "./Button";
import { type SelectMenu } from "./SelectMenu";

const { ComponentTypes } = Constants;

/**
 * Represents a basic message component.
 */

export class BaseComponent<TypeValue extends keyof ComponentTypes> {
	public type: ComponentTypes[TypeValue];

	public constructor(type: keyof ComponentTypes) {
		/**
		 * The component type.
		 * @type {Number}
		 */

		this.type = (
			typeof type === "number" ? type : ComponentTypes[type]
		) as ComponentTypes[TypeValue];
	}
}

export type ComponentTypes = Constants["ComponentTypes"];
export type UsableComponent = Button | SelectMenu;
