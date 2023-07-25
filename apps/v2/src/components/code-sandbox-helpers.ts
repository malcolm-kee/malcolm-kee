export const supportedLangs = ['js', 'jsx', 'ts', 'tsx', 'html'] as const;

export type SupportedLang = (typeof supportedLangs)[number];
