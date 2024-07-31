import { clearCart } from 'components/cart/actions';
import { TAGS } from 'lib/constants';
import { getCart } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { Sora } from 'next/font/google';
import { cookies } from 'next/headers';
import CompletedCart from './_components/completed-cart';
import ShippingDetails from './_components/shipping-details';
import styles from './styles.module.css';

const soraFont = Sora({ subsets: ['latin'] });

const CheckoutComplete = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
    if (cart && cart.lines && cart?.lines.length > 0) {
      const lineIds = cart.lines.map((item: any) => item.id);

      const res = await clearCart({ lineIds: [...lineIds] });
      console.log('res', res)
      revalidateTag(TAGS.cart);
    }
  }

  return (
    <div
      className={`flex h-full flex-col px-2 py-8 md:flex-row md:px-[10%] md:py-0 ${soraFont.className}`}
    >
      <div
        className={`h-[calc(100vh-7rem)] basis-1/2 overflow-scroll dark:border-neutral-500 ${styles.noScrollbar}`}
      >
        <ShippingDetails />
      </div>
      <div className="basis-1/2 bg-neutral-100 dark:bg-neutral-800 md:p-8">
        <CompletedCart />
      </div>
    </div>
  );
};

export default CheckoutComplete;
