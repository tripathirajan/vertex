import * as React from 'react';
import { useControllableState } from '@vertex-lab/hooks';
import { Button } from '@vertex-lab/primitives';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Button> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  name?: string;
  value?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      required,
      name,
      value = 'on',
      indeterminate = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      setChecked((prev) => !prev);
    };

    return (
      <>
        <Button
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-required={required}
          data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
          data-disabled={props.disabled ? '' : undefined}
          {...props}
          ref={ref}
          onClick={handleClick}
        />
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={props.disabled}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              opacity: 0,
              margin: 0,
            }}
            readOnly
          />
        )}
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';
