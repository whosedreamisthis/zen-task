'use client';
import Image from 'next/image';
import { seed_tasks } from '@/data/seed';
import TaskList from '@/components/TaskList';
import { useState } from 'react';

export default function Home() {
	const [activeListIndex, setActiveListIndex] = useState(0);

	return <div>home page</div>;
}
