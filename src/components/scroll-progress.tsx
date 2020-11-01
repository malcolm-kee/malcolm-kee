import cx from 'classnames';
import * as React from 'react';
import { useWindowEventListener } from '../hooks/use-event-listener';
import styles from './scroll-progress.module.scss';

export type ScrollItem = {
  url: string;
  title: string;
};

export type ScrollProgressProps = {
  items: ScrollItem[];
  className?: string;
};

export const ScrollProgress = (props: ScrollProgressProps) => {
  const [max, setMax] = React.useState<null | number>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const getMax = React.useCallback(() => {
    setMax(document.body.clientHeight - window.innerHeight);
  }, []);

  React.useEffect(() => {
    getMax();
  }, [getMax]);

  useWindowEventListener('scroll', () => {
    setScrollPosition(window.scrollY);
  });
  useWindowEventListener('resize', getMax);

  return (
    <div className={cx(styles.root, props.className)}>
      {max && (
        <div
          className={`absolute top-0 bg-green-500 rounded ${styles.progress}`}
          style={{
            height: `${(scrollPosition / max) * 100}%`,
          }}
        />
      )}
      {max &&
        props.items.map((item, i) => (
          <ScrollItemLabel details={item} total={max} key={i} />
        ))}
    </div>
  );
};

const ScrollItemLabel = React.memo(
  ({ details, total }: { details: ScrollItem; total: number }) => {
    const [top, setTop] = React.useState(0);
    const calculateTop = React.useCallback(() => {
      const el = document.querySelector(details.url);
      if (el) {
        setTop(
          el.getBoundingClientRect().top +
            window.pageYOffset -
            window.innerHeight / 2
        );
      }
    }, [details.url]);

    React.useEffect(() => {
      calculateTop();
    }, [calculateTop]);

    useWindowEventListener('resize', calculateTop);

    const style = React.useMemo<React.CSSProperties>(
      () => ({
        top: `${(top / total) * 100}%`,
      }),
      [top, total]
    );

    return top ? (
      <a
        href={details.url}
        className={`absolute text-xs ml-2 ${styles.item}`}
        style={style}
      >
        {details.title}
      </a>
    ) : null;
  }
);
