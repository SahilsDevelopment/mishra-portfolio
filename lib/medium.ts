export interface MediumArticle {
  title: string;
  url: string;
  publishedAt: string;
  readTime: string;
  snippet: string;
  tags: string[];
}

interface MediumFeedItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  categories?: string[];
}

export const FEATURED_MEDIUM_ARTICLE: MediumArticle = {
  title: "Production Learnings on Load Testing Methodology & 70x Throughput Scaling",
  url: "https://medium.com/@sahilmishra1408",
  publishedAt: "Featured Writing",
  readTime: "6 min read",
  snippet: "In-depth case study on load testing 4 core microservices with k6, identifying thread pool bottlenecks, optimizing database queries, and scaling throughput from 34 TPS to 2,400 TPS in production.",
  tags: ["Performance Engineering", "k6", "Java Microservices", "Distributed Systems"]
};

/**
 * Utility function to safely fetch latest Medium posts via RSS feed JSON proxy or fallback.
 * Keeps external network calls completely isolated inside this file.
 */
export async function getLatestMediumArticles(username: string = "sahilmishra1408"): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch RSS feed");
    
    const data = await res.json();
    if (data.status !== "ok" || !data.items) {
      return [FEATURED_MEDIUM_ARTICLE];
    }

    return data.items.map((item: MediumFeedItem) => {
      const cleanSnippet = item.description ? item.description.replace(/<[^>]*>?/gm, "").substring(0, 160) + "..." : item.title;
      return {
        title: item.title,
        url: item.link,
        publishedAt: new Date(item.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readTime: "5 min read",
        snippet: cleanSnippet,
        tags: item.categories || ["Engineering", "Backend", "Tech"]
      };
    });
  } catch {
    return [FEATURED_MEDIUM_ARTICLE];
  }
}
