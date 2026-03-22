import * as React from 'react';
import { Box, Portal, Button } from '@vertex-lab/primitives';
import { useDialogContext } from './DialogContext';
import { useClickOutside, useEventListener } from '@vertex-lab/hooks';

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof Box> & {
  asChild?: boolean;
};

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, ...props }, ref) => {
    const { open, onOpenChange, baseId } = useDialogContext('DialogContent');
    const contentRef = React.useRef<HTMLDivElement>(null);

    useClickOutside(contentRef, () => onOpenChange(false));
    useEventListener('keydown', (event) => {
      if (event.key === 'Escape') onOpenChange(false);
    });

    if (!open) return null;

    return (
      <Portal>
        <Box
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${baseId}-title`}
          aria-describedby={`${baseId}-description`}
          data-state={open ? 'open' : 'closed'}
          {...props}
          ref={ref}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1400,
            ...props.style,
          }}
        >
          <div ref={contentRef}>{children}</div>
        </Box>
      </Portal>
    );
  }
);

DialogContent.displayName = 'DialogContent';

export const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Box>>(
  (props, ref) => {
    const { open } = useDialogContext('DialogOverlay');
    if (!open) return null;

    return (
      <Portal>
        <Box
          data-state={open ? 'open' : 'closed'}
          {...props}
          ref={ref}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            ...props.style,
          }}
        />
      </Portal>
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof Button>;

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext('DialogTrigger');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onOpenChange(true);
    };

    return <Button {...props} ref={ref} onClick={handleClick} />;
  }
);

DialogTrigger.displayName = 'DialogTrigger';
