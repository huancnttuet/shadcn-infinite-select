'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, FilterIcon, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Anchor from './anchor';
import { Button } from '../ui/button';
import DebouncedInput from './debounced-input';
import { Option } from '@/types/common';

interface InfiniteScrollProps {
  value?: string[];
  onConfirm?: (value: Option[]) => void;
  options?: Option[];
  fetchData: (
    page: number,
    searchTerm?: string,
  ) => Promise<{ options: Option[]; hasMore: boolean }>;
}

const stack: unknown[] = [];

const InfiniteSelect = React.forwardRef<HTMLInputElement, InfiniteScrollProps>(
  ({ fetchData, onConfirm, value = [] }, ref) => {
    const [currentValue, setCurrentValue] = useState<string[]>(value);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [options, setOptions] = React.useState<Option[]>([]);

    const [isVisibleLoadingMore, setIsVisibleLoadingMore] =
      React.useState(true);

    const handleSelect = (selectedValue: string) => {
      const newValue =
        currentValue?.includes(selectedValue) && Array.isArray(currentValue)
          ? currentValue.filter((v) => v !== selectedValue)
          : [...(currentValue ?? []), selectedValue];
      setCurrentValue(newValue);
    };

    const handleNext = async (page: number) => {
      const id = new Date().getTime();
      stack.push(id);

      setLoading(true);
      const { options, hasMore } = await fetchData(page, searchTerm);

      if (stack[stack.length - 1] !== id) {
        return false;
      }

      setOptions((prev) => [...prev, ...options]);

      if (!hasMore) {
        setIsVisibleLoadingMore(false);
      }

      setLoading(false);
      return hasMore;
    };

    useEffect(() => {
      setIsVisibleLoadingMore(true);
    }, [searchTerm]);

    useEffect(() => {
      if (!open) {
        setIsVisibleLoadingMore(false);
        setSearchTerm('');
      } else {
        setOptions([]);
        setCurrentValue(value);
      }
    }, [open]);

    return (
      <Popover
        modal={true}
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FilterIcon
            onClick={() => setIsVisibleLoadingMore(true)}
            className='cursor-pointer size-4'
          />
        </PopoverTrigger>
        <PopoverContent
          ref={ref}
          className='w-96 p-0'
          align='start'>
          <Command shouldFilter={false}>
            <div className='relative'>
              <div
                className='flex items-center border-b px-3'
                cmdk-input-wrapper=''>
                <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                <DebouncedInput
                  className='border-none focus-visible:outline-none w-full h-12'
                  value={searchTerm}
                  onChange={(e) => {
                    setOptions([]);
                    setIsVisibleLoadingMore(false);
                    setSearchTerm(e as string);
                  }}
                />
              </div>
            </div>
            <CommandList className='scrollbar'>
              <CommandGroup>
                <ScrollArea>
                  {options?.map((option) => {
                    const isSelected =
                      Array.isArray(currentValue) &&
                      currentValue.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => handleSelect(option.value)}>
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible',
                          )}>
                          <CheckIcon />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}

                  {open && isVisibleLoadingMore && <Anchor next={handleNext} />}

                  {loading &&
                    [...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className='p-2'>
                        <Skeleton className='h-5 w-full' />
                      </div>
                    ))}

                  {!options.length && !loading && (
                    <div className='py-6 text-center text-sm'>
                      {'No results found.'}
                    </div>
                  )}
                </ScrollArea>
              </CommandGroup>
            </CommandList>

            <CommandItem>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setOpen(false)}
                className='w-full'>
                Close
              </Button>

              <Button
                onClick={() => {
                  onConfirm?.(
                    options.filter((f) => currentValue.includes(f.value)),
                  );
                  setOpen(false);
                }}
                size='sm'
                className='w-full'>
                Submit
              </Button>
            </CommandItem>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

InfiniteSelect.displayName = 'InfiniteSelect';

export default InfiniteSelect;
