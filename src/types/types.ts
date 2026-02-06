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

export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_MAP = {
	low: '🟢 Low Priority',
	medium: '🟡 Medium Priority',
	high: '🔴 High Priority',
} as const;

export const CATEGORY_MAP = {
	work: 'Work',
	personal: 'Personal',
	groceries: 'Groceries',
	fitness: 'Fitness',
} as const;

export type DropDownMap = Record<string, string>;
