'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// DebouncedInput component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 1000,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (!value) {
      return;
    }
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (!e.target.value) {
          onChange('');
        }
      }}
    />
  );
}

//Achor component
type AnchorProps = {
  next: (page: number) => Promise<boolean>;
};

const Anchor = ({ next }: AnchorProps) => {
  const loader = React.useRef(null);
  const [hasMore, setHasMore] = React.useState(true);

  let page = 1;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        next(page).then((has) => {
          setHasMore(has);

          if (has) {
            page++;
          }
        });
      }
    },
    { threshold: 1.0 },
  );

  React.useEffect(() => {
    if (loader.current) {
      observer.observe(loader.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <>
      {
        <div
          className={`flex justify-center ${!hasMore ? 'hidden' : ''}`}
          ref={loader}
          style={{ height: '10px', backgroundColor: 'transparent' }}></div>
      }
    </>
  );
};

// InfiniteSelect component
export interface Option {
  value: string;
  label: string;
}

interface Props {
  value: Option[];
  setValue: (value: Option[]) => void;
  fetchData: (page: number, searchTerm?: string) => Promise<Option[]>;
  children: React.ReactNode;
  perPage?: number;
}

const stack: unknown[] = [];

const InfiniteSelect = React.forwardRef<HTMLInputElement, Props>(
  ({ fetchData, setValue, value, children, perPage = 10 }, ref) => {
    const [tempValue, setTempValue] = useState<Option[]>(value);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [options, setOptions] = React.useState<Option[]>([]);

    const [isVisibleLoadingMore, setIsVisibleLoadingMore] =
      React.useState(true);

    const handleSelect = (selectedValue: Option) => {
      const newValue = tempValue?.find((f) => f.value === selectedValue.value)
        ? tempValue.filter((f) => f.value !== selectedValue.value)
        : [...(tempValue ?? []), selectedValue];
      setTempValue(newValue);
    };

    const handleNext = async (page: number) => {
      const id = new Date().getTime();
      stack.push(id);

      setLoading(true);
      const options = await fetchData(page, searchTerm);

      if (stack[stack.length - 1] !== id) {
        return false;
      }

      setOptions((prev) => [...prev, ...options]);

      const hasMore = options.length === perPage;

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
        setSearchTerm('');
      } else {
        setOptions([]);
        setIsVisibleLoadingMore(true);
        setTempValue(value);
      }
    }, [open]);

    return (
      <Popover
        modal={true}
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
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
            <CommandList>
              <ScrollArea>
                {options?.map((option) => {
                  const isSelected = tempValue.find(
                    (f) => f.value === option.value,
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}>
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
                  setValue(tempValue);
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


export const InfiniteSelectStringCode = `
'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// DebouncedInput component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 1000,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (!value) {
      return;
    }
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (!e.target.value) {
          onChange('');
        }
      }}
    />
  );
}

//Achor component
type AnchorProps = {
  next: (page: number) => Promise<boolean>;
};

const Anchor = ({ next }: AnchorProps) => {
  const loader = React.useRef(null);
  const [hasMore, setHasMore] = React.useState(true);

  let page = 1;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        next(page).then((has) => {
          setHasMore(has);

          if (has) {
            page++;
          }
        });
      }
    },
    { threshold: 1.0 },
  );

  React.useEffect(() => {
    if (loader.current) {
      observer.observe(loader.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <>
      {
        <div
          className={\`flex justify-center \${!hasMore ? 'hidden' : ''}\`}
          ref={loader}
          style={{ height: '10px', backgroundColor: 'transparent' }}></div>
      }
    </>
  );
};

// InfiniteSelect component
export interface Option {
  value: string;
  label: string;
}

interface Props {
  value: Option[];
  setValue: (value: Option[]) => void;
  fetchData: (page: number, searchTerm?: string) => Promise<Option[]>;
  children: React.ReactNode;
  perPage?: number;
}

const stack: unknown[] = [];

const InfiniteSelect = React.forwardRef<HTMLInputElement, Props>(
  ({ fetchData, setValue, value, children, perPage = 10 }, ref) => {
    const [tempValue, setTempValue] = useState<Option[]>(value);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [options, setOptions] = React.useState<Option[]>([]);

    const [isVisibleLoadingMore, setIsVisibleLoadingMore] =
      React.useState(true);

    const handleSelect = (selectedValue: Option) => {
      const newValue = tempValue?.find((f) => f.value === selectedValue.value)
        ? tempValue.filter((f) => f.value !== selectedValue.value)
        : [...(tempValue ?? []), selectedValue];
      setTempValue(newValue);
    };

    const handleNext = async (page: number) => {
      const id = new Date().getTime();
      stack.push(id);

      setLoading(true);
      const options = await fetchData(page, searchTerm);

      if (stack[stack.length - 1] !== id) {
        return false;
      }

      setOptions((prev) => [...prev, ...options]);

      const hasMore = options.length === perPage;

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
        setSearchTerm('');
      } else {
        setOptions([]);
        setIsVisibleLoadingMore(true);
        setTempValue(value);
      }
    }, [open]);

    return (
      <Popover
        modal={true}
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
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
            <CommandList>
              <ScrollArea>
                {options?.map((option) => {
                  const isSelected = tempValue.find(
                    (f) => f.value === option.value,
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}>
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
                  setValue(tempValue);
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
`
