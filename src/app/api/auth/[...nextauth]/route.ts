import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: 'jwt', // This tells Auth.js to use the JWTs we discussed
	},
	// Optional: Add a custom secret for extra security
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
