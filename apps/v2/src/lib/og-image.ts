export interface OgImageUrlOptions {
  title: string;
  publishedDate?: Date | undefined;
  heading?: string | undefined;
  bgImage?: string | undefined;
  borderColor?: string | undefined;
}

export const getOgImageUrl = ({
  title,
  publishedDate,
  heading,
  bgImage,
  borderColor,
}: OgImageUrlOptions) => {
  const ogSearchParams = new URLSearchParams({
    title,
  });

  if (publishedDate) {
    ogSearchParams.set('date', dateFormatter.format(publishedDate));
  }

  if (heading) {
    ogSearchParams.set('heading', heading);
  }

  if (bgImage) {
    ogSearchParams.set('bgImage', bgImage);
  }

  if (borderColor) {
    ogSearchParams.set('borderColor', borderColor);
  }

  return `https://malcolm-kee-og.vercel.app/api/og?${ogSearchParams}`;
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
