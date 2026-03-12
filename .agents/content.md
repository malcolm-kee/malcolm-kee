# Content

Content collections are defined in `apps/v2/src/content.config.ts`, content lives in `apps/v2/src/content/`:

- **`blog/`** — Long-form articles (`.md`/`.mdx`) with `title`, `pubDate`, `topics`, `draft`, `lang` fields
- **`note/`** — Structured learning notes, may contain nested directories
- **`today-i-learnt/`** — Short TIL posts
- **`workshop/`** — Course/workshop material with `section` and `order` fields

## MDX features

Configured in `astro.config.ts`:

- Code blocks support Twoslash type annotations and custom walkthrough syntax
- `// [!code highlight]` and similar Shiki annotations are supported
- Code files can be imported via custom remark transformer
- External images are enhanced via Cloudinary rehype plugin
