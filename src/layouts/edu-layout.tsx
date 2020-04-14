import React from 'react';
import { Subject } from '../data/definition';
import { Footer } from '../components/footer';

type EduLayoutProps = {
  subject: Subject;
  children: React.ReactNode;
};

export const EduLayout = ({ subject, children }: EduLayoutProps) => (
  <div className="Layout">
    <header className="px-4 py-4 sm:fixed w-full bg-primary-500 text-gray-900 z-10">
      {subject.name}
    </header>
    {children}
    <Footer align="right" />
  </div>
);
