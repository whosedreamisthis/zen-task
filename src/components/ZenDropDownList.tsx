import React from 'react';
import { DropDownMap, PRIORITY_MAP } from '@/types/types';
import { Flag } from 'lucide-react';
interface Props {
	value: string;
	setValue: (newValue: string) => void;
	map: DropDownMap;
	icon: React.ReactNode;
	label: string;
}

export default function ZenDropDownList({
	value,
	setValue,
	map,
	icon,
	label,
}: Props) {
	return (
		<div className="flex flex-col gap-1">
			<label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
				{icon} {label}
			</label>
			<select
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				className="h-10 p-2 rounded-xl border-none bg-zinc-100 dark:bg-zinc-900 text-sm focus:ring-1 focus:ring-zinc-300 outline-none"
			>
				{Object.values(map).map((entry) => {
					return (
						<option key={entry.label} value={entry.label}>
							{entry.label}
						</option>
					);
				})}
			</select>
		</div>
	);
}
