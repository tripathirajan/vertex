import * as React from 'react';
import { Box } from '@vertex/primitives';
import { useAccordionItemContext } from './AccordionContext';

export interface AccordionPanelProps extends React.ComponentPropsWithoutRef<typeof Box> {}

export const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ children, ...props }, ref) => {
    const { isOpen } = useAccordionItemContext('AccordionPanel');

    if (!isOpen) return null;

    return (
      <Box
        {...props}
        ref={ref}
        role="region"
        data-state={isOpen ? 'open' : 'closed'}
      >
        {children}
      </Box>
    );
  }
);

AccordionPanel.displayName = 'AccordionPanel';
