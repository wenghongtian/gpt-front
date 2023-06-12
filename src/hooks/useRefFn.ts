import { useCallback, useRef } from "react";

export default function useRefFn<T extends (...args: any) => any>(cb: T) {
  const fnRef = useRef(cb);

  fnRef.current = cb;

  const fn = useCallback((...args: any[]) => {
    fnRef.current(...args);
  }, []);

  return fn as T;
}
