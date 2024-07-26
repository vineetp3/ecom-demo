'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CheckoutComplete from './_components/checkout-complete';
import PaymentMethods from './_components/payment-methods';

const CheckoutForm = ({ cart }: { cart?: any }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    emailOffers: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Punjab',
    pinCode: '',
    saveInfo: false
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const offer = searchParams.get('offer');
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    router.push(`${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}cart=${JSON.stringify(cart)}`);
  };

  if (offer) {
    return <CheckoutComplete offer={offer} cart={cart} />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-md p-4 pb-8">
      <div className="my-4 flex flex-col gap-2">
        <label className="block text-2xl font-semibold text-gray-900">Contact</label>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or mobile phone number"
          value={formData.emailOrPhone}
          onChange={handleChange}
          className="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-blue-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="mt-2 flex items-center gap-1">
          <input
            type="checkbox"
            name="emailOffers"
            checked={formData.emailOffers}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600"
          />
          <label className="ml-2 text-sm text-gray-600">Email me with news and offers</label>
        </div>
      </div>

      <div className="mb-4 mt-8 flex w-full flex-col gap-1">
        <label className="block text-2xl font-semibold text-gray-900">Delivery</label>
        <div className="mb-4 mt-1">
          <label className="block text-sm font-medium text-gray-700">Country/Region</label>
          <select className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="usa" className="px-4">
              United States
            </option>
          </select>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name (optional)"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="mb-4 mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.apartment}
          onChange={handleChange}
          className="mb-4 mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Punjab">California</option>
              <option value="Punjab">Michigan</option>
              <option value="Punjab">Illinois</option>
              {/* Add other states here */}
            </select>
          </div>
        </div>
        <input
          type="text"
          name="pinCode"
          placeholder="PIN code"
          value={formData.pinCode}
          onChange={handleChange}
          className="mb-4 mt-1 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600"
          />
          <label className="ml-2 text-sm text-gray-600">Save this information for next time</label>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <label className="block text-lg font-medium text-gray-700">Shipping method</label>
        <input
          type="text"
          placeholder="Enter your shipping address to view available shipping methods."
          disabled
          className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 flex flex-col gap-4">
        <label className="block text-2xl font-bold text-gray-700">Payment</label>
        <p className="text-sm font-light text-gray-500">
          All transactions are secure and encrypted.
        </p>
        <PaymentMethods />
      </div>

      <button type="submit" className="w-full rounded-md bg-black py-2 font-semibold text-white">
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
