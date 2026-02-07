'use client';

import React, { useRef, useReducer } from 'react';

import { Card } from './ui/card';

import { motion } from 'framer-motion';
import { Check, Flag, Pencil, Trash, X } from 'lucide-react';

import { Input } from './ui/input';

interface Props {
	id: string;
	label: string;
	onDelete: (id: string) => void;
	onUpdate: (id: string, label: string) => void;
	onTap: (id: string) => void;
	children?: React.ReactNode;
	meta?: {
		priorityIcon?: string;
		categoryLabel?: string;
	};
}

const initialState = {
	showTools: false,
	editing: false,
	newLabel: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CANCEL_EDIT':
			return {
				...state,
				editing: false,
				newLabel: '',
			};
		case 'SAVE_EDIT':
			return {
				...state,
				editing: false,
				newLabel: '',
			};
		case 'SET_TOOLS':
			return {
				...state,
				showTools: action.payload,
			};
		case 'START_EDITING':
			return {
				...state,
				editing: true,
			};
		case 'SET_NEW_LABEL':
			return {
				...state,
				newLabel: action.payload,
			};

		default:
			return state;
	}
};
export default function ZenCard({
	id,
	label,
	onDelete,
	onUpdate,
	onTap,
	children,
	meta,
}: Props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const startPos = useRef({ x: 0, y: 0 });
	const handlePointerDown = (e: React.PointerEvent) => {
		startPos.current = { x: e.clientX, y: e.clientY };
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		const deltaX = Math.abs(e.clientX - startPos.current.x);
		const deltaY = Math.abs(e.clientY - startPos.current.y);

		// If the finger moved more than 10px, it was a swipe/scroll, not a tap
		if (deltaX < 10 && deltaY < 10) {
			if (onTap) {
				onTap(id);
			}
		}
	};

	const cancelLabelChange = () => {
		// Here you would eventually save tempName to your state/database
		dispatch({ type: 'CANCEL_EDIT' });
	};

	const saveNewLabel = (e) => {
		e.preventDefault();

		if (state.newLabel !== '') {
			onUpdate(id, state.newLabel);
		}
		// Here you would eventually save tempName to your state/database
		dispatch({ type: 'SAVE_EDIT' });
	};

	return (
		<>
			{/* 1. GLOBAL OVERLAY: Only appears when tools are out */}
			{state.showTools && (
				<div
					className="fixed inset-0 z-30 bg-transparent"
					onPointerDown={() =>
						dispatch({ type: 'SET_TOOLS', payload: false })
					}
				/>
			)}
			<motion.div
				// 1. Detection for the Swipe
				onPanEnd={(event, info) => {
					if (info.offset.x < -100) {
						dispatch({ type: 'SET_TOOLS', payload: true });
					}
				}}
				// 2. Manual detection for the Tap
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				whileTap={{ scale: 0.98 }}
				className={`cursor-pointer select-none touch-pan-y relative ${
					state.showTools ? 'z-40' : 'z-10'
				}`}
			>
				<div className="relative">
					{state.showTools && (
						<>
							{!state.editing && (
								<>
									<Trash
										className="absolute right-4 top-7 text-gray-600 z-50"
										size={16}
										onPointerDown={(e) =>
											e.stopPropagation()
										} // Stop the parent from recording startPos
										onPointerUp={(e) => e.stopPropagation()}
										onClick={(e) => {
											onDelete(id);
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
											dispatch({ type: 'START_EDITING' });
											e.stopPropagation();
										}}
									/>
								</>
							)}
						</>
					)}
					<Card>
						{state.editing ? (
							<div
								className="flex items-center gap-2 ml-8"
								onPointerDown={(e) => e.stopPropagation()}
								onPointerUp={(e) => e.stopPropagation()}
							>
								<Input
									className="z-50"
									value={state.newLabel}
									autoFocus
									onBlur={cancelLabelChange}
									onChange={(e) => {
										dispatch({
											type: 'SET_NEW_LABEL',
											payload: e.target.value,
										});
									}}
									placeholder={label}
								/>
								<Check
									className="text-green-400 font-bold z-50"
									onPointerDown={saveNewLabel}
								/>
								<X
									onPointerDown={cancelLabelChange}
									className="cursor-pointer z-50"
								/>
							</div>
						) : (
							<>
								<div className="flex pl-3 gap-3">
									{children}
									<div
										className={`truncate ${
											state.showTools
												? 'max-w-[75%]'
												: 'max-w-[85%]'
										}`}
									>
										{label}
									</div>

									{meta?.priorityIcon && (
										<p className="absolute right-3">
											{meta?.priorityIcon}
										</p>
									)}
								</div>
							</>
						)}
					</Card>
				</div>
			</motion.div>
		</>
	);
}
