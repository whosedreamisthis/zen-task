'use client';
import React, { useState } from 'react';
import { TaskListType, TaskType } from '@/types/types';
import TaskCard from './TaskCard';
import { Input } from './ui/input';
import { Check, Divide, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';

export default function TaskList({ taskList }: { taskList: TaskListType }) {
	const [editingName, setEditingName] = useState(false);
	const [listName, setListName] = useState('');
	const updateListName = useTaskStore((state) => state.updateListName);
	const cancelNameEdit = () => {
		// Here you would eventually save tempName to your state/database
		setEditingName(false);
		setListName('');
	};

	const saveNameEdit = () => {
		updateListName(taskList.id, listName);
		// Here you would eventually save tempName to your state/database
		setEditingName(false);
		setListName('');
	};

	return (
		<>
			<div className="relative bg-gray-100 w-[400px] m-auto p-4">
				<Button variant="ghost" className="absolute top-3 left-1">
					<Menu className="text-center" />
				</Button>
				{editingName ? (
					<div className="flex items-center gap-2 ml-8">
						<Input
							value={listName}
							autoFocus
							onBlur={saveNameEdit}
							onChange={(e) => {
								setListName(e.target.value);
							}}
							placeholder={taskList.name}
						/>
						<Check
							className="text-green-400 font-bold"
							onClick={saveNameEdit}
						/>
						<X onClick={cancelNameEdit} />
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
			<div className="flex flex-col gap-4 w-[400px] m-auto mt-10">
				<div className="flex justify-center items-center">
					<Input
						placeholder="What needs to be done?"
						className="py-6 rounded-r-none focus-visible:ring-offset-0"
					/>
					<Button className="p-6 rounded-l-none border-l-0">
						<Plus />
					</Button>
				</div>
				{taskList.tasks.map((task: TaskType) => {
					return <TaskCard key={task.id} task={task} />;
				})}
			</div>
		</>
	);
}
