const META_PATTERNS = {
  title:
    /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>|<title[^>]*>([^<]+)<\/title>/i,
  description:
    /<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>|<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  image:
    /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>|<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  siteName: /<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["'][^>]*>/i,
};

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function readMeta(html: string, baseUrl: string) {
  const titleMatch = html.match(META_PATTERNS.title);
  const descriptionMatch = html.match(META_PATTERNS.description);
  const imageMatch = html.match(META_PATTERNS.image);
  const siteNameMatch = html.match(META_PATTERNS.siteName);

  const title = decodeHtml(cleanText(titleMatch?.[1] ?? titleMatch?.[2] ?? ""));
  const description = decodeHtml(cleanText(descriptionMatch?.[1] ?? descriptionMatch?.[2] ?? ""));
  const site_name = decodeHtml(cleanText(siteNameMatch?.[1] ?? ""));
  const imageValue = cleanText(imageMatch?.[1] ?? imageMatch?.[2] ?? "");

  return {
    title,
    description,
    site_name,
    image: imageValue
      ? {
          url: new URL(imageValue, baseUrl).toString(),
        }
      : undefined,
  };
}

async function fetchPageMeta(url: string) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; NextPortfolioBot/1.0)",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const html = await response.text();
  return readMeta(html, url);
}

async function extractUrl(request: Request) {
  if (request.method === "GET") {
    return new URL(request.url).searchParams.get("url") ?? "";
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { url?: string };
    return body.url ?? "";
  }

  const formData = await request.formData();
  const value = formData.get("url");

  return typeof value === "string" ? value : "";
}

async function handleRequest(request: Request) {
  try {
    const inputUrl = await extractUrl(request);

    if (!inputUrl) {
      return Response.json({ success: 0, message: "Missing url" }, { status: 400 });
    }

    const parsedUrl = new URL(inputUrl);
    const meta = await fetchPageMeta(parsedUrl.toString());

    return Response.json({
      success: 1,
      link: parsedUrl.toString(),
      meta,
    });
  } catch {
    return Response.json({ success: 0 }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}
