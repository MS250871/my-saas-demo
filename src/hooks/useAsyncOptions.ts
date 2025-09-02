import { useState, useEffect } from 'react';

type OptionType = { id: number; name: string };

export function useAsyncOptions<T extends OptionType>(
  fetchFn: (input: string) => Promise<T[]>,
  deps: any[] = [],
  defaultInput = ''
) {
  const [input, setInput] = useState(defaultInput);
  const [options, setOptions] = useState<T[]>([]);
  useEffect(() => {
    let isActive = true;
    fetchFn(input).then((opts) => {
      if (isActive) setOptions(opts);
    });
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line
  }, [input, ...deps]);
  return { options, input, setInput };
}
