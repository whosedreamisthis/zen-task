'use client';
import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Change this
import { useRouter } from 'next/navigation';
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
	const taskList = lists.find((l) => l.id === listSlug);
	const [hasHydrated, setHasHydrated] = useState(false);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		setHasHydrated(true);
	}, []);

	if (!hasHydrated) {
		return <div></div>;
	}

	if (!taskList) {
		return notFound();
	}

	return (
		<div>
			<TaskList taskList={taskList} />
		</div>
	);
}
