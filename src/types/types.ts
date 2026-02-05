export interface TaskType {
	id: string;
	title: string;
	isCompleted: boolean;
}

export interface TaskListType {
	id: string;
	name: string;
	tasks: TaskType[];
}
