import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import ProductGrid from 'components/product-grid';
import Image from 'next/image';
import HeroImage from 'public/image-hero.png';

export const metadata = {
  description: 'The best chocolates for gifting.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-center bg-[#E792A1]">
        <div className="flex h-[500px] w-full max-w-screen-2xl items-center">
          <div className="absolute left-[10%] flex flex-col items-center justify-center gap-8">
            <h1 className="left-[10%] max-w-72 text-center text-5xl font-bold text-white">
              100% clean chocolates
            </h1>
            <h2 className="left-[10%] w-80 text-center tracking-tight">
              Sweetened with dates | No refinded Sugar
            </h2>
          </div>
          <Image src={HeroImage} alt="hero-image" className="h-full w-full object-contain " />
        </div>
      </div>
      <ProductGrid />
      <ThreeItemGrid />
      <Footer />
    </div>
  );
}
