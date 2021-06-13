declare module '*.module.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-helmet' {
  import * as React from 'react';

  export interface HelmetTags {
    baseTag: Array<any>;
    linkTags: Array<HTMLLinkElement>;
    metaTags: Array<HTMLMetaElement>;
    noscriptTags: Array<any>;
    scriptTags: Array<HTMLScriptElement>;
    styleTags: Array<HTMLStyleElement>;
  }

  export interface HelmetData {
    base: HelmetDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    noscript: HelmetDatum;
    script: HelmetDatum;
    style: HelmetDatum;
    title: HelmetDatum;
    titleAttributes: HelmetDatum;
  }

  export interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any>;
  }

  export interface HelmetProps {
    async?: boolean;
    base?: any;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    onChangeClientState?: (
      newState: any,
      addedTags: HelmetTags,
      removedTags: HelmetTags
    ) => void;
    noscript?: Array<any>;
    script?: Array<any>;
    style?: Array<any>;
    title?: string;
    titleAttributes?: Object;
    titleTemplate?: string;
  }

  export class Helmet extends React.Component<HelmetProps> {
    static peek(): HelmetData;
    static rewind(): HelmetData;
    static renderStatic(): HelmetData;
    static canUseDOM: boolean;
  }
}
