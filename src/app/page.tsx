import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
	const session = await getServerSession();

	// If the user is authenticated, redirect them to the list page
	if (session) {
		redirect('/list');
	}

	return (
		<div className="m-auto flex flex-col justify-center items-center mt-20">
			<h1>Welcome to Zen Task</h1>
			<p>Please sign in to see your lists.</p>
		</div>
	);
}
