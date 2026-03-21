import * as React from 'react';
import { Box } from '@vertex/primitives';
import { AccordionItemProvider, useAccordionContext } from './AccordionContext';

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Box> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, ...props }, ref) => {
    const { value: selectedValues } = useAccordionContext('AccordionItem');
    const isOpen = selectedValues.includes(value);

    return (
      <AccordionItemProvider value={{ value, isOpen }}>
        <Box
          {...props}
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
        />
      </AccordionItemProvider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
