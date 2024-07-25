import CheckoutCart from './_components/checkout-cart';
import CheckoutForm from './_components/checkout-form';
import styles from './styles.module.css';

const Checkout = async () => {
  return (
    <div className="flex h-full px-[10%]">
      <div
        className={`h-[calc(100vh-7rem)] basis-1/2 overflow-scroll dark:border-neutral-500 ${styles.noScrollbar}`}
      >
        <CheckoutForm />
      </div>
      <div className="basis-1/2 bg-neutral-100 md:p-8 dark:bg-neutral-800">
        <CheckoutCart />
      </div>
    </div>
  );
};

export default Checkout;
