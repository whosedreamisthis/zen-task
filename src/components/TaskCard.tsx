import React from 'react';
import { TaskType } from '@/types/types';
import { Card } from './ui/card';
export default function TaskCard({ task }: { task: TaskType }) {
	return (
		<Card>
			<div className="pl-5">{task.title}</div>
		</Card>
	);
}
