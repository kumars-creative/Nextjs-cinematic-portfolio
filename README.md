# Kumar S. — Creative Director Portfolio

A cinematic portfolio for creative direction and visual storytelling across video editing, motion graphics, AI filmmaking, Blender 3D, and social media.

The experience includes the existing scroll-driven visuals, animated sections, project archive, and contact form. Archive artwork is currently marked as temporary visual study imagery and can be replaced as final work is added.

## Run locally

Install dependencies with `npm install`, then start the development server with `npm run dev`. Open the local URL shown by Next.js.

## Project notes

- Built with Next.js App Router and React.
- Uses GSAP for scroll-driven motion and Framer Motion for transitions.
- The project archive can load portfolio entries from the existing backend; when no entries are available, it displays clearly labeled visual placeholders.
- Contact form delivery uses the existing Supabase and Resend configuration.

Before deployment, configure the project’s required environment variables in Vercel. Do not commit secrets or credentials to the repository.
