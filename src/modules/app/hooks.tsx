import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useComponentLoading = (
  delay: number,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return [isLoading, setIsLoading];
};
