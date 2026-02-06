'use client';
import React, { useState } from 'react';
import { TaskListType, TaskType } from '@/types/types';
import TaskCard from './TaskCard';
import { Input } from './ui/input';
import { Check, Divide, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CreateTaskModal from './CreateTaskModal';
export default function TaskList({ taskList }: { taskList: TaskListType }) {
	const [taskTitle, setTaskTitle] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const addTask = useTaskStore((state) => state.addTask);

	const handlePlusClick = () => {
		if (taskTitle.trim() === '') return;
		setIsModalOpen(true); // Open modal instead of adding immediately
	};

	const addTaskHandler = (e) => {
		e.preventDefault();
		if (taskTitle !== '') {
			addTask(taskList.id, taskTitle);
		}

		setTaskTitle('');
	};

	return (
		<>
			<div className="relative bg-gray-100 dark:bg-gray-800 w-full max-w-md m-auto p-4">
				<Link className="absolute top-4 left-1" href="/list">
					<ArrowLeft className="text-center" />
				</Link>

				<h1 className="text-center font-bold">{taskList.name}</h1>
			</div>
			<div className="flex flex-col gap-4 w-full m-auto mt-10 px-4">
				<div className="flex justify-center items-center w-full items-stretch">
					<Input
						value={taskTitle}
						onChange={(e) => {
							setTaskTitle(e.target.value);
						}}
						placeholder="What needs to be done?"
						className="h-12 rounded-r-none border-r-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-offset-0"
					/>
					<Button
						className="h-auto px-4 rounded-l-none"
						onClick={handlePlusClick}
					>
						<Plus />
					</Button>
				</div>
				<AnimatePresence>
					{isModalOpen && (
						<CreateTaskModal
							initialTitle={taskTitle}
							listId={taskList.id}
							onClose={() => {
								setIsModalOpen(false);
								setTaskTitle(''); // Clear input after success
							}}
						/>
					)}
				</AnimatePresence>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					<AnimatePresence mode="popLayout">
						{taskList.tasks.map((task: TaskType) => {
							return (
								<motion.div
									key={task.id}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{
										opacity: 0,
										scale: 0.9,
										transition: { duration: 0.2 },
									}}
									// Notice: No background or padding here!
									// We let the TaskCard handle the styling.
								>
									<TaskCard
										key={task.id}
										task={task}
										listId={taskList.id}
									/>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
			</div>
		</>
	);
}
