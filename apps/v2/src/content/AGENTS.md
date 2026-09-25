# Content Collections

Content collections are defined in `apps/v2/src/content.config.ts`. All collections support `.md` and `.mdx` files.

Dates use the format `"D MMM YYYY"` (e.g., "26 Mar 2020") and are transformed to `Date` objects via Zod.

Topics are defined in `apps/v2/src/data/topic-types.ts`. Available values: `module-federation`, `react`, `css`, `typescript`, `javascript`, `frontend-tooling`, `life`, `software-engineering`.

## Blog (`blog/`)

Long-form articles. Routed at `/blog/[slug]/`.

**File naming:** kebab-case, e.g., `automating-refactoring-with-codemod.mdx`

**Frontmatter:**

| Field               | Type                     | Required | Notes                                            |
| ------------------- | ------------------------ | -------- | ------------------------------------------------ |
| `title`             | string                   | yes      |                                                  |
| `pubDate`           | string                   | yes      | Format: `"D MMM YYYY"`                           |
| `updatedDate`       | string                   | no       | Preferred over `pubDate` for sorting             |
| `description`       | string                   | no       |                                                  |
| `lang`              | `'zh-Hans'` \| `'en-US'` | no       | Defaults to `en-US`                              |
| `heroImagePublicId` | string                   | no       | Cloudinary public ID                             |
| `alt`               | string                   | no       | Alt text for hero image                          |
| `preview`           | boolean                  | no       | Creates page but hides from listings             |
| `draft`             | boolean                  | no       | Included in dev, excluded from production builds |
| `topics`            | Topic[]                  | no       |                                                  |

**Filtering:** Posts with `draft: true` are included in dev but excluded from production builds. Posts with `preview: true` or future `pubDate` are unlisted but accessible. Related content suggestions prefer same language.

**Helpers:** `getBlogs()` in `apps/v2/src/data/blog-helpers.ts`

## Note (`note/`)

Learning notes. Routed at `/note/[slug]/`.

**File naming:** kebab-case. May contain nested directories prefixed with underscore (e.g., `_crafting_interpreters/`) for supplementary source files.

**Frontmatter:**

| Field         | Type    | Required | Notes                                |
| ------------- | ------- | -------- | ------------------------------------ |
| `title`       | string  | yes      |                                      |
| `pubDate`     | string  | yes      | Format: `"D MMM YYYY"`               |
| `updatedDate` | string  | no       |                                      |
| `description` | string  | no       |                                      |
| `topics`      | Topic[] | no       |                                      |
| `preview`     | boolean | no       | Creates page but hides from listings |

**Helpers:** `getNotes()` in `apps/v2/src/data/note-helpers.ts`

## Today I Learnt (`today-i-learnt/`)

Short TIL posts. Routed at `/today-i-learnt/[slug]/`.

**File naming:** kebab-case, e.g., `bookmarklet.mdx`

**Frontmatter:**

| Field            | Type    | Required | Notes                                |
| ---------------- | ------- | -------- | ------------------------------------ |
| `title`          | string  | yes      |                                      |
| `pubDate`        | string  | yes      | Format: `"D MMM YYYY"`               |
| `updatedDate`    | string  | no       |                                      |
| `topics`         | Topic[] | **yes**  | Must have at least one               |
| `preview`        | boolean | no       | Creates page but hides from listings |
| `youtubeVideoId` | string  | no       | Embeds YouTube video at top of page  |

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

| Field         | Type   | Required | Notes                                      |
| ------------- | ------ | -------- | ------------------------------------------ |
| `title`       | string | yes      |                                            |
| `description` | string | no       |                                            |
| `section`     | string | no       | Groups lessons in table of contents        |
| `order`       | number | no       | Overrides filename ordering within section |

**Workshop metadata** (display name, theme, icon) is defined in `apps/v2/src/data/workshop-data.ts`. Each lesson gets auto-generated previous/next navigation.

**Helpers:** `groupWorkshopLessons()` and `getWorkshops()` in `apps/v2/src/data/workshop-helpers.ts`

## MDX Features

- **Twoslash:** Add `twoslash` after the language in a TypeScript code fence for inline type annotations
- **Code highlighting:** `[!code highlight]` and `[!code highlight:N]` via Shiki transformers
- **Code import:** Custom remark transformer for importing external code files
- **Cloudinary:** External images auto-enhanced via rehype plugin
- **Custom components:** Import directly in MDX. See the component guide below.

## Components in MDX

Imports belong immediately after the frontmatter. Prefer the `@app/components/...` alias rather than a relative path. Use Astro components (`.astro`) without a client directive; they declare any hydrated children internally. React components render static HTML unless the component itself needs browser state; add an Astro client directive such as `client:load` only to those interactive React components.

### `LiveEditor`

Turns one or more fenced code blocks into a runnable Sandpack editor. Initially the reader sees the normal highlighted code; the play button opens the editor, preview, and console.

````mdx
import LiveEditor from '@app/components/LiveEditor.astro';

<LiveEditor previewMinHeight="20rem" codeMaxHeight="40rem">

```tsx
import { createRoot } from 'react-dom/client';

function App() {
  return <button>Hello</button>;
}

createRoot(document.getElementById('root')!).render(<App />);
```

</LiveEditor>
````

