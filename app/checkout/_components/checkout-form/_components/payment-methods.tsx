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

      <div className="flex items-center justify-between border p-3">
        <div>
          <input type="radio" id="paypal" name="paymentMethod" className="mr-2 bg-white" disabled />
          <label htmlFor="paypal" className="mr-4">
            PayPal
          </label>
        </div>
        <Image src={PaypalImg} alt="PayPal" className="h-6" />
      </div>

      <div className="flex w-full items-center rounded-b-lg border border-[#253B80] bg-[#EFF5FF] px-3 py-4 pb-6 font-normal">
        <input type="radio" id="card" name="paymentMethod" className="mr-2 self-start" checked/>
        <div className="mb-2 flex flex-col items-center self-start -ml-4 md:ml-0 gap-4 md:gap-4">
          <div className="flex flex-col md:flex-row justify-center items-center w-full md:items-center md:justify-start gap-2 md:ml-0  md:gap-0">
            <Image src={PersonaImg} height={60} width={140} alt="Persona" className="h-4" />
            <span className="text-sm">Pay with Persona to claim offers</span>
          </div>
          <Image src={RedirectIcon} alt="redirect-icon" className="h-16 w-28"></Image>
          <p className="px-2 md:px-12 text-center text-sm text-gray-600">
            After clicking Pay now, you will be redirected to Persona - Sponsored checkout to
            complete your purchase securely.
          </p>
        </div>
      </div>

      <div className="mb-4 mt-4 flex items-center">
        <input type="checkbox" id="sameAddress" className="mr-2" checked />
        <label htmlFor="sameAddress" className="text-sm">
          Use shipping address as billing address
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;
