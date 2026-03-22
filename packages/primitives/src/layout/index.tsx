import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Box
 * A low-level component that supports the `as` prop for polymorphism.
 */
export const Box = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    props: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive {...props} ref={ref} />;
  }
);

Box.displayName = 'Box';

/**
 * Container
 */
export const Container = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    props: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive {...props} ref={ref} />;
  }
);

Container.displayName = 'Container';

/**
 * Flex
 */
export const Flex = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{ display: 'flex', ...style }}
      />
    );
  }
);

Flex.displayName = 'Flex';

/**
 * Grid
 */
export const Grid = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{ display: 'grid', ...style }}
      />
    );
  }
);

Grid.displayName = 'Grid';

/**
 * Stack
 */
export const Stack = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', ...style }}
      />
    );
  }
);

Stack.displayName = 'Stack';

/**
 * Inline
 */
export const Inline = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', ...style }}
      />
    );
  }
);

Inline.displayName = 'Inline';

/**
 * Center
 */
export const Center = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { style, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      />
    );
  }
);

Center.displayName = 'Center';

/**
 * AspectRatio
 */
export interface AspectRatioProps {
  ratio?: number;
}

export const AspectRatio = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { ratio = 1, style, children, ...props }: PolymorphicComponentPropsWithRef<E, AspectRatioProps>,
    ref: React.Ref<unknown>
  ) => {
    return (
      <Primitive
        {...props}
        ref={ref}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </Primitive>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';
