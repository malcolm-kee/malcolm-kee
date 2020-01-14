import React from 'react';
import { ThemeToggle } from './theme-toggle';

export const PageTitleContainer = ({ title }) => (
  <div className="flex justify-between p-4">
    <h1 className="text-xl font-medium text-gray-600 dark:text-gray-400">
      {title}
    </h1>
    <ThemeToggle className="hidden sm:inline" />
  </div>
);
