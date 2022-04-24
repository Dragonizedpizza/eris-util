import { Constants } from "eris";
import { type PartialEmoji } from "eris";

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
    protected one<T = null>(
		data: any,
		...keys: string[]
	): (T extends null ? any : T) | undefined {
		for (const key of keys) if (key in data) return data[key];

		return undefined;
	}
    protected _resolveEmoji(emoji: ComponentEmoji | string) {
        if (typeof emoji === "string") {
            if (emoji.startsWith("<") && emoji.endsWith(">")) {
                const [, animated, name, id] = emoji.match(/<(a)?:([a-zA-Z0-9_]+):([0-9]+)>/)!;

                return {
                    animated: !!animated,
                    name,
                    id,
                };
            } else if (parseInt(emoji)) return { id: emoji };
            else throw new TypeError("Unexpected emoji format.");
        } else return emoji;
    }
}

export type ComponentTypes = Constants["ComponentTypes"];
export type ComponentEmoji = Partial<PartialEmoji>;
export type ComponentEmojiOption = ComponentEmoji | string;