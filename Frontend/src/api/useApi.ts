import { useEffect, useRef, useState } from "react";
import { http } from "./http";

type UseApiState<T> = {
  data?: T;
  loading: boolean;
  error?: string;
};

const cache = new Map<string, unknown>();

export function useApi<T>(key: string | null) {
  const [state, setState] = useState<UseApiState<T>>({ loading: !!key });
  const keyRef = useRef(key);

  useEffect(() => {
    if (!key) return;
    keyRef.current = key;

    if (cache.has(key)) {
      setState({ loading: false, data: cache.get(key) as T });
      return;
    }

    let canceled = false;
    setState({ loading: true });

    http.get<T>(key)
      .then((data) => {
        if (canceled) return;
        cache.set(key, data);
        setState({ loading: false, data });
      })
      .catch((err: Error) => {
        if (canceled) return;
        setState({ loading: false, error: err.message });
      });

    return () => { canceled = true; };
  }, [key]);

  return state;
}

export function invalidate(keyPrefix: string) {
  for (const k of cache.keys()) {
    if (k.startsWith(keyPrefix)) cache.delete(k);
  }
}
