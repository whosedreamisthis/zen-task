'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '@/store/useTaskStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea'; // Assuming you have a shadcn textarea or standard one
import { Tag, Flag, AlignLeft } from 'lucide-react';
import ZenDropDownList from './ZenDropDownList';
import { PRIORITY_MAP } from '@/types/types';
import { CATEGORY_MAP } from '@/types/types';

interface Props {
	initialTitle: string;
	listId: string;
	onClose: () => void;
}
export default function CreateTaskModal({
	initialTitle,
	listId,
	onClose,
}: Props) {
	const addTask = useTaskStore((state) => state.addTask);

	// Local state for all details
	const [title, setTitle] = useState(initialTitle);
	const [priority, setPriority] = useState('🟢 Low Priority');

	const [category, setCategory] = useState('Personal');
	const [description, setDescription] = useState('');

	const handleFinalAdd = () => {
		// Ensure the store action accepts 'description' now!
		addTask(listId, { title, priority, category, description });
		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
		>
			<motion.div
				initial={{ y: 20, scale: 0.95 }}
				animate={{ y: 0, scale: 1 }}
				exit={{ y: 20, scale: 0.95 }}
				className="bg-white dark:bg-zinc-950 p-6 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-zinc-800"
			>
				<div className="mb-6">
					<h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
						Refine Task
					</h2>
					<p className="text-sm text-zinc-500">
						Set the priority and context for your new task.
					</p>
				</div>

				<div className="space-y-6">
					{/* Title Input */}
					<div className="space-y-2">
						<label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
							Task Title
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none focus-visible:ring-1"
						/>
					</div>

					{/* Meta Row: Priority & Category */}
					<div className="grid grid-cols-2 gap-4">
						<ZenDropDownList
							setValue={setPriority}
							value={priority}
							map={PRIORITY_MAP}
							label="Priority"
							icon={<Flag size={12} />}
						/>
						<ZenDropDownList
							setValue={setCategory}
							value={category}
							map={CATEGORY_MAP}
							label="Category"
							icon={<Tag size={12} />}
						/>
					</div>

					{/* Description Textarea */}
					<div className="space-y-2">
						<label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
							<AlignLeft size={12} /> Description
						</label>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Add more details..."
							className="min-h-[100px] rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-none resize-none focus-visible:ring-1"
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 mt-8">
					<Button
						variant="ghost"
						onClick={onClose}
						className="flex-1 h-12 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Cancel
					</Button>
					<Button
						onClick={handleFinalAdd}
						className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
					>
						Create Task
					</Button>
				</div>
			</motion.div>
		</motion.div>
	);
}
