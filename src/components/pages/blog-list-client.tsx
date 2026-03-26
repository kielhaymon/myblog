"use client"

import { Shell } from "@/components/shell"
import { useRouter } from "next/navigation"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

interface PostSummary {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

function PostCard({ post }: { post: PostSummary }) {
  const theme = useTheme()

  return (
    <box
      borderStyle="rounded"
      borderColor={theme.border}
      padding={1}
      flexDirection="column"
    >
      <text>
        <span style={textStyle({ fg: theme.primary, bold: true })}>
          {post.title}
        </span>
        <span style={textStyle({ fg: theme.muted, dim: true })}>
          {"  "}{post.date}
        </span>
      </text>
      {post.summary && (
        <text style={textStyle({ fg: theme.foreground })}>{post.summary}</text>
      )}
      {post.tags.length > 0 && (
        <text style={textStyle({ fg: theme.accent, dim: true })}>
          {post.tags.map((t) => `#${t}`).join(" ")}
        </text>
      )}
    </box>
  )
}

export default function BlogListClient({ posts }: { posts: PostSummary[] }) {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Shell activePage="blog">
      <box flexDirection="column" gap={1}>
        <text style={textStyle({ fg: theme.primary, bold: true })}>
          ~/blog
        </text>
        {posts.length === 0 ? (
          <text style={textStyle({ fg: theme.muted })}>
            No posts yet. Check back soon.
          </text>
        ) : (
          posts.map((post) => (
            <box
              key={post.slug}
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              <PostCard post={post} />
            </box>
          ))
        )}
      </box>
    </Shell>
  )
}
