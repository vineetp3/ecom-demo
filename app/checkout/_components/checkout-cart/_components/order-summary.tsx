'use client';

import { Cart } from 'lib/shopify/types';
import { Jost } from 'next/font/google';
import Image from 'next/image';

const jost = Jost({
  subsets: ['latin']
});

export default function OrderSummary({ cart }: { cart: Cart | undefined }) {
  return (
    <div className="mt-2 w-full">
      <div className="space-y-1 px-4 text-sm md:p-0">
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
      <div
        className={`my-1 inline-flex w-full flex-wrap items-center rounded py-2 px-4 md:px-0 text-base ${jost.className}`}
      >
        <span className="mr-1 font-bold">Get offers</span>
        <span>by paying with</span>
        <Image
          src="/persona.png"
          height={30}
          width={100}
          alt="persona-icon"
          className="mx-[6px] pb-[2px]"
        />
      </div>
      <div className="border-t border-gray-200 px-4 pt-2 md:p-0">
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-medium">{`$${cart?.cost.totalAmount.amount}0`}</span>
        </div>
      </div>
      <div className="mt-2 px-4 text-sm  text-gray-500 md:p-0">{`Including $${cart?.cost.totalTaxAmount.amount}0 in taxes`}</div>
    </div>
  );
}
