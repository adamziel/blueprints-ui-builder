import { useState, useEffect, useRef } from "react";

export interface Config<Option> {
  url: string;
  disable?: boolean;
  debounceDelay?: number;
  responseToOptions: (responseData: any) => Option[];
}
export interface Result<Option> {
  options: Option[];
  loading: boolean;
}
const useAutocomplete = <Option>({
  disable,
  url,
  responseToOptions,
  debounceDelay = 300,
}: Config<Option>): Result<Option> => {
  const [data, setData] = useState<Option[] | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<any>(null);
  const controller = useRef<any>(null);

  useEffect(() => {
    if (disable === true) {
      setData(null);
      setLoading(false);
      return;
    }

    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          signal: controller.current.signal,
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }, debounceDelay);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      if (controller.current) {
        controller.current.abort();
      }
    };
  }, [disable, url, debounceDelay]);
    
  const options = !disable && data ? responseToOptions(data) || [] : [];

  return { options, loading };
};

export default useAutocomplete;
