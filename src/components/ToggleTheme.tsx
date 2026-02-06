'use client';
import React from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
export default function ToggleTheme() {
	const isDark = useThemeStore((state) => state.isDark);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<Button variant="ghost" onClick={toggleTheme}>
			{isDark ? <Sun /> : <Moon />}
		</Button>
	);
}
