# Content Collections

Content collections are defined in `apps/v2/src/content.config.ts`. All collections support `.md` and `.mdx` files.

Dates use the format `"D MMM YYYY"` (e.g., "26 Mar 2020") and are transformed to `Date` objects via Zod.

Topics are defined in `apps/v2/src/data/topic-types.ts`. Available values: `module-federation`, `react`, `css`, `typescript`, `javascript`, `frontend-tooling`, `life`, `software-engineering`.

## Blog (`blog/`)

Long-form articles. Routed at `/blog/[slug]/`.

**File naming:** kebab-case, e.g., `automating-refactoring-with-codemod.mdx`

**Frontmatter:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `pubDate` | string | yes | Format: `"D MMM YYYY"` |
| `updatedDate` | string | no | Preferred over `pubDate` for sorting |
| `description` | string | no | |
| `lang` | `'zh-Hans'` \| `'en-US'` | no | Defaults to `en-US` |
| `heroImagePublicId` | string | no | Cloudinary public ID |
| `alt` | string | no | Alt text for hero image |
| `preview` | boolean | no | Creates page but hides from listings |
| `draft` | boolean | no | Included in dev, excluded from production builds |
| `topics` | Topic[] | no | |

**Filtering:** Posts with `draft: true` are included in dev but excluded from production builds. Posts with `preview: true` or future `pubDate` are unlisted but accessible. Related content suggestions prefer same language.

**Helpers:** `getBlogs()` in `apps/v2/src/data/blog-helpers.ts`

## Note (`note/`)

Learning notes. Routed at `/note/[slug]/`.

**File naming:** kebab-case. May contain nested directories prefixed with underscore (e.g., `_crafting_interpreters/`) for supplementary source files.

**Frontmatter:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `pubDate` | string | yes | Format: `"D MMM YYYY"` |
| `updatedDate` | string | no | |
| `description` | string | no | |
| `topics` | Topic[] | no | |
| `preview` | boolean | no | Creates page but hides from listings |

**Helpers:** `getNotes()` in `apps/v2/src/data/note-helpers.ts`

## Today I Learnt (`today-i-learnt/`)

Short TIL posts. Routed at `/today-i-learnt/[slug]/`.

**File naming:** kebab-case, e.g., `bookmarklet.mdx`

**Frontmatter:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `pubDate` | string | yes | Format: `"D MMM YYYY"` |
| `updatedDate` | string | no | |
| `topics` | Topic[] | **yes** | Must have at least one |
| `preview` | boolean | no | Creates page but hides from listings |
| `youtubeVideoId` | string | no | Embeds YouTube video at top of page |

**Filtering:** Automatically preview if `pubDate` is in the future.

**Helpers:** `getTils()` in `apps/v2/src/data/til-helpers.ts`

## Workshop (`workshop/`)

Structured course material. Routed at `/[workshop-slug]/[lesson-slug]/` (top-level, no `/workshop/` prefix in URL).

**Directory structure:**

```
workshop/
└── workshop-slug/
    ├── 01-section-name/
    │   ├── lesson-slug.mdx
    │   └── another-lesson.mdx
    └── 02-another-section/
        └── lesson.mdx
```

Numeric prefixes in directory names (`01-`, `02-`) control sort order (collated with `Intl.Collator` numeric mode).

**Frontmatter:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `description` | string | no | |
| `section` | string | no | Groups lessons in table of contents |
| `order` | number | no | Overrides filename ordering within section |

**Workshop metadata** (display name, theme, icon) is defined in `apps/v2/src/data/workshop-data.ts`. Each lesson gets auto-generated previous/next navigation.

**Helpers:** `groupWorkshopLessons()` and `getWorkshops()` in `apps/v2/src/data/workshop-helpers.ts`

## MDX Features

- **Twoslash:** `` ```ts twoslash `` for inline type annotations
- **Code highlighting:** `[!code highlight]` and `[!code highlight:N]` via Shiki transformers
- **Code import:** Custom remark transformer for importing external code files
- **Cloudinary:** External images auto-enhanced via rehype plugin
- **Custom components:** Import directly in MDX — `Exercise`, `Aside`, `Figure`

## Cross-Collection Features

- **Topic pages** at `/topic/[topic]/` aggregate blogs and TILs by topic
- **Related content** suggestions on blog and TIL pages (3 related items by shared topics)
- All collections contribute a `displayedTopics` computed field mapping topic values to human-readable labels
