import React from 'react';
import { PRIORITY_MAP } from '@/types/types';
import { Flag } from 'lucide-react';
interface Props {
	priority: string;
	setPriority: (newValue: string) => void;
}

export default function PriorityDropDownList({ priority, setPriority }: Props) {
	return (
		<div className="flex flex-col gap-1">
			<label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
				<Flag size={12} /> Priority
			</label>
			<select
				value={priority}
				onChange={(e) => setPriority(e.target.value)}
				className="h-10 p-2 rounded-xl border-none bg-zinc-100 dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-300 outline-none"
			>
				{Object.keys(PRIORITY_MAP).map((p) => {
					return (
						<option key={p} value={p}>
							{`${
								PRIORITY_MAP[p as keyof typeof PRIORITY_MAP]
									.icon
							} ${
								PRIORITY_MAP[p as keyof typeof PRIORITY_MAP]
									.label
							} Priority `}
						</option>
					);
				})}
			</select>
		</div>
	);
}
{
	/* <option value={p}>
							{`${
								PRIORITY_MAP[p as keyof typeof PRIORITY_MAP]
									.label
							} ${
								PRIORITY_MAP[p as keyof typeof PRIORITY_MAP]
									.icon
							}`}
						</option> */
}
