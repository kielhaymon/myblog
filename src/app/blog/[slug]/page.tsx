import { getAllPosts, getPostBySlug } from "@/lib/blog"
import BlogPostClient from "@/components/pages/blog-post-client"
import { SeoFallback } from "@/components/seo-fallback"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`)
  if (!fs.existsSync(filePath)) return { title: "Not Found" }

  const post = getPostBySlug(slug)
  return {
    title: post.title,
    description: post.summary || `${post.title} — a blog post on kiel.codes`,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`)
  if (!fs.existsSync(filePath)) notFound()

  const post = getPostBySlug(slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.summary,
    author: {
      "@type": "Person",
      name: "Kiel Haymon",
      url: "https://kiel.codes",
    },
  }

  return (
    <>
      <SeoFallback>
        <article>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{post.date}</time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </SeoFallback>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        title={post.title}
        date={post.date}
        content={post.content}
        tags={post.tags}
      />
    </>
  )
}
