'use client';

import React, { useRef, useState } from 'react';
import { TaskListType } from '@/types/types';
import { Card } from './ui/card';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { Input } from './ui/input';
export default function TaskListCard({ taskList }: { taskList: TaskListType }) {
	const deleteList = useTaskStore((state) => state.deleteList);
	const [showTools, setShowTools] = useState(false);
	const [listName, setListName] = useState('');
	const [editing, setEditing] = useState(false);
	const updateListName = useTaskStore((state) => state.updateListName);

	const router = useRouter();
	const startPos = useRef({ x: 0, y: 0 });
	const handlePointerDown = (e: React.PointerEvent) => {
		startPos.current = { x: e.clientX, y: e.clientY };
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		const deltaX = Math.abs(e.clientX - startPos.current.x);
		const deltaY = Math.abs(e.clientY - startPos.current.y);

		// If the finger moved more than 10px, it was a swipe/scroll, not a tap
		if (deltaX < 10 && deltaY < 10) {
			router.push(`/list/${taskList.id}`);
		}
	};

	const cancelNameEdit = () => {
		// Here you would eventually save tempName to your state/database
		setEditing(false);
		setListName('');
	};

	const saveNameEdit = (e) => {
		e.preventDefault();

		if (listName !== '') {
			updateListName(taskList.id, listName);
		}
		// Here you would eventually save tempName to your state/database
		setEditing(false);
		setListName('');
	};

	// const handleTap = () => {
	// 	// This only fires if the user taps without dragging
	// 	router.push(`/list/${taskList.id}`);
	// };

	return (
		<>
			{/* 1. GLOBAL OVERLAY: Only appears when tools are out */}
			{showTools && (
				<div
					className="fixed inset-0 z-30 bg-transparent"
					onPointerDown={() => setShowTools(false)}
				/>
			)}
			<motion.div
				// 1. Detection for the Swipe
				onPanEnd={(event, info) => {
					if (info.offset.x < -100) {
						// handleDelete(taskList.id);
						console.log('deleting list');
						setShowTools(true);
					}
				}}
				// 2. Manual detection for the Tap
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				whileTap={{ scale: 0.98 }}
				className={`cursor-pointer select-none touch-pan-y relative ${
					showTools ? 'z-40' : 'z-10'
				}`}
			>
				<div className="relative">
					{showTools && (
						<>
							{!editing && (
								<>
									<Trash
										className="absolute right-4 top-7 text-gray-600 z-50"
										size={16}
										onPointerDown={(e) =>
											e.stopPropagation()
										} // Stop the parent from recording startPos
										onPointerUp={(e) => e.stopPropagation()}
										onClick={(e) => {
											deleteList(taskList.id);
											e.stopPropagation();
										}}
									/>

									<Pencil
										className="absolute right-10 top-7 text-gray-600  z-50"
										size={16}
										onPointerDown={(e) =>
											e.stopPropagation()
										} // Stop the parent from recording startPos
										onPointerUp={(e) => e.stopPropagation()}
										onClick={(e) => {
											setEditing(true);
											e.stopPropagation();
										}}
									/>
								</>
							)}
						</>
					)}
					<Card>
						{editing ? (
							<div
								className="flex items-center gap-2 ml-8"
								onPointerDown={(e) => e.stopPropagation()}
								onPointerUp={(e) => e.stopPropagation()}
							>
								<Input
									className="z-50"
									value={listName}
									autoFocus
									onBlur={cancelNameEdit}
									onChange={(e) => {
										setListName(e.target.value);
									}}
									placeholder={taskList.name}
								/>
								<Check
									className="text-green-400 font-bold z-50"
									onPointerDown={saveNameEdit}
								/>
								<X
									onPointerDown={cancelNameEdit}
									className="cursor-pointer z-50"
								/>
							</div>
						) : (
							<div className="pl-5">{taskList.name}</div>
						)}
					</Card>
				</div>
			</motion.div>
		</>
	);
}
