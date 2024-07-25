import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { DeleteItemButton } from 'components/cart/delete-item-button';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import Image from 'next/image';
import OrderSummary from './order-summary';

export default async function CheckoutCart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return (
    <div className="flex flex-col items-center">
      {!cart || cart.lines.length === 0 ? (
        <div className={`mt-20 flex w-full flex-col items-center justify-center overflow-hidden `}>
          <ShoppingCartIcon className="h-16" />
          <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
        </div>
      ) : (
        <ul className="flex w-full flex-col gap-2">
          {cart?.lines.map((item) => {
            return (
              <li
                key={item.id}
                className="flex items-center justify-between border-neutral-300 dark:border-neutral-700"
              >
                <div className="relative flex items-center gap-4 py-1">
                  <div className="relative">
                    <Image
                      className="aspect-square max-h-[60px] rounded-md border-2 border-neutral-200 object-cover dark:border-neutral-500"
                      width={70}
                      height={70}
                      alt={
                        item.merchandise.product.featuredImage.altText ||
                        item.merchandise.product.title
                      }
                      src={item.merchandise.product.featuredImage.url}
                    />
                    <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800/80 text-xs text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm"> {item.merchandise.product.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div>$ {item.cost.totalAmount.amount}</div>
                  <DeleteItemButton item={item} />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <OrderSummary />
    </div>
  );
}
