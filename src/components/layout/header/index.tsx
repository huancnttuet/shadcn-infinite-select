import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { ModeSwitcher } from '../mode-switcher';
import { Icons } from '@/components/ui/icon';
import { siteConfig } from '@/configs/site';
import { MainNav } from '../nav/main';
import { MobileNav } from '../nav/mobile';
import { CommandMenu } from '../command-menu';

export default function Header() {
  return (
    <header className='border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex flex-col items-center px-4'>
        <div className='container flex h-14 items-center'>
          <MainNav />
          <MobileNav />
          <div className='flex flex-1 items-center justify-between gap-2 md:justify-end'>
            <div className='w-full flex-1 md:w-auto md:flex-none'>
              <CommandMenu />
            </div>
            <nav className='flex items-center gap-0.5'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 px-0'>
                <Link
                  href={siteConfig.links.github}
                  target='_blank'
                  rel='noreferrer'>
                  <Icons.gitHub className='h-4 w-4' />
                  <span className='sr-only'>GitHub</span>
                </Link>
              </Button>
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
