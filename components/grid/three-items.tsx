import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority,
  className
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hero-chocolates'
  });
  console.log(homepageItems.length);

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 pb-4 mt-4">
      <h2 className="mb-4 text-xl font-bold">Bestsellers</h2>
        <div className=" grid max-h-[700px] gap-4 md:grid-cols-6 md:grid-rows-2">
          <ThreeItemGridItem
            size="full"
            item={thirdProduct}
            priority={true}
            className="md:col-span-4 md:row-span-2"
          />
          <ThreeItemGridItem
            size="full"
            item={firstProduct}
            className="md:col-span-2 md:row-span-1"
          />
          <ThreeItemGridItem
            size="full"
            item={secondProduct}
            className="md:col-span-2 md:row-span-1"
          />
        </div>
    </section>
  );
}