Supported fence languages are `js`, `jsx`, `ts`, `tsx`, `html`, and `css`. A CSS block becomes `styles.css` and is automatically imported by the JavaScript or TypeScript entry module. For vanilla JavaScript or TypeScript, an accompanying HTML block becomes the entry document. Although an HTML block can appear beside JSX or TSX as a separate Sandpack file, the current React sandbox does not reliably apply its custom `<head>` content to the preview; use a CSS block for React demo styles instead. Multiple JavaScript/TypeScript blocks are concatenated, so normally use one code block for them. Package imports are detected and installed in the sandbox automatically. To pin a package version, add a comment anywhere in the code block:

```ts
import React from 'react'; // @version: react@19.1.0
```

`LiveEditor` props:

| Prop               | Type                        | Default             | Effect                                                                   |
| ------------------ | --------------------------- | ------------------- | ------------------------------------------------------------------------ |
| `previewMinHeight` | string                      | `auto`              | CSS minimum height of the rendered preview                               |
| `codeMaxHeight`    | string                      | unset               | CSS maximum height of the source/editor area                             |
| `autoPlay`         | boolean                     | `false`             | Opens and runs the editor when at least half of it enters the viewport   |
| `readOnly`         | boolean                     | `false`             | Runs the example without allowing source edits                           |
| `fullBleed`        | boolean \| `'when-preview'` | value of `autoPlay` | Extends beyond the prose column always, or only while the editor is open |

Use `readOnly autoPlay` for a demo and the default settings for an exercise. Standard Shiki annotations such as `[!code highlight]` still work. Do not put `twoslash` diagnostics in code that must execute unless the transformed output is known to be valid; the editor does not explicitly handle Twoslash markup.

### `Aside`

Displays supporting information. By default it moves into the right margin on very wide screens; `static` keeps it in the article flow. `heading` and `className` are optional.

```mdx
import Aside from '@app/components/Aside';

<Aside heading="Why this matters" static>
  Supporting Markdown, links, and other MDX can go here.
</Aside>
```

### `Exercise`

Wraps hand-authored workshop instructions in a visually distinct section. The declared API requires `title`; provide one even though older content sometimes omits it.

```mdx
import Exercise from '@app/components/Exercise';

<Exercise title="Do It: Add validation">

1. Add the validation rule.
2. Verify the error state.

</Exercise>
```

This is only a presentation wrapper. For executable exercises backed by question, test, and solution files, use `CodingExercises`.

### `Figure`

Adds a centered caption to an image. For a remote image, pass `src`; for a local image, prefer Astro's optimized `Image` as a child.

```mdx
import { Image } from 'astro:assets';
import Figure from '@app/components/Figure';
import diagram from './_article/diagram.png';

<Figure caption="Request lifecycle">
  <Image src={diagram} alt="Request lifecycle" />
</Figure>
```

For a remote image:

```mdx
<Figure src="https://example.com/diagram.png" caption="Request lifecycle" />
```

`caption` is required and is also the default `alt` text when `Figure` renders the `<img>` itself. It accepts normal `<figure>` props, including `className`. The TypeScript interface currently marks `src` as required even when children are supplied, although existing MDX uses the child form shown above.

### `CodeWalkthrough`

Reveals a JavaScript or TypeScript example section by section. It supports `js`, `jsx`, `ts`, and `tsx`; wrap exactly one fenced block. A line containing `//=====` starts the next reveal, and a `//<-` comment becomes an explanatory annotation.

````mdx
import CodeWalkthrough from '@app/components/CodeWalkthrough.astro';

<CodeWalkthrough showMoreLabel="Next step">

```ts
const controller = new AbortController();

//=====

const signal = controller.signal; //<- Read the cancellation state here
```

</CodeWalkthrough>
````

`showMoreLabel` defaults to `Show More`. The component also provides a `Show All` action.

### `CodingExercises`

Loads a group of executable workshop exercises from `apps/v2/src/exercise/` and offers all-at-once and step-by-step modes.

```mdx
import CodingExercises from '@app/components/CodingExercises.astro';

<CodingExercises moduleName="becoming-js-data-wrangler" group="for-loop/filtering" />
```

The props map to `src/exercise/<moduleName>/<group>/`. Each numbered exercise needs matching files with one shared extension:

```text
01.js
01.solution.js
01.test.js
```

TypeScript and JSX/TSX are supported as long as all three files match. The main file's default-exported function JSDoc becomes the exercise description. Tests should fail against the starter and pass against the solution. See `apps/v2/src/exercise/README.md` for the full file convention.

### `ShapedFloat`

Floats an image while making surrounding text follow the image's transparent outline. Its direct child must be an `<img>` (Astro's `Image` renders one).

```mdx
import { Image } from 'astro:assets';
import { ShapedFloat } from '@app/components/ShapedFloat';
import illustration from './_article/illustration.png';

<ShapedFloat float="right" shapeSrc={illustration.src} shapeMargin="24px">
  <Image src={illustration} alt="Description" />
</ShapedFloat>
```

`float` is required (`left` or `right`), as is `shapeSrc`. `shapeMargin` defaults to `6px`, and `shapeThreshold` defaults to `0.01`. Other `<div>` props are forwarded.

## Cross-Collection Features

- **Topic pages** at `/topic/[topic]/` aggregate blogs and TILs by topic
- **Related content** suggestions on blog and TIL pages (3 related items by shared topics)
- All collections contribute a `displayedTopics` computed field mapping topic values to human-readable labels
