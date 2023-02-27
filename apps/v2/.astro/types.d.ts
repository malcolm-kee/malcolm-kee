declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"a-chapter-a-day.md": {
  id: "a-chapter-a-day.md",
  slug: "a-chapter-a-day",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"a-plugin-based-frontend-with-module-federation.mdx": {
  id: "a-plugin-based-frontend-with-module-federation.mdx",
  slug: "a-plugin-based-frontend-with-module-federation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"accessible-file-input.md": {
  id: "accessible-file-input.md",
  slug: "accessible-file-input",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"adding-types-for-npm-packages.md": {
  id: "adding-types-for-npm-packages.md",
  slug: "adding-types-for-npm-packages",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"attitude-to-competency.md": {
  id: "attitude-to-competency.md",
  slug: "attitude-to-competency",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"automating-refactoring-with-codemod.mdx": {
  id: "automating-refactoring-with-codemod.mdx",
  slug: "automating-refactoring-with-codemod",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"be-human-while-you-code.mdx": {
  id: "be-human-while-you-code.mdx",
  slug: "be-human-while-you-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"comfort-zone.mdx": {
  id: "comfort-zone.mdx",
  slug: "comfort-zone",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"empathize-with-backend.md": {
  id: "empathize-with-backend.md",
  slug: "empathize-with-backend",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"flutter-for-react-developers.mdx": {
  id: "flutter-for-react-developers.mdx",
  slug: "flutter-for-react-developers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"gatsby-non-js-fallback.mdx": {
  id: "gatsby-non-js-fallback.mdx",
  slug: "gatsby-non-js-fallback",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"getting-things-done.mdx": {
  id: "getting-things-done.mdx",
  slug: "getting-things-done",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hackathon.mdx": {
  id: "hackathon.mdx",
  slug: "hackathon",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-does-that-scale.mdx": {
  id: "how-does-that-scale.mdx",
  slug: "how-does-that-scale",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-bargain.md": {
  id: "how-to-bargain.md",
  slug: "how-to-bargain",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-become-a-racist.md": {
  id: "how-to-become-a-racist.md",
  slug: "how-to-become-a-racist",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-create-cv-using-html.mdx": {
  id: "how-to-create-cv-using-html.mdx",
  slug: "how-to-create-cv-using-html",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-get-a-job-you-love.mdx": {
  id: "how-to-get-a-job-you-love.mdx",
  slug: "how-to-get-a-job-you-love",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-keep-creating.mdx": {
  id: "how-to-keep-creating.mdx",
  slug: "how-to-keep-creating",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"how-to-not-lend-money.md": {
  id: "how-to-not-lend-money.md",
  slug: "how-to-not-lend-money",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"improve-yourself.md": {
  id: "improve-yourself.md",
  slug: "improve-yourself",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"interview-as-a-learning-tool.md": {
  id: "interview-as-a-learning-tool.md",
  slug: "interview-as-a-learning-tool",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"live-streaming.mdx": {
  id: "live-streaming.mdx",
  slug: "live-streaming",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"migrating-large-angular-apps-to-react.mdx": {
  id: "migrating-large-angular-apps-to-react.mdx",
  slug: "migrating-large-angular-apps-to-react",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"msia-ssm-change-monitor.md": {
  id: "msia-ssm-change-monitor.md",
  slug: "msia-ssm-change-monitor",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"my-first-meetup.md": {
  id: "my-first-meetup.md",
  slug: "my-first-meetup",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"my-first-tech-talk.md": {
  id: "my-first-tech-talk.md",
  slug: "my-first-tech-talk",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"next-js-impression.md": {
  id: "next-js-impression.md",
  slug: "next-js-impression",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"no-perfect-time.mdx": {
  id: "no-perfect-time.mdx",
  slug: "no-perfect-time",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"notes-on-readings.mdx": {
  id: "notes-on-readings.mdx",
  slug: "notes-on-readings",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"on-expanding-purpose.mdx": {
  id: "on-expanding-purpose.mdx",
  slug: "on-expanding-purpose",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"on-giving.mdx": {
  id: "on-giving.mdx",
  slug: "on-giving",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"on-running.mdx": {
  id: "on-running.mdx",
  slug: "on-running",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"optimize-later.mdx": {
  id: "optimize-later.mdx",
  slug: "optimize-later",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"portal-to-subtree.mdx": {
  id: "portal-to-subtree.mdx",
  slug: "portal-to-subtree",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"react-container-presenter-pattern-revisited.mdx": {
  id: "react-container-presenter-pattern-revisited.mdx",
  slug: "react-container-presenter-pattern-revisited",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"react-container-presenter-pattern.md": {
  id: "react-container-presenter-pattern.md",
  slug: "react-container-presenter-pattern",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"react-typescript-introduction.md": {
  id: "react-typescript-introduction.md",
  slug: "react-typescript-introduction",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"redbean.md": {
  id: "redbean.md",
  slug: "redbean",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"reduce-redux-connect-typescript-boilerplate.md": {
  id: "reduce-redux-connect-typescript-boilerplate.md",
  slug: "reduce-redux-connect-typescript-boilerplate",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"sass-equivalent-for-react-children.md": {
  id: "sass-equivalent-for-react-children.md",
  slug: "sass-equivalent-for-react-children",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"self-doubt.mdx": {
  id: "self-doubt.mdx",
  slug: "self-doubt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"simple-event-bus.md": {
  id: "simple-event-bus.md",
  slug: "simple-event-bus",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"starting-a-new-blog-again.mdx": {
  id: "starting-a-new-blog-again.mdx",
  slug: "starting-a-new-blog-again",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"superstition.md": {
  id: "superstition.md",
  slug: "superstition",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"the-coin.mdx": {
  id: "the-coin.mdx",
  slug: "the-coin",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"thoughts-on-testing.md": {
  id: "thoughts-on-testing.md",
  slug: "thoughts-on-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tips-for-newbie-programmer.mdx": {
  id: "tips-for-newbie-programmer.mdx",
  slug: "tips-for-newbie-programmer",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"trying-playwright.md": {
  id: "trying-playwright.md",
  slug: "trying-playwright",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"typesafe-call-all.mdx": {
  id: "typesafe-call-all.mdx",
  slug: "typesafe-call-all",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"typescript-type-guard.md": {
  id: "typescript-type-guard.md",
  slug: "typescript-type-guard",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"upstream.mdx": {
  id: "upstream.mdx",
  slug: "upstream",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"use-transient-state.mdx": {
  id: "use-transient-state.mdx",
  slug: "use-transient-state",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"using-tailwindcss-with-module-federation.mdx": {
  id: "using-tailwindcss-with-module-federation.mdx",
  slug: "using-tailwindcss-with-module-federation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"using-typescript-with-module-federation.mdx": {
  id: "using-typescript-with-module-federation.mdx",
  slug: "using-typescript-with-module-federation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"using-webcomponent-with-react.md": {
  id: "using-webcomponent-with-react.md",
  slug: "using-webcomponent-with-react",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"what-is-redux.md": {
  id: "what-is-redux.md",
  slug: "what-is-redux",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
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
"fsm-and-statechart.mdx": {
  id: "fsm-and-statechart.mdx",
  slug: "fsm-and-statechart",
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
"today-i-learnt": {
"ambient-means-no-implementation.md": {
  id: "ambient-means-no-implementation.md",
  slug: "ambient-means-no-implementation",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"bookmarklet.mdx": {
  id: "bookmarklet.mdx",
  slug: "bookmarklet",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"eval-safely.mdx": {
  id: "eval-safely.mdx",
  slug: "eval-safely",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"extending-global-or-third-party-type.mdx": {
  id: "extending-global-or-third-party-type.mdx",
  slug: "extending-global-or-third-party-type",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"input-as-flex-item.md": {
  id: "input-as-flex-item.md",
  slug: "input-as-flex-item",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"jest-mock-in-typescript.md": {
  id: "jest-mock-in-typescript.md",
  slug: "jest-mock-in-typescript",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"no-way-to-type-as-props-properly-in-ts-today.md": {
  id: "no-way-to-type-as-props-properly-in-ts-today.md",
  slug: "no-way-to-type-as-props-properly-in-ts-today",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"script-vs-module.md": {
  id: "script-vs-module.md",
  slug: "script-vs-module",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"sorting-without-library.mdx": {
  id: "sorting-without-library.mdx",
  slug: "sorting-without-library",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"testing-console-error.md": {
  id: "testing-console-error.md",
  slug: "testing-console-error",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
"use-overload-to-type-dynamic-function-signature.md": {
  id: "use-overload-to-type-dynamic-function-signature.md",
  slug: "use-overload-to-type-dynamic-function-signature",
  body: string,
  collection: "today-i-learnt",
  data: InferEntrySchema<"today-i-learnt">
},
},
"workshop": {
"fast-site-with-gatsby-js/01-introduction/introduction.mdx": {
  id: "fast-site-with-gatsby-js/01-introduction/introduction.mdx",
  slug: "fast-site-with-gatsby-js/01-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/02-key-concepts/key-concepts.mdx": {
  id: "fast-site-with-gatsby-js/02-key-concepts/key-concepts.mdx",
  slug: "fast-site-with-gatsby-js/02-key-concepts/key-concepts",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/03-create-pages/create-pages.mdx": {
  id: "fast-site-with-gatsby-js/03-create-pages/create-pages.mdx",
  slug: "fast-site-with-gatsby-js/03-create-pages/create-pages",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/04-use-plugin/use-plugin.mdx": {
  id: "fast-site-with-gatsby-js/04-use-plugin/use-plugin.mdx",
  slug: "fast-site-with-gatsby-js/04-use-plugin/use-plugin",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/05-pulling-data/pulling-data.mdx": {
  id: "fast-site-with-gatsby-js/05-pulling-data/pulling-data.mdx",
  slug: "fast-site-with-gatsby-js/05-pulling-data/pulling-data",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/06-source-plugin/source-plugin.mdx": {
  id: "fast-site-with-gatsby-js/06-source-plugin/source-plugin.mdx",
  slug: "fast-site-with-gatsby-js/06-source-plugin/source-plugin",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/07-transformer-plugin/transformer-plugin.mdx": {
  id: "fast-site-with-gatsby-js/07-transformer-plugin/transformer-plugin.mdx",
  slug: "fast-site-with-gatsby-js/07-transformer-plugin/transformer-plugin",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/08-dynamic-pages/dynamic-pages.mdx": {
  id: "fast-site-with-gatsby-js/08-dynamic-pages/dynamic-pages.mdx",
  slug: "fast-site-with-gatsby-js/08-dynamic-pages/dynamic-pages",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/09-image-optimization/image-optimization.mdx": {
  id: "fast-site-with-gatsby-js/09-image-optimization/image-optimization.mdx",
  slug: "fast-site-with-gatsby-js/09-image-optimization/image-optimization",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/10-more-source-plugin/more-source-plugin.mdx": {
  id: "fast-site-with-gatsby-js/10-more-source-plugin/more-source-plugin.mdx",
  slug: "fast-site-with-gatsby-js/10-more-source-plugin/more-source-plugin",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"fast-site-with-gatsby-js/11-create-source-plugin/create-source-plugin.mdx": {
  id: "fast-site-with-gatsby-js/11-create-source-plugin/create-source-plugin.mdx",
  slug: "fast-site-with-gatsby-js/11-create-source-plugin/create-source-plugin",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
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
"js-the-react-parts/010-introduction/introduction.mdx": {
  id: "js-the-react-parts/010-introduction/introduction.mdx",
  slug: "js-the-react-parts/010-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/020-background/background.mdx": {
  id: "js-the-react-parts/020-background/background.mdx",
  slug: "js-the-react-parts/020-background/background",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/100-template-string/template-string.mdx": {
  id: "js-the-react-parts/100-template-string/template-string.mdx",
  slug: "js-the-react-parts/100-template-string/template-string",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/110-destructuring/destructuring.mdx": {
  id: "js-the-react-parts/110-destructuring/destructuring.mdx",
  slug: "js-the-react-parts/110-destructuring/destructuring",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/120-spread/spread.mdx": {
  id: "js-the-react-parts/120-spread/spread.mdx",
  slug: "js-the-react-parts/120-spread/spread",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/130-arrow-function/arrow-function.mdx": {
  id: "js-the-react-parts/130-arrow-function/arrow-function.mdx",
  slug: "js-the-react-parts/130-arrow-function/arrow-function",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/200-block-scope/block-scope.mdx": {
  id: "js-the-react-parts/200-block-scope/block-scope.mdx",
  slug: "js-the-react-parts/200-block-scope/block-scope",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/210-array-methods/array-methods.mdx": {
  id: "js-the-react-parts/210-array-methods/array-methods.mdx",
  slug: "js-the-react-parts/210-array-methods/array-methods",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/220-es-module/es-module.mdx": {
  id: "js-the-react-parts/220-es-module/es-module.mdx",
  slug: "js-the-react-parts/220-es-module/es-module",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/300-closure/closure.mdx": {
  id: "js-the-react-parts/300-closure/closure.mdx",
  slug: "js-the-react-parts/300-closure/closure",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/310-functional-programming/functional-programming.mdx": {
  id: "js-the-react-parts/310-functional-programming/functional-programming.mdx",
  slug: "js-the-react-parts/310-functional-programming/functional-programming",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/400-conclusion/conclusion.mdx": {
  id: "js-the-react-parts/400-conclusion/conclusion.mdx",
  slug: "js-the-react-parts/400-conclusion/conclusion",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/900-callback-function/callback-function.mdx": {
  id: "js-the-react-parts/900-callback-function/callback-function.mdx",
  slug: "js-the-react-parts/900-callback-function/callback-function",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/910-asynchronous-js/asynchronous-js.mdx": {
  id: "js-the-react-parts/910-asynchronous-js/asynchronous-js.mdx",
  slug: "js-the-react-parts/910-asynchronous-js/asynchronous-js",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"js-the-react-parts/920-object-methods/object-methods.mdx": {
  id: "js-the-react-parts/920-object-methods/object-methods.mdx",
  slug: "js-the-react-parts/920-object-methods/object-methods",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/01-introduction/introduction.md": {
  id: "react-testing/01-introduction/introduction.md",
  slug: "react-testing/01-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/02-test-framework/test-framework.md": {
  id: "react-testing/02-test-framework/test-framework.md",
  slug: "react-testing/02-test-framework/test-framework",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/03-testing-function/testing-function.mdx": {
  id: "react-testing/03-testing-function/testing-function.mdx",
  slug: "react-testing/03-testing-function/testing-function",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/04-testing-react-component/testing-react-component.mdx": {
  id: "react-testing/04-testing-react-component/testing-react-component.mdx",
  slug: "react-testing/04-testing-react-component/testing-react-component",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/05-testing-redux-and-router/testing-redux-and-router.mdx": {
  id: "react-testing/05-testing-redux-and-router/testing-redux-and-router.mdx",
  slug: "react-testing/05-testing-redux-and-router/testing-redux-and-router",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/06-mocking/mocking.mdx": {
  id: "react-testing/06-mocking/mocking.mdx",
  slug: "react-testing/06-mocking/mocking",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/07-effective-react-testing/effective-react-testing.mdx": {
  id: "react-testing/07-effective-react-testing/effective-react-testing.mdx",
  slug: "react-testing/07-effective-react-testing/effective-react-testing",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/08-e2e-testing-with-cypress/e2e-testing-with-cypress.mdx": {
  id: "react-testing/08-e2e-testing-with-cypress/e2e-testing-with-cypress.mdx",
  slug: "react-testing/08-e2e-testing-with-cypress/e2e-testing-with-cypress",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/09-cypress-testing-techniques/cypress-testing-technique.mdx": {
  id: "react-testing/09-cypress-testing-techniques/cypress-testing-technique.mdx",
  slug: "react-testing/09-cypress-testing-techniques/cypress-testing-technique",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"react-testing/10-next-steps/next-steps.mdx": {
  id: "react-testing/10-next-steps/next-steps.mdx",
  slug: "react-testing/10-next-steps/next-steps",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/01-introduction/introduction.mdx": {
  id: "typescript-for-react-developer/01-introduction/introduction.mdx",
  slug: "typescript-for-react-developer/01-introduction/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/02-typescript-vs-javascript/typescript-vs-javascript.mdx": {
  id: "typescript-for-react-developer/02-typescript-vs-javascript/typescript-vs-javascript.mdx",
  slug: "typescript-for-react-developer/02-typescript-vs-javascript/typescript-vs-javascript",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/03-variables/variables.mdx": {
  id: "typescript-for-react-developer/03-variables/variables.mdx",
  slug: "typescript-for-react-developer/03-variables/variables",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/04-type-operations/type-operations.mdx": {
  id: "typescript-for-react-developer/04-type-operations/type-operations.mdx",
  slug: "typescript-for-react-developer/04-type-operations/type-operations",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/05-function/function.md": {
  id: "typescript-for-react-developer/05-function/function.md",
  slug: "typescript-for-react-developer/05-function/function",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/06-react-styleguidist/react-styleguidist.mdx": {
  id: "typescript-for-react-developer/06-react-styleguidist/react-styleguidist.mdx",
  slug: "typescript-for-react-developer/06-react-styleguidist/react-styleguidist",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/07-generics/generics.mdx": {
  id: "typescript-for-react-developer/07-generics/generics.mdx",
  slug: "typescript-for-react-developer/07-generics/generics",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/08-convert-react-component/convert-react-component.mdx": {
  id: "typescript-for-react-developer/08-convert-react-component/convert-react-component.mdx",
  slug: "typescript-for-react-developer/08-convert-react-component/convert-react-component",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/09-convert-hook/convert-hooks.mdx": {
  id: "typescript-for-react-developer/09-convert-hook/convert-hooks.mdx",
  slug: "typescript-for-react-developer/09-convert-hook/convert-hooks",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/10-using-third-party-types/using-third-party-types.mdx": {
  id: "typescript-for-react-developer/10-using-third-party-types/using-third-party-types.mdx",
  slug: "typescript-for-react-developer/10-using-third-party-types/using-third-party-types",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/11-advanced-types/advanced-types.mdx": {
  id: "typescript-for-react-developer/11-advanced-types/advanced-types.mdx",
  slug: "typescript-for-react-developer/11-advanced-types/advanced-types",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"typescript-for-react-developer/12-next-step/next-step.mdx": {
  id: "typescript-for-react-developer/12-next-step/next-step.mdx",
  slug: "typescript-for-react-developer/12-next-step/next-step",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"web-developer-toolbox/01-intro/introduction.mdx": {
  id: "web-developer-toolbox/01-intro/introduction.mdx",
  slug: "web-developer-toolbox/01-intro/introduction",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"web-developer-toolbox/02-vs-code/visual-studio-code.mdx": {
  id: "web-developer-toolbox/02-vs-code/visual-studio-code.mdx",
  slug: "web-developer-toolbox/02-vs-code/visual-studio-code",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"web-developer-toolbox/03-git/git.mdx": {
  id: "web-developer-toolbox/03-git/git.mdx",
  slug: "web-developer-toolbox/03-git/git",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
"web-developer-toolbox/04-chrome-devtools/chrome-devtools.mdx": {
  id: "web-developer-toolbox/04-chrome-devtools/chrome-devtools.mdx",
  slug: "web-developer-toolbox/04-chrome-devtools/chrome-devtools",
  body: string,
  collection: "workshop",
  data: InferEntrySchema<"workshop">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
