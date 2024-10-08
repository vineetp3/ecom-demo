import { getCart } from 'lib/shopify';
import { Cart } from 'lib/shopify/types';
import { Sora } from 'next/font/google';
import { cookies } from 'next/headers';
import CheckoutCart from './_components/checkout-cart/checkout-cart';
import CheckoutForm from './_components/checkout-form/checkout-form';
import styles from './styles.module.css';

const soraFont = Sora({subsets : ['latin']})


const Checkout = async () => {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return (
    <div className={`flex flex-col md:flex-row h-full px-3 py-6 md:py-0 md:px-[10%] ${soraFont.className}`}>
      <div
        className={`h-[calc(100vh-7rem)] basis-1/2 overflow-scroll dark:border-neutral-500 ${styles.noScrollbar}`}
      >
        <CheckoutForm cart={cart || {} as Cart} />
      </div>
      <div className="basis-1/2 bg-neutral-100 md:p-8 dark:bg-neutral-800">
        <CheckoutCart />
      </div>
    </div>
  );
};

export default Checkout;
