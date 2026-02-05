import React from 'react';
import { seed_tasks } from '@/data/seed';
import TaskListCard from '@/components/TaskListCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
export default function TaskListsPage() {
	return (
		<div className="flex flex-col justify-center  w-[400px] m-auto">
			<h1 className="text-center text-2xl font-semibold mb-5">Lists</h1>
			<div className="flex justify-center items-center">
				<Input
					placeholder="Add new list"
					className="py-6 rounded-r-none focus-visible:ring-offset-0"
				/>
				<Button className="p-6 rounded-l-none border-l-0">
					<Plus />
				</Button>
			</div>
			<div className="flex flex-col gap-4 w-[400px] m-auto mt-10">
				{seed_tasks.map((taskList) => {
					return (
						<TaskListCard key={taskList.id} taskList={taskList} />
					);
				})}
			</div>
		</div>
	);
}
