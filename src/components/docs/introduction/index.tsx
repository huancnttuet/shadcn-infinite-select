import BuyMeACoffee from '@/components/widgets/buy-me-a-coffee';
import Link from 'next/link';

export default function Introduction() {
  return (
    <>
      <div className='mx-auto max-w-3xl px-6 py-8'>
        <h1 className='mb-8 text-4xl font-bold'>Introduction</h1>

        <div className='rounded-lg bg-muted p-6'>
          <blockquote className='mt-6 border-l-2 pl-6 italic'>
            shadcn/ui is a re-usable components built using Radix UI and
            Tailwind CSS.
            <br />
            It is NOT a component library. It is a collection of re-usable
            components that you can copy and paste into your apps.
          </blockquote>
          <Link
            href='/docs'
            className='mt-4 inline-block text-sm text-muted-foreground hover:text-foreground'>
            Learn more about shadcn/ui
          </Link>
        </div>

        <div className='mt-8 space-y-4'>
          <p className='text-lg text-muted-foreground'>
            This is built on top of shadcn/ui and includes many useful
            components such as multiple selector, loading button, infinite
            scroll and more.
          </p>

          <p className='font-medium'>
            The same as shadcn/ui, all components are free to use for personal
            and commercial.
          </p>
          <p className='text-muted-foreground'>
            Just copy and paste to your project and customize to your needs. The
            code is yours.
          </p>
        </div>

        <div className='mt-12'>
          <BuyMeACoffee />
        </div>
      </div>
    </>
  );
}
