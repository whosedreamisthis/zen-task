import React from 'react';
import { User } from 'lucide-react';

export default function NavBar() {
	return (
		<div className="flex justify-between m-4">
			<h1>Zen-Task</h1>
			<User />
		</div>
	);
}
