import * as React from 'react';
import { ChevronRightIcon } from '~/components/icons';
import { Link } from '../components/link';

export default function IndexPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">SPA Demo</h1>
      <p className="mb-6">A SPA embedded into an Astro site.</p>
      <ul>
        <li>
          <Link
            to="/product"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
            animateNavigation
          >
            <ChevronRightIcon className="w-5 h-5" />
            <span className="text-lg [view-transition-name:product-page-title]">
              Products
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
