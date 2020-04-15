import React from 'react';
import { Footer } from '../components/footer';
import { ThemeToggle } from '../components/theme-toggle';
import { Subject } from '../data/definition';

type EduLayoutProps = {
  subject: Subject;
  children: React.ReactNode;
};

export const EduLayout = ({ subject, children }: EduLayoutProps) => (
  <div className="Layout">
    <header className="px-4 py-4 sm:fixed w-full bg-primary-600 text-gray-100 text-lg z-10 top-0 flex justify-between items-center">
      {subject.name}
      <ThemeToggle />
    </header>
    <div className="sm:py-10" />
    {children}
    <Footer align="right" />
  </div>
);
