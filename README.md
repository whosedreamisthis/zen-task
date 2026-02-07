# 🧘‍♂️ Zen Task

A minimalist, high-performance task management application built with **Next.js 15**, **Zustand**, and **Framer Motion**. Designed for focus, flow, and simplicity.

!

## ✨ Features

-   **Clean UI/UX**: Built with Tailwind CSS and Shadcn/UI for a distraction-free experience.
-   **Fluid Animations**: Powered by Framer Motion for "Zen-like" transitions and interactions.
-   **Persistent State**: Task data is persisted locally via Zustand middleware (retains data on refresh).
-   **Detailed Task View**: Dedicated routes for task editing, categories, and priority management.
-   **Dark Mode**: Native support for late-night productivity.
-   **Responsive**: Fully optimized for mobile, tablet, and desktop.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
-   **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)

## 🛠️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/zen-task.git](https://github.com/your-username/zen-task.git)
    cd zen-task
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your auth secrets:

    ```env
    NEXTAUTH_SECRET=your_secret_here
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components (ZenCard, DropDown, etc.)
├── store/          # Zustand store with persistence logic
├── types/          # TypeScript interfaces and constants
└── data/           # Seed data for initial app state
```

## 📝 Deployment

This app is optimized for deployment on the **Vercel Platform**.

1. **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2. **Import your project** into Vercel.
3. **Configure Environment Variables**: Ensure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` (your production domain) are added in the Vercel dashboard.
4. **Deploy**: Next.js automatically optimizes your build for the edge.

## 🧪 Key Workflows

### State Persistence

Zen Task uses the `persist` middleware from Zustand. This means your lists and tasks are saved to `localStorage` automatically. Even if you close the browser or refresh the page, your "Zen" state remains intact.

### Dynamic Routing

The app utilizes Next.js dynamic segments:

-   `/list/[listSlug]` - View all tasks within a specific category.
-   `/list/[listSlug]/[taskSlug]` - Detailed view for editing specific task metadata.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 🧘‍♂️ The Zen Philosophy

Zen Task follows the principle of **"Less is More."** We intentionally avoid notification bloat, complex sub-menus, and "gamification" that distracts from the work. The goal is to provide a tool that feels like a quiet room—allowing you to enter your **Flow State** and stay there.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Created with 🤍 by Dana Sharon @whosedreamisthis
