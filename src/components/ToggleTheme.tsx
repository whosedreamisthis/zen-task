'use client';
import React from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
export default function ToggleTheme() {
	const isDark = useThemeStore((state) => state.isDark);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	// 1. Define a helper function to avoid repeating code
	const applyTheme = (isDark: boolean) => {
		if (typeof window !== 'undefined') {
			const root = window.document.documentElement;
			if (isDark) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}
	};

	// 2. INITIALIZE: Run it immediately once with the current state
	applyTheme(useThemeStore.getState().isDark);

	// 3. SUBSCRIBE: Run it every time the state changes
	useThemeStore.subscribe((state) => {
		applyTheme(state.isDark);
	});
	return (
		<Button variant="ghost" onClick={toggleTheme}>
			{isDark ? <Sun /> : <Moon />}
		</Button>
	);
}
