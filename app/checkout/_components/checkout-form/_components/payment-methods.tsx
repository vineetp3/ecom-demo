import Image from 'next/image';
import CCImg from 'public/payment-methods.png';
import PaypalImg from 'public/paypal.png';
import PersonaImg from 'public/persona.svg';
import RedirectIcon from 'public/redirect-icon.png';

const PaymentMethods = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between rounded-t-lg border p-3">
        <div>
          <input type="radio" id="card" name="paymentMethod" className="mr-2" disabled />
          <label htmlFor="card" className="mr-4">
            Credit or debit card
          </label>
        </div>
        <Image src={CCImg} height={80} width={100} alt="payment methods cc" />
      </div>

      <div className="flex items-center justify-between  border p-3">
        <div>
          <input type="radio" id="paypal" name="paymentMethod" className="mr-2" disabled />
          <label htmlFor="paypal" className="mr-4">
            PayPal
          </label>
        </div>
        <Image src={PaypalImg} alt="PayPal" className="h-6" />
      </div>

      <div className="border border-[#253B80] bg-[#EFF5FF] px-3 py-4 pb-6 flex flex-col w-full gap-4 items-center rounded-b-lg font-normal">
        <div className="mb-2 flex items-center self-start">
          <input type="radio" id="card" name="paymentMethod" className="mr-2" checked/>
          <Image src={PersonaImg} height={60} width={140} alt="Persona" className="h-4" />
          <span className="text-sm">Pay with Persona to claim offers</span>
        </div>
        <Image src={RedirectIcon} alt="redirect-icon" className='h-16 w-28'></Image>
        <p className="text-sm text-gray-600 text-center px-12">
          After clicking Pay now, you will be redirected to Persona - Sponsored checkout to complete
          your purchase securely.
        </p>
      </div>

      <div className="mb-4 flex items-center mt-4">
        <input type="checkbox" id="sameAddress" className="mr-2" checked />
        <label htmlFor="sameAddress" className="text-sm">
          Use shipping address as billing address
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;
