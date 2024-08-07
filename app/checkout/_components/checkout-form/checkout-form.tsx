'use client';

import { Cart } from 'lib/shopify/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import PaymentMethods from './_components/payment-methods';
import RedirectDialog from './_components/redirect-dialog';
import { states } from './constants';

interface FormData {
  emailOrPhone: string;
  emailOffers: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  saveInfo: boolean;
}

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required('Email or phone is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Zip code must be 5 digits')
});

const CheckoutForm = ({ cart }: { cart: Cart }) => {
  const [formData, setFormData] = useState<FormData>({
    emailOrPhone: '',
    emailOffers: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Michigan',
    zipCode: '',
    saveInfo: false
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/');

  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const cartWithUserData = { ...cart, userData: { ...formData } };
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      setOpen(true);
      setRedirectUrl(
        `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}cart=${JSON.stringify(cartWithUserData)}`
      );
      setTimeout(() => {
        router.push(
          `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}cart=${JSON.stringify(cartWithUserData)}`
        );
      }, 1500);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = err.inner.reduce((acc: Record<string, string>, error) => {
          if (error.path) acc[error.path] = error.message;
          return acc;
        }, {});
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full rounded-md md:p-4 md:pb-8">
        <div className="my-4 flex flex-col gap-2">
          <label className="block text-2xl font-semibold text-gray-900">Contact</label>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or mobile phone number"
            value={formData.emailOrPhone}
            onChange={handleChange}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-blue-500 focus:ring-indigo-500 sm:text-sm"
          />
          {validationErrors.emailOrPhone && (
            <p className="text-sm text-red-500">{validationErrors.emailOrPhone}</p>
          )}
          <div className="mt-2 flex items-center gap-1">
            <input
              type="checkbox"
              name="emailOffers"
              checked={formData.emailOffers}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600"
            />
            <label className="ml-2 text-sm text-gray-600">Email me with news and offers</label>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3">
          <label className="block text-2xl font-semibold text-gray-900">Delivery</label>
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700">Country/Region</label>
            <select className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-gray-100 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="usa" className="px-4">
                United States
              </option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="outline-none">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {validationErrors.firstName && (
                <p className="col-span-2 mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
              )}
            </div>
            <div className="outline-none">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {validationErrors.lastName && (
                <p className="col-span-2 mt-1 text-sm text-red-500">{validationErrors.lastName}</p>
              )}
            </div>
          </div>
          <div className="outline-none">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {validationErrors.address && (
              <p className="text-sm text-red-500">{validationErrors.address}</p>
            )}
          </div>

          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChange={handleChange}
            className="block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="flex justify-between w-full gap-4 items-start">
            <div className="outline-none flex-grow">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {validationErrors.city && (
                <p className="col-span-2 mt-1 text-sm text-red-500">{validationErrors.city}</p>
              )}
            </div>
            <div className="flex items-center gap-4 flex-grow">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="block h-12 w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {states.map((item) => (
                  <option key={item.value} label={item.label} value={item.value} />
                ))}
              </select>
            </div>
          </div>
          <div className="outline-none">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="mt-1 block h-12 w-full rounded-md border border-gray-300 bg-white px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {validationErrors.zipCode && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.zipCode}</p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600"
            />
            <label className="ml-2 text-sm text-gray-600">
              Save this information for next time
            </label>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-4">
          <label className="block text-lg font-medium text-gray-700">Shipping method</label>
          <input
            type="text"
            placeholder="Fedex Ground (2-3 days)"
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
      <RedirectDialog open={open} setOpen={setOpen} redirectUrl={redirectUrl} />
    </>
  );
};

export default CheckoutForm;
