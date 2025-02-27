'use client';

import { Github, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/configs/app-routes';

export default function Homepage() {
  const router = useRouter();

  return (
    <>
      <section className='mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20'>
        <h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]'>
          More components built on top of shadcn-ui.
        </h1>
        <p className='max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl'>
          Useful additional components collection base on shadcn/ui to help you
          ship new features faster. Copy and paste into your apps, Accessible,
          Customizable, Open Source.
        </p>
        <div className='flex gap-4'>
          <Button onClick={() => router.push(appRoutes.DOCS)}>
            <Zap className='mr-2 h-4 w-4' />
            Get Started
          </Button>
          <Button variant='outline'>Learn shadcn/ui</Button>
          <Button variant='outline'>
            <Github className='mr-2 h-4 w-4' />
            GitHub
          </Button>
        </div>
      </section>
    </>
  );
}
