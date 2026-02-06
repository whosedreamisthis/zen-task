'use client';
import { TaskType } from '@/types/types';
import { useTaskStore } from '@/store/useTaskStore';
import ZenCard from './ZenCard';

export default function TaskCard({
	task,
	listId,
}: {
	task: TaskType;
	listId: string;
}) {
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const updateTaskTitle = useTaskStore((state) => state.updateTaskTitle);

	return (
		<ZenCard
			id={task.id}
			label={task.title}
			onDelete={(id) => {
				deleteTask(listId, id);
			}}
			onUpdate={(id, label) => {
				updateTaskTitle(listId, id, label);
			}}
			onTap={() => {}}
		/>
	);
}
