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
		// We only redirect if we are SURE the user is logged out
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	// Guard the UI:
	// 1. Show loading while checking
	// 2. Return null if no session (the useEffect will handle the push)
	if (status === 'loading') return <div>Loading...</div>;
	if (!session)
		return (
			<div className="m-auto flex flex-col justify-center items-center mt-20">
				<h1>Welcome to Zen Task</h1>
				<p>Please sign in to see your lists.</p>
			</div>
		);

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
