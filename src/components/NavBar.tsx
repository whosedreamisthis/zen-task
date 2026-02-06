'use client';
import React, { useState } from 'react';
import { User } from 'lucide-react';
import ToggleTheme from './ToggleTheme';

export default function NavBar() {
	return (
		<div className="flex justify-between m-4">
			<h1>Zen-Task</h1>
			<div className="flex gap-1 justify-center items-center">
				<ToggleTheme />
				<User />
			</div>
		</div>
	);
}
