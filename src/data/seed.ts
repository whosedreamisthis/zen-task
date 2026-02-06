export const seed_tasks = [
	{
		id: 'list-1',
		name: '🚀 Project Setup',
		tasks: [
			{
				id: 't1',
				title: 'Initialize Next.js',
				isCompleted: true,
				priority: 'high',
				category: 'Work',
				description:
					'Set up the core framework using the App Router and TypeScript. Ensure Tailwind CSS is properly configured.',
			},
			{
				id: 't2',
				title: 'Connect GitHub',
				isCompleted: true,
				priority: 'medium',
				category: 'Work',
				description:
					'Create a remote repository and push the initial commit. Set up basic branch protection rules.',
			},
			{
				id: 't3',
				title: 'Define Zod Schemas',
				isCompleted: false,
				priority: 'high',
				category: 'Development',
				description:
					'Create validation schemas for Task and List objects to ensure data integrity across the app.',
			},
			{
				id: 't4',
				title: 'Install Dependencies',
				isCompleted: false,
				priority: 'low',
				category: 'Work',
				description:
					'Install Lucide-React for icons, Framer Motion for animations, and Zustand for state management.',
			},
			{
				id: 't5',
				title: 'Build Zustand Store',
				isCompleted: false,
				priority: 'high',
				category: 'Development',
				description:
					'Implement the main store logic including actions for adding, deleting, and updating tasks and lists.',
			},
		],
	},
	{
		id: 'list-2',
		name: '🍎 Personal',
		tasks: [
			{
				id: 't6',
				title: 'Buy Milk',
				isCompleted: false,
				priority: 'medium',
				category: 'Groceries',
				description:
					'Need 2% organic milk. Check the expiration date before heading to the checkout.',
			},
			{
				id: 't7',
				title: 'Avocados',
				isCompleted: false,
				priority: 'low',
				category: 'Groceries',
				description:
					'Buy 3 avocados. Make sure they are slightly soft so they are ready for guacamole tonight.',
			},
			{
				id: 't8',
				title: 'Chicken Breast',
				isCompleted: false,
				priority: 'medium',
				category: 'Groceries',
				description:
					'Get about 1.5kg for meal prep. Look for the family pack to save a few dollars.',
			},
			{
				id: 't9',
				title: 'Paper Towels',
				isCompleted: false,
				priority: 'low',
				category: 'Home',
				description:
					'Pick up a 6-pack of select-a-size towels. We are completely out in the kitchen.',
			},
			{
				id: 't10',
				title: 'Sparkling Water',
				isCompleted: true,
				priority: 'low',
				category: 'Groceries',
				description:
					'Prefer Lime or Grapefruit flavor. Grab two cases if they are still on sale.',
			},
		],
	},
];
