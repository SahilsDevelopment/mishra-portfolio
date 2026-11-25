"use client";

import { useEffect, useState } from "react";
import { mediumCard, site } from "@/lib/content";
import { FEATURED_MEDIUM_ARTICLE, getLatestMediumArticles, type MediumArticle } from "@/lib/medium";
import { Row } from "./Row";

const MAX_ARTICLES = 5;

export function WritingList() {
  const [articles, setArticles] = useState<MediumArticle[]>([FEATURED_MEDIUM_ARTICLE]);

  useEffect(() => {
    let cancelled = false;
    getLatestMediumArticles()
      .then((fetched) => {
        if (!cancelled && fetched.length > 0) setArticles(fetched);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {articles.slice(0, MAX_ARTICLES).map((a) => (
        <Row
          key={a.url}
          title={a.title}
          href={a.url}
          summary={a.snippet}
          meta={`${a.publishedAt} · ${a.readTime}`}
          variant="paper"
        />
      ))}
      <Row
        title={mediumCard.allPosts.title}
        href={site.links.medium}
        summary={mediumCard.allPosts.summary}
        variant="paper"
      />
    </>
  );
}
