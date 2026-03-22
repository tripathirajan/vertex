import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mergeRefs } from '@vertex/utilities';

/**
 * Portal
 * Renders children into a DOM node that exists outside the DOM hierarchy of the parent component.
 */
export const Portal = ({ children, container }: { children: React.ReactNode; container?: HTMLElement | null }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return ReactDOM.createPortal(children, container || document.body);
};

/**
 * Primitive
 * A low-level component that supports the `as` prop for polymorphism.
 */
export interface PrimitiveProps<E extends React.ElementType> {
  as?: E;
  asChild?: boolean;
}

export type PrimitiveComponentProps<E extends React.ElementType> = PrimitiveProps<E> &
  Omit<React.ComponentPropsWithRef<E>, keyof PrimitiveProps<E>>;

export const Primitive = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    { as, asChild, ...props }: PrimitiveComponentProps<E>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.Ref<any>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = asChild ? Slot : as || 'div';

    return <Component {...props} ref={ref} />;
  }
);

Primitive.displayName = 'Primitive';

/**
 * Slot
 * Merges its props onto its immediate child.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Slot = React.forwardRef<any, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ...props,
        ...child.props,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: ref ? mergeRefs(ref, (child as any).ref) : (child as any).ref,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }

    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  }
);

Slot.displayName = 'Slot';

/**
 * Core Primitives
 */

export const Box = Primitive;
Box.displayName = 'Box';

export const Button = React.forwardRef<HTMLButtonElement, PrimitiveComponentProps<'button'>>(
  ({ as = 'button', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Button.displayName = 'Button';

export const Input = React.forwardRef<HTMLInputElement, PrimitiveComponentProps<'input'>>(
  ({ as = 'input', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, PrimitiveComponentProps<'textarea'>>(
  ({ as = 'textarea', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Textarea.displayName = 'Textarea';

export const Label = React.forwardRef<HTMLLabelElement, PrimitiveComponentProps<'label'>>(
  ({ as = 'label', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Label.displayName = 'Label';

export const Link = React.forwardRef<HTMLAnchorElement, PrimitiveComponentProps<'a'>>(
  ({ as = 'a', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Link.displayName = 'Link';

export const Image = React.forwardRef<HTMLImageElement, PrimitiveComponentProps<'img'>>(
  ({ as = 'img', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
Image.displayName = 'Image';

export const List = React.forwardRef<HTMLUListElement, PrimitiveComponentProps<'ul'>>(
  ({ as = 'ul', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
List.displayName = 'List';

export const ListItem = React.forwardRef<HTMLLIElement, PrimitiveComponentProps<'li'>>(
  ({ as = 'li', ...props }, ref) => <Primitive as={as} {...props} ref={ref} />
);
ListItem.displayName = 'ListItem';

export const Separator = React.forwardRef<HTMLDivElement, PrimitiveComponentProps<'div'>>(
  ({ as = 'div', ...props }, ref) => <Primitive as={as} role="separator" {...props} ref={ref} />
);
Separator.displayName = 'Separator';

/**
 * Layout Primitives
 */

export const Stack = React.forwardRef<HTMLDivElement, PrimitiveComponentProps<'div'>>(
  ({ style, ...props }, ref) => (
    <Primitive
      {...props}
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', ...style }}
    />
  )
);
Stack.displayName = 'Stack';

export const Flex = React.forwardRef<HTMLDivElement, PrimitiveComponentProps<'div'>>(
  ({ style, ...props }, ref) => (
    <Primitive
      {...props}
      ref={ref}
      style={{ display: 'flex', ...style }}
    />
  )
);
Flex.displayName = 'Flex';

export const Grid = React.forwardRef<HTMLDivElement, PrimitiveComponentProps<'div'>>(
  ({ style, ...props }, ref) => (
    <Primitive
      {...props}
      ref={ref}
      style={{ display: 'grid', ...style }}
    />
  )
);
Grid.displayName = 'Grid';

/**
 * Accessibility Primitives
 */

export const VisuallyHidden = React.forwardRef<HTMLSpanElement, PrimitiveComponentProps<'span'>>(
  ({ style, ...props }, ref) => (
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
  )
);
VisuallyHidden.displayName = 'VisuallyHidden';
