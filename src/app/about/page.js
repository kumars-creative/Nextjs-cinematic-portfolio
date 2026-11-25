import AboutPage from "@/views/about";

export const metadata = {
  title: "About",
  description:
    "Meet Kumar S., creative director working across video editing, motion graphics, AI filmmaking, Blender 3D, and social media.",
  keywords: ["Kumar S.", "Creative Director", "Video Editing", "Motion Graphics", "AI Filmmaking", "Blender 3D"],
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
