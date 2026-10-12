import type { Metadata } from "next";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Blogs | Sahil Mishra",
  description: "Notes from production by Sahil Mishra.",
};

export default function MyBlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E4E7EB]">
      <main className="flex-1">
        <BlogSection />
      </main>
      <Footer pinned />
    </div>
  );
}
