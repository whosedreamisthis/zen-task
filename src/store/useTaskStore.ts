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
	addTask: (listId: string, taskTitle: string) => void;
	updateTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
	deleteTask: (listId: string, taskId: string) => void;
}

export const useTaskStore = create<TaskState>()(
	persist(
		(set) => {
			return {
				lists: seed_tasks,
				addList: (name) =>
					set((state) => ({
						lists: [
							{ id: crypto.randomUUID(), name, tasks: [] },
							...state.lists,
						],
					})),

				updateListName: (id, newName) =>
					set((state) => ({
						lists: state.lists.map((list) => {
							return list.id === id
								? { ...list, name: newName }
								: list;
						}),
					})),
				deleteList: (id) =>
					set((state) => ({
						lists: state.lists.filter((list) => list.id != id),
					})),
				deleteTask: (listId, taskId) =>
					set((state) => ({
						lists: state.lists.map((list) => {
							return listId === list.id
								? {
										id: list.id,
										tasks: list.tasks.filter((task) => {
											return task.id !== taskId;
										}),
										name: list.name,
								  }
								: list;
						}),
					})),
				updateTaskTitle: (listId, taskId, newTitle) =>
					set((state) => ({
						lists: state.lists.map((list) => {
							return listId === list.id
								? {
										...list,
										tasks: list.tasks.map((task) => {
											return taskId === task.id
												? {
														id: taskId,
														title: newTitle,
														isCompleted:
															task.isCompleted,
												  }
												: task;
										}),
								  }
								: list;
						}),
					})),
				addTask: (listId, taskTitle) =>
					set((state) => ({
						lists: state.lists.map((list) => {
							return listId === list.id
								? {
										...list,
										tasks: [
											{
												id: crypto.randomUUID(),
												title: taskTitle,
												isCompleted: false,
											},
											...list.tasks,
										],
								  }
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
