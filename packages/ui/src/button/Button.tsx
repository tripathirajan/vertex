import * as React from 'react';
import { Button as PrimitiveButton } from '@vertex/primitives';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof PrimitiveButton> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100',
      outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-50 active:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
      ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-sm',
      md: 'h-10 px-4 text-sm rounded-md',
      lg: 'h-12 px-6 text-base rounded-lg',
    };

    return (
      <PrimitiveButton
        {...props}
        ref={ref}
        className={`
          inline-flex items-center justify-center font-medium transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className || ''}
        `}
      />
    );
  }
);

Button.displayName = 'Button';
