'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, LinkIcon } from 'lucide-react';
import { ComponentPreview } from '@/components/widgets/component-preview';
import InfiniteSelectExample, {
  codeString,
} from '@/components/widgets/infinite-select/example';
import BuyMeACoffee from '@/components/widgets/buy-me-a-coffee';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CodeBlock } from '@/components/widgets/component-preview/code-block';
import { InfiniteSelectStringCode } from '@/components/widgets/infinite-select';

export default function Page() {
  return (
    <div className='flex min-h-screen'>
      {/* Main content */}
      <div className='flex-1'>
        <div className='mx-auto max-w-4xl space-y-8 p-8'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold'>Infinite Scroll</h1>
            <p className='text-lg text-muted-foreground'>
              Simple select infinite scroll component. You have fully control over the
              loading skeleton, search and IntersectionObserver API.
            </p>
          </div>

          <ComponentPreview
            code={codeString}
            preview={<InfiniteSelectExample />}
          />

          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-semibold'>Installation</h2>
              <Button
                variant='ghost'
                size='icon'>
                <LinkIcon className='h-4 w-4' />
              </Button>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='flex h-6 w-6 items-center justify-center rounded-full border'>
                  1
                </div>
                <p>Copy and paste the following code into your project.</p>
              </div>
              <code className='bg-slate-200'>InfiniteSelect.tsx</code>

              <div className='relative'>
                <pre className='mb-4 mt-4 overflow-x-auto rounded-lg border bg-muted p-4'>
                  <ScrollArea className='h-96'>
                    <CodeBlock
                      language='jsx'
                      value={InfiniteSelectStringCode}
                    />
                  </ScrollArea>
                </pre>
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-4 top-4'>
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-semibold'>Properties</h2>
              <Button
                variant='ghost'
                size='icon'>
                <LinkIcon className='h-4 w-4' />
              </Button>
            </div>
            <div className='rounded-lg border'>
              <div className='grid grid-cols-3 gap-4 p-4 font-medium'>
                <div>Property</div>
                <div>Type</div>
                <div>Default</div>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t p-4'>
                <div className='font-mono text-sm'>value</div>
                <div className='font-mono text-sm'>Option[]</div>
                <div className='font-mono text-sm text-red-500'>x</div>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t p-4'>
                <div className='font-mono text-sm'>setValue</div>
                <div className='font-mono text-sm'>
                  {'(value: Option[]) => void'}
                </div>
                <div className='font-mono text-sm text-red-500'>x</div>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t p-4'>
                <div className='font-mono text-sm'>fetchData</div>
                <div className='font-mono text-sm'>
                  {'(page: number, searchTerm?: string) => Promise<Option[]>'}
                </div>
                <div className='font-mono text-sm text-red-500'>x</div>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t p-4'>
                <div className='font-mono text-sm'>perPage</div>
                <div className='font-mono text-sm'>number</div>
                <div className='font-mono text-sm'>10</div>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t p-4'>
                <div className='font-mono text-sm'>children</div>
                <div className='font-mono text-sm'>React.ReactNode</div>
                <div className='font-mono text-sm text-red-500'>x</div>
              </div>
            </div>
          </div>

          <div className='pt-6'>
            <BuyMeACoffee />
          </div>
        </div>
      </div>
    </div>
  );
}
