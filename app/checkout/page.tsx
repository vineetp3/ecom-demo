import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { DeleteItemButton } from 'components/cart/delete-item-button';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import Image from 'next/image';
import CheckoutForm from './_components/checkout-form';
import styles from './styles.module.css';
const Checkout = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return (
    <div className="flex h-full px-[10%]">
      <div
        className={`h-[calc(100vh-7rem)] basis-1/2 overflow-scroll dark:border-neutral-500 ${styles.noScrollbar}`}
      >
        <CheckoutForm />
      </div>
      <div className="basis-1/2 bg-neutral-100 md:p-16 dark:bg-neutral-800">
        {!cart || cart.lines.length === 0 ? (
          <div
            className={`mt-20 flex w-full flex-col items-center justify-center overflow-hidden `}
          >
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
          </div>
        ) : (
          <ul className="flex w-full flex-col gap-8">
            {cart?.lines.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700"
                >
                  <div className="relative flex items-center gap-4 py-4">
                    <div className="relative">
                      <Image
                        className="max-h-[70px] rounded-xl border-2 border-neutral-200 object-cover dark:border-neutral-500"
                        width={80}
                        height={70}
                        alt={
                          item.merchandise.product.featuredImage.altText ||
                          item.merchandise.product.title
                        }
                        src={item.merchandise.product.featuredImage.url}
                      />
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-400/80 text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div> {item.merchandise.product.title}</div>
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
      </div>
    </div>
  );
};

export default Checkout;
