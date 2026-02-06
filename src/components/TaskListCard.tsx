'use client';

import { TaskListType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/useTaskStore';
import ZenCard from '@/components/ZenCard';

export default function TaskListCard({ taskList }: { taskList: TaskListType }) {
	const deleteList = useTaskStore((state) => state.deleteList);
	const updateListName = useTaskStore((state) => state.updateListName);

	const router = useRouter();

	const onTap = (id: string) => {
		router.push(`/list/${id}`);
	};

	return (
		<ZenCard
			id={taskList.id}
			label={taskList.name}
			onTap={onTap}
			onDelete={deleteList}
			onUpdate={updateListName}
		></ZenCard>
	);
}
