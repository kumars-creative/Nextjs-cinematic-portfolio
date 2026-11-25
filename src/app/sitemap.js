const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null);

export default function sitemap() {
  if (!siteOrigin) return [];

  const lastModified = new Date();
  return ["", "/about", "/work", "/projects", "/contact"].map((path) => ({
    url: new URL(path, siteOrigin).toString(),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
