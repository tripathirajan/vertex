import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Button
 */
export const Button = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    props: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    const { as: Component = 'button', type = 'button', ...rest } = props as any;
    return <Primitive as={Component} type={type} {...rest} ref={ref} />;
  }
);

Button.displayName = 'Button';

/**
 * Input
 */
export const Input = React.forwardRef(
  <E extends React.ElementType = 'input'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'input') as any} {...props} ref={ref} />;
  }
);

Input.displayName = 'Input';

/**
 * Textarea
 */
export const Textarea = React.forwardRef(
  <E extends React.ElementType = 'textarea'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'textarea') as any} {...props} ref={ref} />;
  }
);

Textarea.displayName = 'Textarea';

/**
 * Select
 */
export const Select = React.forwardRef(
  <E extends React.ElementType = 'select'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'select') as any} {...props} ref={ref} />;
  }
);

Select.displayName = 'Select';

/**
 * Option
 */
export const Option = React.forwardRef(
  <E extends React.ElementType = 'option'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'option') as any} {...props} ref={ref} />;
  }
);

Option.displayName = 'Option';

/**
 * Label
 */
export const Label = React.forwardRef(
  <E extends React.ElementType = 'label'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'label') as any} {...props} ref={ref} />;
  }
);

Label.displayName = 'Label';

/**
 * Fieldset
 */
export const Fieldset = React.forwardRef(
  <E extends React.ElementType = 'fieldset'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'fieldset') as any} {...props} ref={ref} />;
  }
);

Fieldset.displayName = 'Fieldset';

/**
 * Legend
 */
export const Legend = React.forwardRef(
  <E extends React.ElementType = 'legend'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'legend') as any} {...props} ref={ref} />;
  }
);

Legend.displayName = 'Legend';

/**
 * Form
 */
export const Form = React.forwardRef(
  <E extends React.ElementType = 'form'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'form') as any} {...props} ref={ref} />;
  }
);

Form.displayName = 'Form';

/**
 * Output
 */
export const Output = React.forwardRef(
  <E extends React.ElementType = 'output'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={(as || 'output') as any} {...props} ref={ref} />;
  }
);

Output.displayName = 'Output';
