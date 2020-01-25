declare module '*.module.scss' {
  const content: { [className: string]: string };
  export = content;
}

type NavigatorShareOption = {
  text: string;
  url: string;
  title?: string;
};

interface Navigator {
  share: (options: NavigatorShareOption) => Promise<void>;
}
