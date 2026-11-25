import ContactPage from "@/views/contact";

export const metadata = {
  title: "Contact",
  description:
    "Start a conversation with Kumar S. about creative direction, video editing, motion graphics, AI filmmaking, Blender 3D, or social media work.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Kumar S. — Creative Director",
    description: "Tell Kumar about the visual story you want to create.",
  },
};

export default function Contact() {
  return <ContactPage />;
}
