'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Anchor component
type AnchorProps = {
  next: (page: number) => Promise<boolean>;
};

const Anchor = ({ next }: AnchorProps) => {
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  let page = 1;

  useEffect(() => {
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

// InfiniteScroll component
interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  fetchData: (page: number, searchTerm?: string) => Promise<T[]>;
  perPage?: number;
  row: (record: T) => React.ReactNode;
}

let latestID = 0;

const InfiniteScroll = <T,>({
  className,
  fetchData,
  perPage = 10,
  row,
}: Props<T>) => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<T[]>([]);

  const [isVisibleLoadingMore, setIsVisibleLoadingMore] = useState(true);

  const handleNext = useCallback(
    async (page: number) => {
      setLoading(true);

      latestID++;
      const currentID = latestID;

      const data = await fetchData(page);

      if (currentID !== latestID) {
        return false;
      }

      setRecords((prev) => [...prev, ...data]);

      const hasMore = data.length === perPage;

      if (!hasMore) {
        setIsVisibleLoadingMore(false);
      }

      setLoading(false);

      return hasMore;
    },
    [fetchData, perPage],
  );

  return (
    <div className={cn('w-full h-56 border p-4 overflow-auto', className)}>
      {records?.map((m) => row(m))}

      {isVisibleLoadingMore && <Anchor next={handleNext} />}

      {loading &&
        [...Array(5)].map((_, index) => (
          <div
            key={index}
            className='p-2'>
            <Skeleton className='h-5 w-full' />
          </div>
        ))}
      {!records.length && !loading && (
        <div className='py-6 text-center text-sm'>{'No results found.'}</div>
      )}
    </div>
  );
};

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;

export const InfiniteScrollStringCode = `
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Anchor component
type AnchorProps = {
  next: (page: number) => Promise<boolean>;
};

const Anchor = ({ next }: AnchorProps) => {
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  let page = 1;

  useEffect(() => {
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

// InfiniteScroll component
interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  fetchData: (page: number, searchTerm?: string) => Promise<T[]>;
  perPage?: number;
  row: (record: T) => React.ReactNode;
}

let latestID = 0;

const InfiniteScroll = <T,>({
  className,
  fetchData,
  perPage = 10,
  row,
}: Props<T>) => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<T[]>([]);

  const [isVisibleLoadingMore, setIsVisibleLoadingMore] = useState(true);

  const handleNext = useCallback(
    async (page: number) => {
      setLoading(true);

      latestID++;
      const currentID = latestID;

      const data = await fetchData(page);

      if (currentID !== latestID) {
        return false;
      }

      setRecords((prev) => [...prev, ...data]);

      const hasMore = data.length === perPage;

      if (!hasMore) {
        setIsVisibleLoadingMore(false);
      }

      setLoading(false);

      return hasMore;
    },
    [fetchData, perPage],
  );

  return (
    <div className={cn('w-full h-56 border p-4 overflow-auto', className)}>
      {records?.map((m) => row(m))}

      {isVisibleLoadingMore && <Anchor next={handleNext} />}

      {loading &&
        [...Array(5)].map((_, index) => (
          <div
            key={index}
            className='p-2'>
            <Skeleton className='h-5 w-full' />
          </div>
        ))}
      {!records.length && !loading && (
        <div className='py-6 text-center text-sm'>{'No results found.'}</div>
      )}
    </div>
  );
};

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
`;
