/**
 * Vertex UI Utilities
 * Framework-agnostic helpers.
 */

/**
 * Composes multiple event handlers into a single handler.
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

/**
 * Merges multiple refs into a single ref callback.
 */
export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Clamps a value between a minimum and maximum.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounces a function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Throttles a function.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Deep merges multiple objects.
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: unknown[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Creates a typed React context with a custom hook.
 */
import * as React from 'react';

export function createContext<ContextValueType>(
  rootComponentName: string,
  defaultContext?: ContextValueType
) {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

  function useContext(consumerName?: string) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error(`\`${consumerName || rootComponentName}\` must be used within \`${rootComponentName}\``);
  }

  Context.displayName = rootComponentName + 'Context';
  return [Context.Provider, useContext] as const;
}

/**
 * Checks if a value is an HTMLElement.
 */
export function isHTMLElement(element: unknown): element is HTMLElement {
  return element instanceof HTMLElement;
}

/**
 * Checks if an element is focusable.
 */
export function isFocusable(element: HTMLElement): boolean {
  if (!element) return false;
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexSet = element.hasAttribute('tabindex');
  const isNotDisabled = !((element as unknown) as { disabled?: boolean }).disabled;

  if (nodeName === 'a' || nodeName === 'button' || nodeName === 'input' || nodeName === 'textarea' || nodeName === 'select') {
    return isNotDisabled;
  }

  return isTabIndexSet;
}
