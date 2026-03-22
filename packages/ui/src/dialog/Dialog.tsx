import * as React from 'react';
import * as Headless from '@vertex/headless';
import { X } from 'lucide-react';

export const Dialog = Headless.Dialog;

export const DialogTrigger = Headless.DialogTrigger;

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Headless.DialogOverlay>>(
  ({ className, ...props }, ref) => (
    <Headless.DialogOverlay
      {...props}
      ref={ref}
      className={`bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ${className || ''}`}
    />
  )
);
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = React.forwardRef<HTMLDivElement, Headless.DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = Headless.useDialogContext('DialogContent');

    return (
      <>
        <DialogOverlay />
        <Headless.DialogContent
          {...props}
          ref={ref}
          className={`
            w-full max-w-lg p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
            data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
            ${className || ''}
          `}
        >
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </Headless.DialogContent>
      </>
    );
  }
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ''}`} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, Headless.DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <Headless.DialogTitle
      {...props}
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof Headless.DialogDescription>>(
  ({ className, ...props }, ref) => (
    <Headless.DialogDescription
      {...props}
      ref={ref}
      className={`text-sm text-neutral-500 dark:text-neutral-400 ${className || ''}`}
    />
  )
);
DialogDescription.displayName = 'DialogDescription';
