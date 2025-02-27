import { ScrollArea } from '@/components/ui/scroll-area';
import { appRoutes } from '@/configs/app-routes';
import Link from 'next/link';

const components = ['Infinite Scroll', 'Infinite Select'];

export default function DocsSidebar() {
  return (
    <div className='w-64 border-r bg-background'>
      <ScrollArea className='h-screen'>
        <div className='p-6'>
          <h2 className='mb-2 text-lg font-semibold'>Getting Started</h2>
          <Link
            href={appRoutes.DOCS_INTRODUCTION}
            className='text-sm text-muted-foreground hover:text-foreground'>
            Introduction
          </Link>

          <h2 className='mt-8 mb-2 text-lg font-semibold'>Components</h2>
          <nav className='flex flex-col space-y-1'>
            {components.map((component) => (
              <Link
                key={component}
                href={`/docs/${component.toLowerCase().replace(/\s+/g, '-')}`}
                className='text-sm text-muted-foreground hover:text-foreground'>
                {component}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}
