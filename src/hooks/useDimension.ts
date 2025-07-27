import { RefObject, useEffect, useRef } from "react";


export const useDimensions = (ref: RefObject<HTMLElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current?.offsetWidth || 0;
    dimensions.current.height = ref.current?.offsetHeight || 0;
  }, [ref]);

  return dimensions.current;
};
