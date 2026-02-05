import React from 'react';
import { TaskListType } from '@/types/types';
import { Card } from './ui/card';
import { Link } from 'lucide-react';
export default function TaskListCard({ taskList }: { taskList: TaskListType }) {
	return (
		<Card>
			<div className="pl-5">
				<Link>{taskList.name}</Link>
			</div>
		</Card>
	);
}
