import * as React from 'react';
import { useControllableState } from '@vertex/hooks';
import { Button } from '@vertex/primitives';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Button> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  name?: string;
  value?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      required,
      name,
      value = 'on',
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
          role="switch"
          aria-checked={checked}
          aria-required={required}
          data-state={checked ? 'checked' : 'unchecked'}
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

Switch.displayName = 'Switch';
