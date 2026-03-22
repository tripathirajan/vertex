import * as React from 'react';
import { mergeRefs } from '@vertex-lab/utilities';

/**
 * Slot
 * Merges its props onto its immediate child.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const child = children as any;
      return React.cloneElement(child, {
        ...props,
        ...child.props,
        ref: ref ? mergeRefs(ref, child.ref) : child.ref,
      } as React.Attributes);
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  }
);

Slot.displayName = 'Slot';
