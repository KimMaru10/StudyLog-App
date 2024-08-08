import { useEffect, useRef, MutableRefObject } from "react";

interface UseInfiniteScrollProps {
  callback: () => void;
  hasMore: boolean;
  threshold?: number;
  root?: null | Element;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  threshold = 0.5,
  root = null,
  rootMargin = "0px",
}: UseInfiniteScrollProps): MutableRefObject<null | HTMLDivElement> => {
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();

    const options = {
      root,
      rootMargin,
      threshold,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, hasMore, threshold, root, rootMargin]);

  return bottomRef;
};
