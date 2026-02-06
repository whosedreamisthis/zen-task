'use client';
import React, { useState } from 'react';
import { TaskListType, TaskType } from '@/types/types';
import TaskCard from './TaskCard';
import { Input } from './ui/input';
import { Check, Divide, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function TaskList({ taskList }: { taskList: TaskListType }) {
	const [editingName, setEditingName] = useState(false);
	const [listName, setListName] = useState('');
	const [taskTitle, setTaskTitle] = useState('');
	const updateListName = useTaskStore((state) => state.updateListName);
	const addTask = useTaskStore((state) => state.addTask);

	const router = useRouter();
	const cancelNameEdit = () => {
		// Here you would eventually save tempName to your state/database
		setEditingName(false);
		setListName('');
	};

	const saveNameEdit = (e) => {
		e.preventDefault();

		if (listName !== '') {
			updateListName(taskList.id, listName);
		}
		// Here you would eventually save tempName to your state/database
		setEditingName(false);
		setListName('');
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
			<div className="relative bg-gray-100 w-full max-w-md m-auto p-4">
				<Link className="absolute top-4 left-1" href="/list">
					<ArrowLeft className="text-center" />
				</Link>

				{editingName ? (
					<div className="flex items-center gap-2 ml-8">
						<Input
							value={listName}
							autoFocus
							onBlur={cancelNameEdit}
							onChange={(e) => {
								setListName(e.target.value);
							}}
							placeholder={taskList.name}
						/>
						<Check
							className="text-green-400 font-bold"
							onPointerDown={saveNameEdit}
						/>
						<X
							onPointerDown={cancelNameEdit}
							className="cursor-pointer"
						/>
					</div>
				) : (
					<h1
						className="text-center font-bold"
						onClick={() => setEditingName(true)}
					>
						{taskList.name}
					</h1>
				)}
			</div>
			<div className="flex flex-col gap-4 w-full max-w-md m-auto mt-10 px-4">
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
						onClick={addTaskHandler}
					>
						<Plus />
					</Button>
				</div>

				{taskList.tasks.map((task: TaskType) => {
					return (
						<TaskCard
							key={task.id}
							task={task}
							listId={taskList.id}
						/>
					);
				})}
			</div>
		</>
	);
}
