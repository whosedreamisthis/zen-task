import React from 'react';
import { TaskListType, TaskType } from '@/types/types';
import TaskCard from './TaskCard';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
export default function TaskList({ taskList }: { taskList: TaskListType }) {
	return (
		<>
			<div className="relative bg-gray-100 w-[400px] m-auto p-4">
				<Button variant="ghost" className="absolute top-3 left-1">
					<Menu className="text-center" />
				</Button>
				<h1 className="text-center font-bold">{taskList.name}</h1>
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
