export interface SelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: string;
	default?: boolean;
}

export interface SelectMenuOptions {
	customID: string;
	disabled?: boolean;
	options: SelectOption[];
	placeholder?: string;
	minValues?: number;
	maxValues?: number;
}
