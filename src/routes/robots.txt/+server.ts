export const GET = async ({ url }) => {
  const host = url.origin;
  const sitemapUrl = `${host}/sitemap.xml`;

  const body = ["User-agent: *", "", `Sitemap: ${sitemapUrl}`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
