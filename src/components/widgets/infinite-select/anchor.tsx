import React, { useRef, useEffect, useState } from 'react';

type Props = {
  next: (page: number) => Promise<boolean>;
};

const Anchor = ({ next }: Props) => {
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
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

export default Anchor;
