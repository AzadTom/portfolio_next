import { useState, useEffect, useRef, useCallback, cache } from "react";

export function useDebounce(value: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if value changes before delay, clear timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type CacheStore<T> = Map<string, T>;

export function useCache<T>(maxSize: number = 50) {
  const cacheRef = useRef<CacheStore<T>>(new Map());

  const get = useCallback((key: string): T | undefined => {
    const value = cacheRef.current.get(key);
    if (!value) return undefined;
    cacheRef.current.delete(key);
    cacheRef.current.set(key, value);
    return value;
  }, []);

  const set = useCallback(
    (key: string, value: T) => {
      const cache = cacheRef.current;

      if (!cache.has(key) && cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        if (firstKey) {
          cache.delete(firstKey);
        }
      }

      cache.set(key, value);
    },
    [maxSize]
  );

  const has = useCallback((key: string) => cacheRef.current.has(key), []);
  const clear = useCallback(() => cacheRef.current.clear(), []);

  return { get, set, has, clear };
}
