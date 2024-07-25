import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between border-b-[1px] border-neutral-300 dark:border-neutral-700">
      <div className="block flex-none md:hidden absolute left-4 top-[50%]">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-center bg-[#EED2FF] font-extrabold py-1">Mid-Season Sale. Upto 70% OFF</div>
        <div className="flex w-full items-center p-4">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <div className="ml-2 flex-none text-3xl font-bold md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
