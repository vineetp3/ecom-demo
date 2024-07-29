'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function OrderComplete() {
  const searchParams = useSearchParams();
  const offer = searchParams.get('offer') || '';
  // const offerSponser = offer
  if (!offer.length) {
    return <></>;
  }
  const parsedOffer = JSON.parse(offer);
  return (
    <div className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-[#FFEDFE] px-1 py-4 shadow-sm shadow-black drop-shadow-sm md:gap-4">
      <Image src="/order-complete.png" height={25} width={50} alt="persona-icon" />
      <div className="text-center">
        <p className="max-w-32 text-xs font-medium text-gray-800">
          Your order has been sponsored by
        </p>
      </div>
      <div className="flex items-center gap-2 bg-white px-2">
        <Image src="/persona.png" height={70} width={90} alt="persona-icon" />
        <span>&</span>
        <span
          className="font-bold text-gray-800"
          style={{
            color: `#${parsedOffer.accent}`
          }}
        >
          {parsedOffer.label}
        </span>
      </div>
    </div>
  );
}
