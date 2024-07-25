import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export default async function ProductGrid() {
  const products = await getCollectionProducts({ collection: 'caraousel-catalog' });

  if (!products?.length) return null;

  const carouselProducts = [...products];

  return (
    <div className="w-full pb-6 py-8 flex items-center justify-center px-[10%]">
      <div className="max-w-screen-2xl w-full">
        <h3 className="mb-2 text-lg font-semibold">Our Products</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
          {carouselProducts.map((product, i) => (
            <div
              key={`${product.handle}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] min-w-[250px] w-full max-w-[475px] flex-none"
            >
              <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
