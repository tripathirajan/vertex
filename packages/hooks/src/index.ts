import * as React from 'react';

/**
 * useIsomorphicLayoutEffect
 * Uses useLayoutEffect on client and useEffect on server.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * useSafeLayoutEffect
 * A safe version of useLayoutEffect that doesn't warn on the server.
 */
export const useSafeLayoutEffect = useIsomorphicLayoutEffect;

/**
 * useMounted
 * Returns true if the component is mounted.
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted;
}

/**
 * usePrevious
 * Stores the previous value of a variable.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * useId
 * Generates a unique ID.
 */
export function useId(idProp?: string) {
  const [id, setId] = React.useState(idProp);
  const reactId = React.useId();
  useIsomorphicLayoutEffect(() => {
    if (!idProp) setId(reactId);
  }, [idProp, reactId]);
  return idProp || id;
}

/**
 * useBoolean
 * A hook to manage a boolean state.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const on = React.useCallback(() => setValue(true), []);
  const off = React.useCallback(() => setValue(false), []);
  const toggle = React.useCallback(() => setValue((v) => !v), []);
  return [value, { on, off, toggle, setValue }] as const;
}

/**
 * useToggle
 * Similar to useBoolean but simpler.
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}

/**
 * useStableCallback
 * Returns a stable callback that always has access to the latest props/state.
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = React.useRef(callback);
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return React.useCallback((...args: any[]) => callbackRef.current?.(...args), []) as T;
}

/**
 * useEvent
 * Alias for useStableCallback.
 */
export const useEvent = useStableCallback;

/**
 * useEventListener
 * Attaches an event listener to an element.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement | null = typeof window !== 'undefined' ? window : null,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useStableCallback(handler);

  React.useEffect(() => {
    if (!element) return;
    const targetElement: EventTarget = element;
    if (!targetElement.addEventListener) return;

    const eventListener = (event: Event) => savedHandler(event as any);
    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options, savedHandler]);
}

/**
 * useControllableState
 * Manages state that can be either controlled or uncontrolled.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}) {
  const [uncontrolledProp, setUncontrolledProp] = React.useState(defaultProp as T);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useStableCallback(onChange);

  const setValue = React.useCallback(
    (nextValue: T | ((prevState: T) => T)) => {
      if (isControlled) {
        const setter = nextValue as (prevState: T) => T;
        const valueToCall = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (valueToCall !== prop) handleChange(valueToCall);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, handleChange]
  );

  return [value, setValue] as const;
}

/**
 * useClickOutside
 * Detects clicks outside of a specified element.
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEventListener('mousedown', (event) => {
    const el = ref.current;
    if (!el || el.contains(event.target as Node)) return;
    handler(event);
  });
  useEventListener('touchstart', (event) => {
    const el = ref.current;
    if (!el || el.contains(event.target as Node)) return;
    handler(event);
  });
}

/**
 * useMediaQuery
 * Returns true if the media query matches.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
}

/**
 * useResizeObserver
 * Observes an element's size changes.
 */
export function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: (entry: ResizeObserverEntry) => void
) {
  const savedCallback = useStableCallback(callback);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      savedCallback(entries[0]);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, savedCallback]);
}

/**
 * useIntersectionObserver
 * Observes an element's intersection with its parent or viewport.
 */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: IntersectionObserverInit = {},
  callback?: (entry: IntersectionObserverEntry) => void
) {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
  const savedCallback = useStableCallback(callback);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      savedCallback?.(entry);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options.root, options.rootMargin, options.threshold, savedCallback]);

  return entry;
}

/**
 * useLocalStorage
 * Syncs state with localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * useScrollLock
 * Prevents body scrolling.
 */
export function useScrollLock(lock: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!lock) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}

/**
 * useFocusTrap
 * Traps focus within an element.
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  React.useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, active]);
}

/**
 * useDebounce
 * Returns a debounced version of a value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
