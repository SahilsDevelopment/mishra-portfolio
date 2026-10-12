"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Search, SearchX, X } from "lucide-react";
import { FEATURED_MEDIUM_ARTICLE, getLatestMediumArticles, type MediumArticle } from "@/lib/medium";
import { MediumIcon } from "@/components/SocialIcons";

const PAGE_SIZE = 8;

function matches(article: MediumArticle, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [article.title, article.snippet, article.publishedAt, ...article.tags].join(" ").toLowerCase().includes(needle);
}

export function BlogSection() {
  const [articles, setArticles] = useState<MediumArticle[]>([FEATURED_MEDIUM_ARTICLE]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

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

  const results = useMemo(() => articles.filter((article) => matches(article, query)), [articles, query]);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <section className="px-6 pt-24 pb-20 max-w-[90rem] mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#06141B]">Notes from production</h1>
        <p className="mt-3 text-[#4A5C6A] text-base sm:text-lg leading-relaxed">
          Write-ups on load, latency, and the systems that carry them.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto mb-14">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <div className="neo-inset flex items-center gap-3 pl-5 pr-2 py-2 rounded-full">
          <Search className="w-5 h-5 text-[#4A5C6A] shrink-0" />
          <input
            id="blog-search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search articles, topics, tools..."
            className="flex-1 min-w-0 bg-transparent py-2.5 text-base text-[#06141B] placeholder:text-[#9BABA8] outline-none"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={() => updateQuery("")}
                aria-label="Clear search"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="neo-button shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[#253745] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="neo max-w-md mx-auto px-8 py-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -6, 0], y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
              className="neo-button mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-[#4A5C6A]"
            >
              <SearchX className="w-7 h-7" />
            </motion.div>
            <h2 className="mt-6 text-xl font-bold text-[#06141B]">No search results found</h2>
            <p className="mt-2 text-sm text-[#4A5C6A]">
              Nothing matches &ldquo;{query}&rdquo;. Try a title, a topic, or a tool.
            </p>
            <button
              type="button"
              onClick={() => updateQuery("")}
              className="neo-dark mt-6 rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${currentPage}-${query}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-7"
          >
            {visible.map((article, index) => (
              <motion.article
                key={article.url}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="neo flex w-full flex-col p-6 sm:w-[calc((100%-1.75rem)/2)] xl:w-[calc((100%-5.25rem)/4)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="neo-button w-12 h-12 rounded-2xl flex items-center justify-center text-[#11212D]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#4A5C6A] text-right">
                    {article.publishedAt}
                    <span className="block mt-1 normal-case tracking-normal">{article.readTime}</span>
                  </p>
                </div>
                <h2 className="mt-5 text-lg font-bold tracking-tight text-[#06141B] leading-snug">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4A5C6A] line-clamp-3 flex-1">{article.snippet}</p>
                {article.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <li key={tag} className="neo-inset rounded-full px-3 py-1 text-[11px] font-semibold text-[#253745]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-dark mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold"
                >
                  <MediumIcon className="w-4 h-4" />
                  Read Full Article
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {results.length > 0 && (
        <nav aria-label="Article pages" className="mt-10 flex justify-center">
          <div className="neo flex items-center gap-2 rounded-[22px] p-2">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#4A5C6A] disabled:opacity-35 enabled:hover:text-[#06141B] cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-current={number === currentPage ? "page" : undefined}
                className={`w-11 h-11 rounded-xl text-sm font-bold cursor-pointer ${
                  number === currentPage ? "neo-dark" : "neo-inset text-[#4A5C6A] hover:text-[#06141B]"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-[#4A5C6A] disabled:opacity-35 enabled:hover:text-[#06141B] cursor-pointer disabled:cursor-default"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}
