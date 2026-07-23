import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bulkymailer.com";

  const routes = [
    "",
    "/features",
    "/pricing",
    "/templates",
    "/integrations",
    "/docs",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/login",
    "/register",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
