---
title: 'Adding Types for npm Packages'
pubDate: 1 Apr 2019
description: "How to add custom types for npm packages that doesn't have declaration nor DefinitelyTyped support."
topics:
  - typescript
---

If you're using Typescript in your project, sooner or later you would encounter a problem: the npm packages that you've installed doesn't have declaration.

If you're lucky, there are someone out there adding the typing to DefinitelyTyped, and you can just install `@types/<package-name>` to use it.

However, you may not be so lucky because perhaps the package that you use may be not that popular so nobody has added the typings yet, or the DefinitelyTyped is incorrect that you would need to create your own.

Following are the steps:

1.  Create a file in your `src` folder with the convention `<package-name>.d.ts`.
    For example, if you're creating typing for `react-router-dom`, create a file with name `react-router-dom.d.ts`. (`react-router-dom` do have DefinitelyTyped declaration, but let's assume it doesn't.)
1.  In the file, start with the namespace declaration `declare module '<package-name>'` and add all the typings within the namespace. For example:

    ```ts
    declare module 'react-router-dom' {
      import * as React from 'react';

      export interface BrowserRouterProps {
        basename?: string;
        getUserConfirmation?: (
          message: string,
          callback: (ok: boolean) => void
        ) => void;
        forceRefresh?: boolean;
        keyLength?: number;
      }
      export class BrowserRouter extends React.Component<
        BrowserRouterProps,
        any
      > {}
    }
    ```

Now `import { BrowserRouter } from 'react-router-dom';` should works!
