'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { User, LogOut } from 'lucide-react';
import ToggleTheme from './ToggleTheme'; // Import your actual theme toggle here
import Image from 'next/image';

export default function Navbar() {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-950 transition-colors">
			{/* Left Side: Brand */}
			<div className="text-xl font-bold tracking-tight">Zen Task</div>

			{/* Right Side: Action Area */}
			<div className="flex items-center gap-2">
				{/* 1. Your Theme Toggle (Restored!) */}
				{/* <ThemeToggle /> */}
				<div className="text-xs">
					<ToggleTheme />
				</div>
				{/* Placeholder */}
				{/* 2. User Menu */}
				<div className="relative">
					{!session ? (
						<button
							onClick={() => signIn('google')}
							className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-zinc-800 p-2 rounded-full transition-all"
						>
							<User size={24} />
						</button>
					) : (
						<>
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="flex items-center focus:outline-none"
							>
								{session.user?.image ? (
									<Image
										src={session.user.image}
										alt="Profile"
										width={36}
										height={36}
										className="rounded-full border border-slate-200"
										referrerPolicy="no-referrer" // Important: Google sometimes blocks requests without this
									/>
								) : (
									<div className="p-2 bg-slate-100 rounded-full text-slate-600">
										<User size={20} />
									</div>
								)}
							</button>

							{isOpen && (
								<>
									<div
										className="fixed inset-0 z-10"
										onClick={() => setIsOpen(false)}
									></div>
									<div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl py-2 z-20 border border-slate-100 dark:border-zinc-800">
										<div className="px-4 py-2 mb-2 border-b border-slate-50 dark:border-zinc-800">
											<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
												Account
											</p>
											<p className="text-sm font-medium truncate">
												{session.user?.email}
											</p>
										</div>

										<button
											onClick={() => {
												setIsOpen(false);
												signOut();
											}}
											className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 transition-colors"
										>
											<LogOut size={16} />
											<span>Sign Out</span>
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
