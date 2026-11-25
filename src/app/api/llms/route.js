export async function GET(request) {
  const origin = new URL(request.url).origin;
  const content = `# Kumar S. — Creative Director\n\n> Creative direction and visual storytelling across video editing, motion graphics, AI filmmaking, Blender 3D, and social media.\n\n## Pages\n- Home: ${origin}/\n- About: ${origin}/about\n- Work: ${origin}/work\n- Projects: ${origin}/projects\n- Contact: ${origin}/contact\n`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
