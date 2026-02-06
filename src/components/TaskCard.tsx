'use client';
import { TaskType } from '@/types/types';
import { useTaskStore } from '@/store/useTaskStore';
import ZenCard from './ZenCard';
import { Check, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';

export default function TaskCard({
	task,
	listId,
}: {
	task: TaskType;
	listId: string;
}) {
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const updateTaskTitle = useTaskStore((state) => state.updateTaskTitle);
	const toggleTask = useTaskStore((state) => state.toggleTask);
	const [completed, setCompleted] = useState(task.isCompleted);
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
		>
			{completed ? (
				<CheckSquare
					className="text-blue-400"
					onClick={(e) => {
						toggleTask(listId, task.id);
						setCompleted((prev) => !prev);
					}}
				/>
			) : (
				<Square
					onClick={(e) => {
						toggleTask(listId, task.id);
						setCompleted((prev) => !prev);
					}}
				/>
			)}
		</ZenCard>
	);
}
