import * as React from 'react';
import { Box } from '@vertex-lab/primitives';
import { useDialogContext } from './DialogContext';

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof Box>;

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => {
    const { baseId } = useDialogContext('DialogTitle');

    return (
      <Box
        as="h2"
        id={`${baseId}-title`}
        {...props}
        ref={ref}
      />
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof Box>>(
  (props, ref) => {
    const { baseId } = useDialogContext('DialogDescription');

    return (
      <Box
        as="p"
        id={`${baseId}-description`}
        {...props}
        ref={ref}
      />
    );
  }
);

DialogDescription.displayName = 'DialogDescription';
