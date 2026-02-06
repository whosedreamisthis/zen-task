import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
	isDark: boolean;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set): ThemeState => ({
			isDark: false,
			toggleTheme: () =>
				set((state) => ({
					isDark: !state.isDark,
				})),
		}),
		{ name: 'theme' },
	),
);

// 2. Sync with the DOM
useThemeStore.subscribe((state) => {
	if (typeof window !== 'undefined') {
		const root = window.document.documentElement;
		if (state.isDark) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}
});
