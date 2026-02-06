'use client';
import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
	ArrowLeft,
	Tag,
	Flag,
	AlignLeft,
	Pencil,
	X,
	Check,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { useTaskStore } from '@/store/useTaskStore';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function TaskListPage({
	params,
}: {
	params: Promise<{ listSlug: string; taskSlug: string }>;
}) {
	const { listSlug, taskSlug } = use(params);
	const lists = useTaskStore((state) => state.lists);
	const updateTask = useTaskStore((state) => state.updateTask);

	const taskList = lists.find((l) => l.id === listSlug);
	const task = taskList?.tasks.find((t) => t.id === taskSlug);

	const [hasHydrated, setHasHydrated] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	// Local state for editing
	const [editTitle, setEditTitle] = useState('');
	const [editPriority, setEditPriority] = useState('');
	const [editCategory, setEditCategory] = useState('');
	const [editDescription, setEditDescription] = useState('');

	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/');
	}, [status, router]);

	useEffect(() => {
		setHasHydrated(true);
		if (task) {
			setEditTitle(task.title);
			setEditPriority(task.priority);
			setEditCategory(task.category);
			setEditDescription(task.description || '');
		}
	}, [task]);

	if (!hasHydrated) return null;
	if (!task) return notFound();

	const handleUpdate = () => {
		updateTask(listSlug, taskSlug, {
			title: editTitle,
			priority: editPriority as 'low' | 'medium' | 'high',
			category: editCategory,
			description: editDescription,
		});
		setIsEditing(false);
	};

	const priorityColors = {
		high:
			'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400',
		medium:
			'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400',
		low:
			'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400',
	};

	return (
		<div className="min-h-screen bg-white dark:bg-zinc-950">
			{/* Header Bar */}
			<div className="relative bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 w-full p-4 mb-8">
				<div className="max-w-2xl mx-auto flex items-center justify-center">
					{!isEditing && (
						<Link
							className="absolute left-4 p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full"
							href={`/list/${listSlug}`}
						>
							<ArrowLeft size={20} />
						</Link>
					)}

					{isEditing ? (
						<Input
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							className="max-w-xs font-bold text-center"
						/>
					) : (
						<h1 className="text-xl font-bold truncate max-w-[250px] sm:max-w-md">
							{task.title}
						</h1>
					)}

					<button
						onClick={() => setIsEditing(!isEditing)}
						className="absolute right-4 p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
					>
						{isEditing ? (
							<div className="flex justify-center items-center">
								<Check
									size={18}
									className="text-green-400 font-bold z-50"
									onClick={handleUpdate}
								/>
								<Button
									variant="ghost"
									onClick={() => setIsEditing(false)}
									className="flex-1 gap-2"
								>
									<X size={18} />
								</Button>
							</div>
						) : (
							<Pencil size={20} />
						)}
					</button>
				</div>
			</div>

			<main className="max-w-2xl mx-auto px-6 space-y-8">
				{/* Meta Info Row */}
				<div className="flex flex-wrap gap-4">
					{isEditing ? (
						<>
							{/* Priority Dropdown */}
							<div className="flex flex-col gap-1">
								<label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">
									Priority
								</label>
								<select
									value={editPriority}
									onChange={(e) =>
										setEditPriority(e.target.value)
									}
									className="h-10 p-2 rounded-xl border-none bg-zinc-100 dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-300 outline-none"
								>
									<option value="low">Low Priority</option>
									<option value="medium">
										Medium Priority
									</option>
									<option value="high">High Priority</option>
								</select>
							</div>

							{/* Category Dropdown (Matches Modal) */}
							<div className="flex flex-col gap-1">
								<label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">
									Category
								</label>
								<select
									value={editCategory}
									onChange={(e) =>
										setEditCategory(e.target.value)
									}
									className="h-10 p-2 rounded-xl border-none bg-zinc-100 dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-300 outline-none"
								>
									<option value="Work">Work</option>
									<option value="Personal">Personal</option>
									<option value="Fitness">Fitness</option>
									<option value="Groceries">Groceries</option>
								</select>
							</div>
						</>
					) : (
						<>
							<div
								className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
									priorityColors[
										task.priority as keyof typeof priorityColors
									]
								}`}
							>
								<Flag size={14} />
								<span className="capitalize">
									{task.priority} Priority
								</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 text-sm font-medium">
								<Tag size={14} />
								<span>{task.category}</span>
							</div>
						</>
					)}
				</div>

				<hr className="border-gray-100 dark:border-zinc-800" />

				{/* Description Section */}
				<section className="space-y-3">
					<div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
						<AlignLeft size={18} />
						<h2 className="text-sm font-bold uppercase tracking-wider">
							Description
						</h2>
					</div>
					<div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
						{isEditing ? (
							<Textarea
								value={editDescription}
								onChange={(e) =>
									setEditDescription(e.target.value)
								}
								className="min-h-[200px] bg-transparent border-none focus-visible:ring-0 p-0 text-gray-700 dark:text-zinc-300"
							/>
						) : (
							<p className="text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
								{task.description ||
									'No description provided for this task.'}
							</p>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
