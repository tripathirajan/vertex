import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMounted } from '@vertex-lab/hooks';
import { Primitive } from './Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Fragment
 */
export const Fragment = React.Fragment;

/**
 * Portal
 * Renders children into a DOM node that exists outside the DOM hierarchy of the parent component.
 */
export const Portal = ({ children, container }: { children: React.ReactNode; container?: HTMLElement | null }) => {
  const mounted = useMounted();

  if (!mounted) return null;
  return ReactDOM.createPortal(children, container || document.body);
};

Portal.displayName = 'Portal';

/**
 * Layer
 */
export const Layer = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    props: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive {...props} ref={ref} />;
  }
);

Layer.displayName = 'Layer';

/**
 * Boundary
 */
export interface BoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export class Boundary extends React.Component<BoundaryProps, { hasError: boolean }> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

/**
 * Presence
 * Controls mount/unmount for animation support.
 */
export const Presence = ({ present, children }: { present: boolean; children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = React.useState(present);

  React.useEffect(() => {
    if (present) {
      setShouldRender(true);
    } else {
      // In a real implementation, we'd wait for animations to finish
      setShouldRender(false);
    }
  }, [present]);

  if (!shouldRender) return null;
  return <>{children}</>;
};

Presence.displayName = 'Presence';

/**
 * PresenceTransition
 */
export const PresenceTransition = ({ present, children }: { present: boolean; children: React.ReactNode }) => {
  return <Presence present={present}>{children}</Presence>;
};

PresenceTransition.displayName = 'PresenceTransition';
