import * as React from 'react';
import { Slot } from './Slot';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Primitive
 * A low-level component that supports the `as` prop for polymorphism.
 */
export const Primitive = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, asChild, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    const Component: React.ElementType = asChild ? Slot : as || 'div';

    return <Component {...props} ref={ref} />;
  }
);

Primitive.displayName = 'Primitive';
