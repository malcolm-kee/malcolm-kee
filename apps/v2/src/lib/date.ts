const makeFormatter = (lang: string) =>
  new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatterMap = new Map<string, Intl.DateTimeFormat>();

formatterMap.set('en-US', makeFormatter('en-US'));

export const formatDate = (date: Date, lang = 'en-US') => {
  const prevFormatter = formatterMap.get(lang);

  if (prevFormatter) {
    return prevFormatter.format(date);
  }

  const formatter = makeFormatter(lang);

  formatterMap.set(lang, formatter);

  return formatter.format(date);
};

export const isFuture = (date: Date) => {
  return new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
};
