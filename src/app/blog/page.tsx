import { getAllPosts } from "@/lib/blog"
import BlogListClient from "@/components/pages/blog-list-client"
import { SeoFallback } from "@/components/seo-fallback"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts about software engineering, productivity, and things I'm building.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <SeoFallback>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <strong>{post.title}</strong> — {post.date}
              </a>
              <p>{post.summary}</p>
            </li>
          ))}
        </ul>
      </SeoFallback>
      <BlogListClient
        posts={posts.map(({ slug, title, date, summary, tags }) => ({
          slug,
          title,
          date,
          summary,
          tags,
        }))}
      />
    </>
  )
}
