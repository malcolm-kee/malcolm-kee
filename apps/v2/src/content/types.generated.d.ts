declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"note": {
"bash-and-linux.md": {
  id: "bash-and-linux.md",
  slug: "bash-and-linux",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
"docker-swarm.md": {
  id: "docker-swarm.md",
  slug: "docker-swarm",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
"mongodb.md": {
  id: "mongodb.md",
  slug: "mongodb",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
"rabbitmq.md": {
  id: "rabbitmq.md",
  slug: "rabbitmq",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
"react-fundamentals.md": {
  id: "react-fundamentals.md",
  slug: "react-fundamentals",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
"webpack-federation.md": {
  id: "webpack-federation.md",
  slug: "webpack-federation",
  body: string,
  collection: "note",
  data: InferEntrySchema<"note">
},
},
"workshop": {
"intro-to-react-js-v2/01-introduction/introduction.mdx": {
  id: "intro-to-react-js-v2/01-introduction/introduction.mdx",
  slug: "intro-to-react-js-v2/01-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/02-vanilla-react/vanilla-react.mdx": {
  id: "intro-to-react-js-v2/02-vanilla-react/vanilla-react.mdx",
  slug: "intro-to-react-js-v2/02-vanilla-react/vanilla-react",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/03-create-react-project/create-react-project.mdx": {
  id: "intro-to-react-js-v2/03-create-react-project/create-react-project.mdx",
  slug: "intro-to-react-js-v2/03-create-react-project/create-react-project",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/04-modern-frontend/modern-frontend.mdx": {
  id: "intro-to-react-js-v2/04-modern-frontend/modern-frontend.mdx",
  slug: "intro-to-react-js-v2/04-modern-frontend/modern-frontend",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/05-components-and-props/components-and-props.mdx": {
  id: "intro-to-react-js-v2/05-components-and-props/components-and-props.mdx",
  slug: "intro-to-react-js-v2/05-components-and-props/components-and-props",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/06-hooks/hooks.mdx": {
  id: "intro-to-react-js-v2/06-hooks/hooks.mdx",
  slug: "intro-to-react-js-v2/06-hooks/hooks",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/07-form-in-react/form-in-react.mdx": {
  id: "intro-to-react-js-v2/07-form-in-react/form-in-react.mdx",
  slug: "intro-to-react-js-v2/07-form-in-react/form-in-react",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/08-lifting-state-up/lifting-state-up.mdx": {
  id: "intro-to-react-js-v2/08-lifting-state-up/lifting-state-up.mdx",
  slug: "intro-to-react-js-v2/08-lifting-state-up/lifting-state-up",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/09-react-testing/react-testing.mdx": {
  id: "intro-to-react-js-v2/09-react-testing/react-testing.mdx",
  slug: "intro-to-react-js-v2/09-react-testing/react-testing",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/10-code-splitting/code-splitting.mdx": {
  id: "intro-to-react-js-v2/10-code-splitting/code-splitting.mdx",
  slug: "intro-to-react-js-v2/10-code-splitting/code-splitting",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/11-searching/searching.mdx": {
  id: "intro-to-react-js-v2/11-searching/searching.mdx",
  slug: "intro-to-react-js-v2/11-searching/searching",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js-v2/12-conclusion/conclusion.mdx": {
  id: "intro-to-react-js-v2/12-conclusion/conclusion.mdx",
  slug: "intro-to-react-js-v2/12-conclusion/conclusion",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/01-introduction/introduction.mdx": {
  id: "intro-to-react-js/01-introduction/introduction.mdx",
  slug: "intro-to-react-js/01-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/02-vanilla-react/vanilla-react.mdx": {
  id: "intro-to-react-js/02-vanilla-react/vanilla-react.mdx",
  slug: "intro-to-react-js/02-vanilla-react/vanilla-react",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/03-react-tooling-part1/react-tooling-part1.mdx": {
  id: "intro-to-react-js/03-react-tooling-part1/react-tooling-part1.mdx",
  slug: "intro-to-react-js/03-react-tooling-part1/react-tooling-part1",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/04-react-tooling-part2/react-tooling-part2.mdx": {
  id: "intro-to-react-js/04-react-tooling-part2/react-tooling-part2.mdx",
  slug: "intro-to-react-js/04-react-tooling-part2/react-tooling-part2",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/05-react-core/react-core.mdx": {
  id: "intro-to-react-js/05-react-core/react-core.mdx",
  slug: "intro-to-react-js/05-react-core/react-core",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/06-react-testing/react-testing.mdx": {
  id: "intro-to-react-js/06-react-testing/react-testing.mdx",
  slug: "intro-to-react-js/06-react-testing/react-testing",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/07-code-splitting/code-splitting.mdx": {
  id: "intro-to-react-js/07-code-splitting/code-splitting.mdx",
  slug: "intro-to-react-js/07-code-splitting/code-splitting",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/08-conclusion/conclusion.mdx": {
  id: "intro-to-react-js/08-conclusion/conclusion.mdx",
  slug: "intro-to-react-js/08-conclusion/conclusion",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/09-appendix-searching/searching.mdx": {
  id: "intro-to-react-js/09-appendix-searching/searching.mdx",
  slug: "intro-to-react-js/09-appendix-searching/searching",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"intro-to-react-js/10-appendix-form/form.mdx": {
  id: "intro-to-react-js/10-appendix-form/form.mdx",
  slug: "intro-to-react-js/10-appendix-form/form",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
},

	};

	type ContentConfig = typeof import("./config");
}
