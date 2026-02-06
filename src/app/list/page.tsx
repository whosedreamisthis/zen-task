'use client';
import React, { useState } from 'react';

import TaskListCard from '@/components/TaskListCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
export default function TaskListsPage() {
	const lists = useTaskStore((state) => state.lists);
	const addList = useTaskStore((state) => state.addList);

	const [listName, setListName] = useState('');
	const addNewList = () => {
		if (listName !== '') {
			addList(listName);
			setListName('');
		}
	};

	return (
		<div className="flex flex-col justify-center w-full m-auto px-4">
			<h1 className="text-center text-2xl font-semibold mb-5">Lists</h1>
			<div className="flex justify-center items-center w-full items-stretch">
				<Input
					value={listName}
					onChange={(e) => {
						setListName(e.target.value);
					}}
					placeholder="Add new list"
					className="h-12 rounded-r-none border-r-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-offset-0"
				/>
				<Button
					className="h-auto px-4 rounded-l-none"
					onClick={addNewList}
				>
					<Plus />
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full m-auto mt-10">
				{lists.map((taskList) => {
					return (
						<TaskListCard key={taskList.id} taskList={taskList} />
					);
				})}
			</div>
		</div>
	);
}
