'use client';
import React, { useState, useMemo } from 'react';
import { TaskListType, TaskType } from '@/types/types';
import TaskCard from './TaskCard';
import { Input } from './ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react'; // Added Search icon
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useTaskStore } from '@/store/useTaskStore';
import Link from 'next/link';
import CreateTaskModal from './CreateTaskModal';

export default function TaskList({ taskList }: { taskList: TaskListType }) {
	const [taskTitle, setTaskTitle] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	// --- New Filter State ---
	const [searchQuery, setSearchQuery] = useState('');
	const [activePriority, setActivePriority] = useState<string | null>(null);

	const handlePlusClick = () => {
		if (taskTitle.trim() === '') return;
		setIsModalOpen(true);
	};

	// --- Derived Filtered Tasks ---
	const filteredTasks = useMemo(() => {
		return taskList.tasks.filter((task) => {
			const matchesSearch = task.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesPriority = activePriority
				? task.priority === activePriority
				: true;
			return matchesSearch && matchesPriority;
		});
	}, [taskList.tasks, searchQuery, activePriority]);

	return (
		<>
			{/* Header */}
			<div className="relative bg-gray-50 dark:bg-gray-800 w-full m-auto p-4 border-b border-gray-200 dark:border-gray-700">
				<Link className="absolute top-4 left-4" href="/list">
					<ArrowLeft />
				</Link>
				<h1 className="text-center text-xl font-semibold">
					{taskList.name}
				</h1>
			</div>

			<div className="flex flex-col gap-6 w-full max-w-5xl m-auto mt-8 px-4">
				{/* 1. Filtering & Search UI */}
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="relative flex-1 w-full">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							size={18}
						/>
						<Input
							placeholder="Search in this list..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 h-11 bg-white dark:bg-zinc-900 border-none rounded-2xl shadow-sm focus-visible:ring-1"
						/>
					</div>

					<div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
						{[
							'🟢 Low Priority',
							'🟡 Medium Priority',
							'🔴 High Priority',
						].map((p) => (
							<button
								key={p}
								onClick={() =>
									setActivePriority(
										activePriority === p ? null : p,
									)
								}
								className={`px-4 py-1.5 rounded-xl text-sm transition-all ${
									activePriority === p
										? 'bg-white dark:bg-zinc-700 shadow-sm font-bold scale-105'
										: 'text-gray-500 hover:text-gray-700'
								}`}
							>
								{p === '🟢 Low Priority' && '🟢'}
								{p === '🟡 Medium Priority' && '🟡'}
								{p === '🔴 High Priority' && '🔴'}
							</button>
						))}
					</div>
				</div>

				{/* 2. Quick Add Input */}
				<div className="flex justify-center items-stretch w-full">
					<Input
						value={taskTitle}
						onChange={(e) => setTaskTitle(e.target.value)}
						placeholder="Quick add a new task..."
						className="h-12 rounded-l-2xl border-r-0 focus-visible:ring-1 focus-visible:ring-inset"
					/>
					<Button
						className="h-auto px-6 rounded-r-2xl"
						onClick={handlePlusClick}
					>
						<Plus />
					</Button>
				</div>

				{/* 3. The Grid with Layout Animations */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
					<AnimatePresence mode="popLayout">
						{filteredTasks.length > 0 ? (
							filteredTasks.map((task: TaskType) => (
								<motion.div
									key={task.id}
									layout // Makes other cards slide when one disappears
									initial={{ opacity: 0, scale: 0.9, y: 10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{
										opacity: 0,
										scale: 0.8,
										transition: { duration: 0.15 },
									}}
								>
									<TaskCard
										task={task}
										listId={taskList.id}
									/>
								</motion.div>
							))
						) : (
							// Empty State
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="col-span-full py-20 text-center text-gray-400 italic"
							>
								{searchQuery || activePriority
									? 'No matches found.'
									: 'No tasks yet.'}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<CreateTaskModal
						initialTitle={taskTitle}
						listId={taskList.id}
						onClose={() => {
							setIsModalOpen(false);
							setTaskTitle('');
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
