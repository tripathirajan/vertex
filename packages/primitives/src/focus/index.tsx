import * as React from 'react';
import { createContext } from '@vertex-lab/utilities';
import { useStableCallback } from '@vertex-lab/hooks';
import { Slot } from '../structure/Slot';

/**
 * RovingFocusGroup
 */
interface RovingFocusContextValue {
  currentValue: string | null;
  onItemFocus: (value: string) => void;
  onItemKeyDown: (event: React.KeyboardEvent, value: string) => void;
  registerItem: (value: string, element: HTMLElement) => void;
  unregisterItem: (value: string) => void;
}

const [RovingFocusProvider, useRovingFocusContext] = createContext<RovingFocusContextValue>('RovingFocusGroup');

export interface RovingFocusGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
}

export const RovingFocusGroup = ({
  children,
  orientation = 'horizontal',
  loop = true,
}: RovingFocusGroupProps) => {
  const [currentValue, setCurrentValue] = React.useState<string | null>(null);
  const itemsRef = React.useRef<Map<string, HTMLElement>>(new Map());

  const registerItem = React.useCallback((value: string, element: HTMLElement) => {
    itemsRef.current.set(value, element);
  }, []);

  const unregisterItem = React.useCallback((value: string) => {
    itemsRef.current.delete(value);
  }, []);

  const onItemFocus = useStableCallback((value: string) => {
    setCurrentValue(value);
  });

  const onItemKeyDown = useStableCallback((event: React.KeyboardEvent, value: string) => {
    const items = Array.from(itemsRef.current.entries());
    const currentIndex = items.findIndex(([v]) => v === value);
    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (orientation === 'horizontal' && event.key === 'ArrowLeft') nextIndex = currentIndex - 1;
        if (orientation === 'vertical' && event.key === 'ArrowUp') nextIndex = currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (orientation === 'horizontal' && event.key === 'ArrowRight') nextIndex = currentIndex + 1;
        if (orientation === 'vertical' && event.key === 'ArrowDown') nextIndex = currentIndex + 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
    }

    if (nextIndex !== -1) {
      if (loop) {
        nextIndex = (nextIndex + items.length) % items.length;
      } else {
        nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
      }

      const nextItem = items[nextIndex]?.[1];
      nextItem?.focus();
      event.preventDefault();
    }
  });

  return (
    <RovingFocusProvider
      value={{ currentValue, onItemFocus, onItemKeyDown, registerItem, unregisterItem }}
    >
      <div onBlur={() => setCurrentValue(null)} style={{ outline: 'none' }}>
        {children}
      </div>
    </RovingFocusProvider>
  );
};

RovingFocusGroup.displayName = 'RovingFocusGroup';

export interface FocusItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const FocusItem = React.forwardRef<HTMLElement, FocusItemProps>(
  ({ value, children, disabled }, ref) => {
    const context = useRovingFocusContext();
    const internalRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      if (internalRef.current && !disabled) {
        context.registerItem(value, internalRef.current);
        return () => context.unregisterItem(value);
      }
      return undefined;
    }, [value, disabled, context]);

    const isFocused = context.currentValue === value;

    const setRef = React.useCallback(
      (node: HTMLElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
        (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
      },
      [ref]
    );

    const onFocus = React.useCallback(
      () => {
        context.onItemFocus(value);
      },
      [value, context]
    );

    const onKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        context.onItemKeyDown(e, value);
      },
      [value, context]
    );

    return (
      <Slot
        ref={setRef}
        tabIndex={isFocused ? 0 : -1}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      >
        {children}
      </Slot>
    );
  }
);

FocusItem.displayName = 'FocusItem';

/**
 * FocusGroup
 */
export const FocusGroup = RovingFocusGroup;

/**
 * FocusManager
 */
export const FocusManager = {
  focusFirst: (container: HTMLElement) => {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable[0] as HTMLElement | undefined)?.focus();
  },
  focusLast: (container: HTMLElement) => {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable[focusable.length - 1] as HTMLElement | undefined)?.focus();
  },
};

/**
 * TabScope
 */
export const TabScope = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

TabScope.displayName = 'TabScope';
