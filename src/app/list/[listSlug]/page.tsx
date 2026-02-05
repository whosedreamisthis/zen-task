'use client';
import { use } from 'react';
import TaskList from '@/components/TaskList';
import { notFound } from 'next/navigation';
import { useTaskStore } from '@/store/useTaskStore';
export default function TaskListPage({
	params,
}: {
	params: Promise<{ listSlug: string }>;
}) {
	const { listSlug } = use(params);
	const lists = useTaskStore((state) => state.lists);
	console.log('URL Slug received:', listSlug);
	const taskList = lists.find((l) => l.id === listSlug);

	if (!taskList) {
		return notFound();
	}
	return (
		<div>
			<TaskList taskList={taskList} />
		</div>
	);
}
