import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Text
 */
export const Text = React.forwardRef(
  <E extends React.ElementType = 'span'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'span'} {...props} ref={ref} />;
  }
);

Text.displayName = 'Text';

/**
 * Heading
 */
export const Heading = React.forwardRef(
  <E extends React.ElementType = 'h2'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'h2'} {...props} ref={ref} />;
  }
);

Heading.displayName = 'Heading';

/**
 * Paragraph
 */
export const Paragraph = React.forwardRef(
  <E extends React.ElementType = 'p'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'p'} {...props} ref={ref} />;
  }
);

Paragraph.displayName = 'Paragraph';

/**
 * Span
 */
export const Span = React.forwardRef(
  <E extends React.ElementType = 'span'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'span'} {...props} ref={ref} />;
  }
);

Span.displayName = 'Span';

/**
 * Code
 */
export const Code = React.forwardRef(
  <E extends React.ElementType = 'code'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'code'} {...props} ref={ref} />;
  }
);

Code.displayName = 'Code';

/**
 * Pre
 */
export const Pre = React.forwardRef(
  <E extends React.ElementType = 'pre'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'pre'} {...props} ref={ref} />;
  }
);

Pre.displayName = 'Pre';

/**
 * Link
 */
export const Link = React.forwardRef(
  <E extends React.ElementType = 'a'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'a'} {...props} ref={ref} />;
  }
);

Link.displayName = 'Link';
