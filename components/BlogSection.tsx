"use client";

import { useEffect, useState } from "react";
import { getLatestMediumArticles, MediumArticle, FEATURED_MEDIUM_ARTICLE } from "@/lib/medium";
import { BookOpen, ExternalLink, ArrowRight, Clock } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export function BlogSection() {
  const [articles, setArticles] = useState<MediumArticle[]>([FEATURED_MEDIUM_ARTICLE]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const fetched = await getLatestMediumArticles();
        if (fetched && fetched.length > 0) {
          setArticles(fetched);
        }
      } catch (err) {
        console.error("Error loading articles:", err);
      }
    }
    loadArticles();
  }, []);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-custom mb-2 block">
          Technical Writing
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
          Blogs & Production Insights
        </h2>
        <p className="text-muted-custom mt-2 text-sm sm:text-base">
          Sharing real-world engineering learnings on performance profiling, microservices benchmarking, and backend architecture.
        </p>
      </div>

      {/* Featured Articles Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-accent-custom/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-accent-custom flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Medium Article</span>
                </span>
                <span className="text-xs text-muted-custom flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-main-custom group-hover:text-accent-custom transition-colors mb-3 leading-snug">
                {article.title}
              </h3>

              <p className="text-muted-custom text-sm leading-relaxed mb-6">
                {article.snippet}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-pill px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-custom"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-xs font-bold text-accent-custom group-hover:translate-x-1.5 transition-transform gap-1.5">
                <span>Read Full Article on Medium</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* View Profile CTA */}
      <div className="text-center">
        <a
          href={PERSONAL_INFO.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 glass-pill px-6 py-3 rounded-full text-sm font-semibold hover:border-accent-custom transition-all"
        >
          <span>Explore All Articles on Medium (@sahilmishra1408)</span>
          <ExternalLink className="w-4 h-4 text-accent-custom" />
        </a>
      </div>
    </div>
  );
}
