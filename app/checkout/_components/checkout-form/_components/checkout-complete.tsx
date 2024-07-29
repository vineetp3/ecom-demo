import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const font = Inter({ subsets: ['latin'] });

export default function CheckoutComplete({ offer, cart }: { offer: any; cart?: any }) {
  const parsedOffer = JSON.parse(offer) || '';
  const { discountAbsolute, discountPercentage } = parsedOffer?.offerDetails || {};
  const cartAmount = Number(cart.cost.totalAmount.amount) || 50;
  const amountToPay = discountAbsolute
    ? cartAmount - discountAbsolute
    : cartAmount - (discountPercentage / 100) * cartAmount;
  return (
    <div 
      className={` md:min-h-screen w-full items-center justify-center bg-white md:px-4 py-4 md:py-16 ${font.className}`}
    >
      <div className="rounded-lg  flex size-full flex-col bg-white px-2 md:px-8">
        <div className="mb-6 flex flex-col items-start gap-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <Image src="/checkmark-circle.png" height={50} width={50} alt="checkmark" />
            <div className="flex flex-col justify-start">
              <p className="text-left text-sm text-gray-600">Confirmation #DQFDHG5E0</p>
              <h2 className="text-2xl font-semibold">Thank you for your order!</h2>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full flex-col items-start gap-1 rounded-t-md border p-4">
              <p className="text-left font-bold text-gray-800">Your order is confirmed</p>
              <p className="text-left text-xs text-gray-500">
                You will get a confirmation email with your order number soon.
              </p>

              <button className="mt-3 rounded border bg-white px-4 py-2 text-sm text-blue-500">
                Download Shop to track package
              </button>
            </div>
            <div className="w-full rounded-b-md border bg-gray-100  py-4">
              <label className="flex items-center justify-start px-4">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Email me with news and offers</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-md border border-gray-200 pt-4">
          <h3 className="mb-2 px-4 text-lg font-semibold">Order details</h3>
          <div className="grid grid-flow-row-dense grid-cols-2 justify-between gap-y-6 px-4">
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-light text-gray-500">Contact information:</span>
              <span>taylor.chen@domain.com</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-light text-gray-500">Payment method:</span>
              <span className="inline-flex items-center gap-2">
                <Image src="/visa.png" height={20} width={35} alt="visa-icon" />
                Visa •••• 1234 - ${amountToPay}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-light text-gray-500">Shipping address:</span>
              <span>Taylor Chen,</span>
              <span>151 OConnor St,</span>
              <span>Dallas, TX, K2P 2L8, USA</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-light text-gray-500">Billing address:</span>
              <span>Taylor Chen,</span>
              <span>151 OConnor St,</span>
              <span>Dallas, TX, K2P 2L8, USA</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-light text-gray-500">Shipping method:</span> FedEx Ground
            </div>
          </div>

          <div className="w-full rounded-b-md border bg-gray-100  py-4">
            <label className="flex items-center justify-start px-4">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">
                Save my information for a faster checkout
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-between">
          <Link href="#" className="text-sm text-blue-500">
            Need help? Contact us
          </Link>
          <button className=" rounded bg-gray-700 px-4 py-6 text-white">Continue shopping</button>
        </div>
      </div>
    </div>
  );
}
