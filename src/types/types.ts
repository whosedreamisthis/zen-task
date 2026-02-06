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
	high: {
		label: 'High',
		icon: '🔴',
		color:
			'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400',
	},
	medium: {
		label: 'Medium',
		icon: '🟡',
		color:
			'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400',
	},
	low: {
		label: 'Low',
		icon: '🟢',
		color:
			'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400',
	},
} as const;
