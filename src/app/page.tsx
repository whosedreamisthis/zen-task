import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route'; // Import your options

export default async function HomePage() {
	// Pass authOptions here!
	const session = await getServerSession(authOptions);

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
