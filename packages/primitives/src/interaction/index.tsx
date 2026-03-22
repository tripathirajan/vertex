import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';
import { useClickOutside, useEventListener } from '@vertex-lab/hooks';
import { mergeRefs } from '@vertex-lab/utilities';

/**
 * Pressable
 */
export const Pressable = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'button'} {...props} ref={ref} />;
  }
);

Pressable.displayName = 'Pressable';

/**
 * Hoverable
 */
export const Hoverable = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} {...props} ref={ref} />;
  }
);

Hoverable.displayName = 'Hoverable';

/**
 * Focusable
 */
export const Focusable = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} tabIndex={0} {...props} ref={ref} />;
  }
);

Focusable.displayName = 'Focusable';

/**
 * Clickable
 */
export const Clickable = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'button'} {...props} ref={ref} />;
  }
);

Clickable.displayName = 'Clickable';

/**
 * Draggable
 */
export const Draggable = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} draggable {...props} ref={ref} />;
  }
);

Draggable.displayName = 'Draggable';

/**
 * Droppable
 */
export const Droppable = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} {...props} ref={ref} />;
  }
);

Droppable.displayName = 'Droppable';

/**
 * DismissableLayer
 */
export interface DismissableLayerProps {
  onDismiss?: () => void;
  children: React.ReactNode;
}

export const DismissableLayer = React.forwardRef<HTMLDivElement, DismissableLayerProps>(
  ({ onDismiss, children, ...props }, ref) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = mergeRefs(ref, internalRef);

    useClickOutside(internalRef, () => onDismiss?.());
    useEventListener('keydown', (event) => {
      if (event.key === 'Escape') onDismiss?.();
    });

    return (
      <div ref={combinedRef as any} {...props}>
        {children}
      </div>
    );
  }
);

DismissableLayer.displayName = 'DismissableLayer';

/**
 * OutsideClickHandler
 */
export const OutsideClickHandler = ({
  onOutsideClick,
  children,
}: {
  onOutsideClick: () => void;
  children: React.ReactNode;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, onOutsideClick);
  return <div ref={ref}>{children}</div>;
};

OutsideClickHandler.displayName = 'OutsideClickHandler';

/**
 * EscapeKeyHandler
 */
export const EscapeKeyHandler = ({
  onEscape,
  children,
}: {
  onEscape: () => void;
  children: React.ReactNode;
}) => {
  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') onEscape();
  });
  return <>{children}</>;
};

EscapeKeyHandler.displayName = 'EscapeKeyHandler';

/**
 * PointerHandler
 */
export const PointerHandler = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} {...props} ref={ref} />;
  }
);

PointerHandler.displayName = 'PointerHandler';

/**
 * KeyboardHandler
 */
export const KeyboardHandler = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'div'} {...props} ref={ref} />;
  }
);

KeyboardHandler.displayName = 'KeyboardHandler';
