// app/api/example.ts

import { clearCart } from 'components/cart/actions';
import { TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const req = await request.json();
  await clearCart({ lineIds: [...req] });
  revalidateTag(TAGS.cart);
  return new Response(JSON.stringify({ message: 'Received successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
