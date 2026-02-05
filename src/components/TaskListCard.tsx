import React from 'react';
import { TaskListType } from '@/types/types';
import { Card } from './ui/card';
import Link from 'next/link';
export default function TaskListCard({ taskList }: { taskList: TaskListType }) {
	return (
		<Link href={`/list/${taskList.id}`}>
			<Card>
				<div className="pl-5">{taskList.name}</div>
			</Card>
		</Link>
	);
}
