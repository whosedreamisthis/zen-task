'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Change this
import { useRouter } from 'next/navigation';
import TaskListCard from '@/components/TaskListCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '@/store/useTaskStore';

export default function TaskListsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const lists = useTaskStore((state) => state.lists);
	const addList = useTaskStore((state) => state.addList);

	const [listName, setListName] = useState('');

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
				<AnimatePresence mode="popLayout">
					{lists.map((taskList) => {
						return (
							<motion.div
								key={taskList.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{
									opacity: 0,
									scale: 0.9,
									transition: { duration: 0.2 },
								}}
								// Notice: No background or padding here!
								// We let the TaskCard handle the styling.
							>
								<TaskListCard
									key={taskList.id}
									taskList={taskList}
								/>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}
