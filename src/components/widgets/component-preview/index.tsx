'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Icons } from '../../ui/icon';
import { CopyButton } from './copy-button';
import { CodeBlock } from '@/components/widgets/component-preview/code-block';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'start' | 'end';
  hideCode?: boolean;
  type?: 'block' | 'component' | 'example';
  code: string;
  preview: React.ReactNode;
}

export function ComponentPreview({
  className,
  hideCode = false,
  preview,
  code = '',
  ...props
}: ComponentPreviewProps) {
  const CopyBtn = React.memo(() => (
    <div className='absolute top-0 right-0 flex justify-end p-4'>
      <div className='flex items-center gap-2'>
        <CopyButton
          value={code}
          variant='outline'
          className='h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5'
        />
      </div>
    </div>
  ));

  CopyBtn.displayName = 'CopyBtn';

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
      {...props}>
      <Tabs
        defaultValue='preview'
        className='relative mr-auto w-full'>
        <div className='flex items-center justify-between pb-3'>
          {!hideCode && (
            <TabsList className='w-full justify-start rounded-none border-b bg-transparent p-0'>
              <TabsTrigger
                value='preview'
                className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'>
                Preview
              </TabsTrigger>
              <TabsTrigger
                value='code'
                className='relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'>
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent
          value='preview'
          className='relative rounded-md border'>
          {/* <CopyBtn /> */}

          <ScrollArea className='h-96'>
            <React.Suspense
              fallback={
                <div className='flex w-full items-center justify-center text-sm text-muted-foreground'>
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  Loading...
                </div>
              }>
              {preview}
            </React.Suspense>
          </ScrollArea>
        </TabsContent>
        <TabsContent
          value='code'
          className='relative rounded-md border'>
          <div className='flex flex-col space-y-4'>
            <CopyBtn />

            <ScrollArea className='h-96'>
              <CodeBlock
                language='jsx'
                value={code}
              />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
