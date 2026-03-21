import * as React from 'react';
import * as Headless from '@vertex/headless';

export const Switch = React.forwardRef<HTMLButtonElement, Headless.SwitchProps>(
  ({ className, ...props }, ref) => (
    <Headless.Switch
      {...props}
      ref={ref}
      className={`
        peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
        border-2 border-transparent transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-neutral-200
        dark:data-[state=unchecked]:bg-neutral-800
        ${className || ''}
      `}
    >
      <span
        className={`
          pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform
          data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0
        `}
        data-state={props.checked ? 'checked' : 'unchecked'}
      />
    </Headless.Switch>
  )
);
Switch.displayName = 'Switch';

export const Checkbox = React.forwardRef<HTMLButtonElement, Headless.CheckboxProps>(
  ({ className, ...props }, ref) => (
    <Headless.Checkbox
      {...props}
      ref={ref}
      className={`
        peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300 dark:border-neutral-700
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        data-[state=checked]:bg-primary-600 data-[state=checked]:text-white data-[state=checked]:border-primary-600
        ${className || ''}
      `}
    >
      <span className="flex items-center justify-center text-current">
        {props.checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
    </Headless.Checkbox>
  )
);
Checkbox.displayName = 'Checkbox';
