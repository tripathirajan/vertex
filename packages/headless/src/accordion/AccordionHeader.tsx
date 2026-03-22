import * as React from 'react';
import { Button, Box } from '@vertex/primitives';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

export type AccordionHeaderProps = React.ComponentPropsWithoutRef<typeof Button>;

export const AccordionHeader = React.forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ onClick, ...props }, ref) => {
    const { toggleItem } = useAccordionContext('AccordionHeader');
    const { value, isOpen } = useAccordionItemContext('AccordionHeader');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      toggleItem(value);
    };

    return (
      <Box as="h3">
        <Button
          {...props}
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          data-state={isOpen ? 'open' : 'closed'}
          onClick={handleClick}
        />
      </Box>
    );
  }
);

AccordionHeader.displayName = 'AccordionHeader';
