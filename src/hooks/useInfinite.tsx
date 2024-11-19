import { useEffect, useRef } from 'react';

const useInfinite = (loadMoreData: VoidFunction, hasNextPage: boolean) => {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          try {
            loadMoreData();
          } catch (err) {
            console.log(err);
          }
        }
      },
      { threshold: 1.0 },
    );

    // 타겟이 마운트되서 ref 객체에 참조 객체가 생기면
    const ref = loadMoreRef.current;
    if (ref) {
      observer.observe(ref);
    }
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [loadMoreData]);

  return { loadMoreRef };
};

export default useInfinite;
