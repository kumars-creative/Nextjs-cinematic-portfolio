import ProjectsPage from "@/views/projects";

export const metadata = {
  title: "Selected Work",
  description:
    "A visual archive of creative work in video editing, motion graphics, AI filmmaking, Blender 3D, and social media.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Selected Work — Kumar S.",
    description: "A visual archive of creative work and placeholder studies.",
  },
};

export default function Projects() {
  return <ProjectsPage />;
}
