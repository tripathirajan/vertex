import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';
import { useFocusTrap } from '@vertex-lab/hooks';
import { createContext, mergeRefs } from '@vertex-lab/utilities';

/**
 * VisuallyHidden
 */
export const VisuallyHidden = React.forwardRef(
  <E extends React.ElementType = 'span'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        as="span"
        {...props}
        ref={ref}
        style={{
          position: 'absolute',
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          ...style,
        }}
      />
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

/**
 * ScreenReaderOnly
 */
export const ScreenReaderOnly = VisuallyHidden;

/**
 * FocusScope
 */
export interface FocusScopeProps {
  trapped?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
}

export const FocusScope = React.forwardRef<HTMLElement, FocusScopeProps & { children: React.ReactNode }>(
  ({ trapped = false, onMountAutoFocus, onUnmountAutoFocus, children }, ref) => {
    const containerRef = React.useRef<HTMLElement>(null);
    const mergedRef = mergeRefs(ref, containerRef);

    useFocusTrap(containerRef, trapped);

    React.useEffect(() => {
      if (trapped && onMountAutoFocus) {
        onMountAutoFocus(new Event('mount'));
      }
      return () => {
        if (trapped && onUnmountAutoFocus) {
          onUnmountAutoFocus(new Event('unmount'));
        }
      };
    }, [trapped, onMountAutoFocus, onUnmountAutoFocus]);

    return <div ref={mergedRef as any}>{children}</div>;
  }
);

FocusScope.displayName = 'FocusScope';

/**
 * FocusTrap
 */
export const FocusTrap = (props: FocusScopeProps & { children: React.ReactNode }) => (
  <FocusScope {...props} trapped />
);

FocusTrap.displayName = 'FocusTrap';

/**
 * FocusGuard
 */
export const FocusGuard = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  (props, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        data-vertex-focus-guard=""
        tabIndex={0}
        style={{
          position: 'fixed',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    );
  }
);

FocusGuard.displayName = 'FocusGuard';

/**
 * FocusRing
 */
export const FocusRing = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

FocusRing.displayName = 'FocusRing';

/**
 * FocusVisible
 */
export const FocusVisible = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

FocusVisible.displayName = 'FocusVisible';

/**
 * AriaLive
 */
export interface AriaLiveProps {
  politeness?: 'polite' | 'assertive' | 'off';
}

export const AriaLive = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { politeness = 'polite', ...props }: PolymorphicComponentPropsWithRef<E, AriaLiveProps>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive {...props} ref={ref} aria-live={politeness} />;
  }
);

AriaLive.displayName = 'AriaLive';

/**
 * AriaAnnouncer
 */
export const AriaAnnouncer = AriaLive;

/**
 * DirectionProvider
 */
export type Direction = 'ltr' | 'rtl';
const [DirectionProviderInternal, useDirection] = createContext<Direction>('DirectionProvider', 'ltr');

export const DirectionProvider = ({
  direction = 'ltr',
  children,
}: {
  direction?: Direction;
  children: React.ReactNode;
}) => {
  return <DirectionProviderInternal value={direction}>{children}</DirectionProviderInternal>;
};

DirectionProvider.displayName = 'DirectionProvider';

export { useDirection };

/**
 * IdProvider
 */
export const IdProvider = ({ children }: { children: React.ReactNode }) => {
  const id = React.useId();
  return <React.Fragment key={id}>{children}</React.Fragment>;
};

IdProvider.displayName = 'IdProvider';
