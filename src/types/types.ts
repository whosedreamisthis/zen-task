export interface TaskType {
	id: string;
	title: string;
	isCompleted: boolean;
	description: string;
	priority: string;
	category: string;
}

export interface TaskListType {
	id: string;
	name: string;
	tasks: TaskType[];
}

// export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_MAP = {
	low: {
		label: '🟢 Low Priority',
		icon: '🟢',
	},
	medium: {
		label: '🟡 Medium Priority',
		icon: '🟡',
	},
	high: {
		label: '🔴 High Priority',
		icon: '🔴',
	},
} as const;

export const CATEGORY_MAP = {
	work: {
		label: 'Work',
	},
	personal: {
		label: 'Personal',
	},
	groceries: {
		label: 'Groceries',
	},
	fitness: {
		label: 'Fitness',
	},
} as const;

export type DropDownMap = typeof PRIORITY_MAP | typeof CATEGORY_MAP;
