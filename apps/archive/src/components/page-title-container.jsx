import * as React from 'react';

export const PageTitleContainer = ({ title }) => (
  <div className="flex justify-between p-4">
    <h1 className="text-xl font-medium text-gray-700 dark:text-gray-400">
      {title}
    </h1>
  </div>
);
