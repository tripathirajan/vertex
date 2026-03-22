import { createContext } from '@vertex-lab/utilities';

export interface AccordionContextValue {
  value: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
  collapsible?: boolean;
}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContextValue>('Accordion');

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContextValue>('AccordionItem');
