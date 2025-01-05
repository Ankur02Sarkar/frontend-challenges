type DebouncedFunction<T extends unknown[]> = (...args: T) => void;
// ...args is a rest parameter that collects all arguments ito an array
// thus [] is used, unknown is used instead of any because its more typesafe

export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): DebouncedFunction<T> => {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    // ...args collects all args to an array to be passed to callback later
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
