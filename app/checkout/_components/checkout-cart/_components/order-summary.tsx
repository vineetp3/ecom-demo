import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import OrderComplete from './order-complete';

export default async function OrderSummary() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return (
    <div className="mt-2 w-full">
      <div className="space-y-1 text-sm px-4 md:p-0">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{`$${cart?.cost.subtotalAmount.amount}0`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-sm font-light text-gray-500">Free Shipping</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center text-gray-600">
            Estimated taxes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="font-medium">{`$${cart?.cost.totalTaxAmount.amount}0`}</span>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-2 px-4 md:p-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-medium">{`$${cart?.cost.totalAmount.amount}0`}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500  px-4 md:p-0">{`Including $${cart?.cost.totalTaxAmount.amount}0 in taxes`}</div>
      <OrderComplete />
    </div>
  );
}
