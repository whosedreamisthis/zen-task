'use client';
import { TaskType } from '@/types/types';
import { useTaskStore } from '@/store/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';
import ZenCard from './ZenCard';
import { Check } from 'lucide-react'; // Using Check for the "pop" inside
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

	const handleToggle = () => {
		toggleTask(listId, task.id);
		setCompleted((prev) => !prev);
	};

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
			// Optional: Dim the whole card when completed
			className={
				completed ? 'opacity-60 transition-opacity' : 'opacity-100'
			}
		>
			<div className="relative flex items-center justify-center">
				{/* The Outer Box */}
				<motion.div
					onClick={handleToggle}
					whileTap={{ scale: 0.8 }} // Squish effect on click
					className={`w-6 h-6 rounded-md border-2 cursor-pointer flex items-center justify-center transition-colors ${
						completed
							? 'bg-blue-500 border-blue-500'
							: 'border-gray-400 dark:border-gray-500'
					}`}
				>
					<AnimatePresence>
						{completed && (
							<motion.div
								initial={{ scale: 0, rotate: -45 }}
								animate={{
									scale: 1,
									rotate: 0,
									transition: {
										type: 'spring',
										stiffness: 500,
										damping: 15,
									},
								}}
								exit={{
									scale: 0,
									transition: { duration: 0.1 },
								}}
							>
								<Check
									size={16}
									className="text-white stroke-[4px]"
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</ZenCard>
	);
}
