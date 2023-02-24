const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (date: Date) => formatter.format(date);
