import * as React from 'react';
import { useResizeObserver, useIntersectionObserver } from '@vertex-lab/hooks';
import { Slot } from '../structure/Slot';

/**
 * ResizeObserver
 */
export interface ResizeObserverProps {
  children: React.ReactNode;
  onResize: (entry: ResizeObserverEntry) => void;
}

export const ResizeObserver = ({ children, onResize }: ResizeObserverProps) => {
  const ref = React.useRef<HTMLElement>(null);
  useResizeObserver(ref, onResize);
  return <Slot ref={ref}>{children}</Slot>;
};

ResizeObserver.displayName = 'ResizeObserver';

/**
 * IntersectionObserver
 */
export interface IntersectionObserverProps {
  children: React.ReactNode;
  onIntersect: (entry: IntersectionObserverEntry) => void;
  options?: IntersectionObserverInit;
}

export const IntersectionObserver = ({
  children,
  onIntersect,
  options,
}: IntersectionObserverProps) => {
  const ref = React.useRef<HTMLElement>(null);
  useIntersectionObserver(ref, options, onIntersect);
  return <Slot ref={ref}>{children}</Slot>;
};

IntersectionObserver.displayName = 'IntersectionObserver';

/**
 * ScrollObserver
 */
export interface ScrollObserverProps {
  children: React.ReactNode;
  onScroll: (event: Event) => void;
}

export const ScrollObserver = ({ children, onScroll }: ScrollObserverProps) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.addEventListener('scroll', onScroll);
    return () => element.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return <Slot ref={ref}>{children}</Slot>;
};

ScrollObserver.displayName = 'ScrollObserver';

/**
 * ViewportObserver
 */
export interface ViewportObserverProps {
  children: React.ReactNode;
  onViewportChange: (entry: IntersectionObserverEntry) => void;
}

export const ViewportObserver = ({ children, onViewportChange }: ViewportObserverProps) => {
  const ref = React.useRef<HTMLElement>(null);
  useIntersectionObserver(ref, { threshold: [0, 1] }, onViewportChange);
  return <Slot ref={ref}>{children}</Slot>;
};

ViewportObserver.displayName = 'ViewportObserver';

/**
 * MutationObserver
 */
export interface MutationObserverProps {
  children: React.ReactNode;
  onMutation: (mutations: MutationRecord[]) => void;
  options?: MutationObserverInit;
}

export const MutationObserver = ({ children, onMutation, options }: MutationObserverProps) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new globalThis.MutationObserver(onMutation);
    observer.observe(element, options);

    return () => observer.disconnect();
  }, [onMutation, options]);

  return <Slot ref={ref}>{children}</Slot>;
};

MutationObserver.displayName = 'MutationObserver';
