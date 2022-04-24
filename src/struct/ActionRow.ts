import { ActionRowComponents } from "eris";
import { BaseComponent } from "./BaseComponent";

/**
 * A row of components.
 * @extends {BaseComponent}
 */

export class ActionRow extends BaseComponent<"ACTION_ROW"> {
	public components: ActionRowComponents[];

	constructor(components: ActionRowComponents[] = []) {
		super("ACTION_ROW");

		/**
		 * The components within this action row.
		 * @type {ActionRowComponents[]}
		 */

		this.components = components;
	}

	/**
	 * Add a component to this action row.
	 * @param {ActionRowComponents} component The component to add.
	 * @returns {ActionRow}
	 */

	public addComponent(component: ActionRowComponents): ActionRow {
		this.components.push(component);

		return this;
	}

	/**
	 * Add multiple components to this action row.
	 * @param {UsableComponent} components The components to add.
	 * @returns {ActionRow}
	 */

	public addComponents(...components: ActionRowComponents[]): ActionRow {
		this.components.push(...components);

		return this;
	}
}
