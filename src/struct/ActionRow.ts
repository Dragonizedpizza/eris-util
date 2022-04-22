import { BaseComponent, UsableComponent } from "./BaseComponent";

/**
 * A row of components.
 * @extends {BaseComponent}
 */

export class ActionRow extends BaseComponent<"ACTION_ROW"> {
	public components: UsableComponent[];

	constructor(components: UsableComponent[] = []) {
		super("ACTION_ROW");

		/**
		 * The components within this action row.
		 * @type {UsableComponent[]}
		 */

		this.components = components;
	}

	/**
	 * Add a component to this action row.
	 * @param {UsableComponent} component The component to add.
	 * @returns {ActionRow}
	 */

	public addComponent(component: UsableComponent): ActionRow {
		this.components.push(component);

		return this;
	}

	/**
	 * Add multiple components to this action row.
	 * @param {UsableComponent} components The components to add.
	 * @returns {ActionRow}
	 */

	public addComponents(...components: UsableComponent[]): ActionRow {
		this.components.push(...components);

		return this;
	}
}
