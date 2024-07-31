'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function OrderCompletedDetails() {
  const searchParams = useSearchParams();
  const cartWithOffer = searchParams.get('cart');
  const parsedCartWithOffer = JSON.parse(cartWithOffer || '');

  return (
    <div className="mt-2 w-full">
      <ul className="flex w-full flex-col gap-2 px-4 md:px-0">
        {parsedCartWithOffer?.lines.map((item: any) => {
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
                <div>$ {item.cost.totalAmount.amount}0</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="space-y-1 px-4 text-sm md:p-0">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{`$${parsedCartWithOffer?.cost.subtotalAmount.amount}0`}</span>
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
          <span className="font-medium">{`$${parsedCartWithOffer?.cost.totalTaxAmount.amount}0`}</span>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 px-4 pt-2 md:p-0">
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-medium">{`$${parsedCartWithOffer?.cost.totalAmount.amount}0`}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-medium">{`$${parsedCartWithOffer?.cost.totalAmount.amount}0`}</span>
        </div>
      </div>
      <div className="mt-2 px-4 text-sm  text-gray-500 md:p-0">{`Including $${parsedCartWithOffer?.cost.totalTaxAmount.amount}0 in taxes`}</div>
    </div>
  );
}
