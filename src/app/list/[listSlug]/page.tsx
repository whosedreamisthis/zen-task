import { seed_tasks } from '@/data/seed';
import TaskList from '@/components/TaskList';
import { notFound } from 'next/navigation';

export default async function TaskListPage({
	params,
}: {
	params: Promise<{ listSlug: string }>;
}) {
	const { listSlug } = await params;
	console.log('URL Slug received:', listSlug);
	const taskList = seed_tasks.find((l) => l.id === listSlug);

	if (!taskList) {
		return notFound();
	}
	return (
		<div>
			<TaskList taskList={taskList} />
		</div>
	);
}
