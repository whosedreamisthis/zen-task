import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskListType } from '@/types/types';
import { seed_tasks } from '@/data/seed';

interface TaskState {
	lists: TaskListType[];
	updateListName: (id: string, newName: string) => void;
	deleteList: (id: string) => void;
	addList: (id: string) => void;
	toggleTask: (listId: string, taskId: string) => void;
	addTask: (listId: string) => void;
	deleteTask: (listId: string, taskId: string) => void;
}

export const useTaskStore = create<TaskState>()(
	persist(
		(set) => {
			return {
				lists: seed_tasks,
				updateListName: (id, newName) =>
					set((state) => ({
						lists: state.lists.map((list) => {
							return list.id === id
								? { ...list, name: newName }
								: list;
						}),
					})),
			};
		},
		{
			name: 'task_store',
		},
	),
);
