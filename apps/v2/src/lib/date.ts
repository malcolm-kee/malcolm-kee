const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (date: Date) => formatter.format(date);

export const isFuture = (date: Date) => {
  return new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
};
