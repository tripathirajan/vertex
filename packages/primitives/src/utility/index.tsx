import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';
import { createContext } from '@vertex-lab/utilities';

/**
 * Separator
 */
export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
}

export const Separator = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, orientation = 'horizontal', ...props }: PolymorphicComponentPropsWithRef<E, SeparatorProps>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        as={as || 'div'}
        role="separator"
        aria-orientation={orientation}
        {...props}
        ref={ref}
      />
    );
  }
);

Separator.displayName = 'Separator';

/**
 * Divider
 */
export const Divider = Separator;

/**
 * Anchor
 */
export const Anchor = React.forwardRef(
  <E extends React.ElementType = 'a'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'a'} {...props} ref={ref} />;
  }
);

Anchor.displayName = 'Anchor';

/**
 * AnchorProvider
 */
const [AnchorProviderInternal, useAnchor] = createContext<HTMLElement | null>('AnchorProvider', null);

export const AnchorProvider = ({
  children,
  anchor,
}: {
  children: React.ReactNode;
  anchor: HTMLElement | null;
}) => {
  return <AnchorProviderInternal value={anchor}>{children}</AnchorProviderInternal>;
};

AnchorProvider.displayName = 'AnchorProvider';

export { useAnchor };
