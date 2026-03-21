import * as React from 'react';
import * as Headless from '@vertex/headless';
import { ChevronDown } from 'lucide-react';

export const Accordion = React.forwardRef<HTMLDivElement, Headless.AccordionProps>(
  ({ className, ...props }, ref) => (
    <Headless.Accordion
      {...props}
      ref={ref}
      className={`w-full border-y border-neutral-200 dark:border-neutral-800 ${className || ''}`}
    />
  )
);
Accordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<HTMLDivElement, Headless.AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <Headless.AccordionItem
      {...props}
      ref={ref}
      className={`border-b border-neutral-200 dark:border-neutral-800 last:border-0 ${className || ''}`}
    />
  )
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionHeader = React.forwardRef<HTMLButtonElement, Headless.AccordionHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <Headless.AccordionHeader
      {...props}
      ref={ref}
      className={`
        flex w-full items-center justify-between py-4 text-left font-medium transition-all
        hover:text-primary-600 dark:hover:text-primary-400
        [&[data-state=open]>svg]:rotate-180
        ${className || ''}
      `}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-neutral-500" />
    </Headless.AccordionHeader>
  )
);
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionPanel = React.forwardRef<HTMLDivElement, Headless.AccordionPanelProps>(
  ({ className, children, ...props }, ref) => (
    <Headless.AccordionPanel
      {...props}
      ref={ref}
      className={`overflow-hidden text-sm transition-all pb-4 ${className || ''}`}
    >
      <div className="pt-0">{children}</div>
    </Headless.AccordionPanel>
  )
);
AccordionPanel.displayName = 'AccordionPanel';
