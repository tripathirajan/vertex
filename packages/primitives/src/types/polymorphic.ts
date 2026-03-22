import * as React from 'react';

export type PolymorphicRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>['ref'];

export type PolymorphicProps<E extends React.ElementType, P = object> = P & {
  as?: E;
  asChild?: boolean;
};

export type PolymorphicComponentProps<E extends React.ElementType, P = object> = PolymorphicProps<E, P> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof PolymorphicProps<E, P>>;

export type PolymorphicComponentPropsWithRef<E extends React.ElementType, P = object> = PolymorphicComponentProps<E, P> & {
  ref?: PolymorphicRef<E>;
};
