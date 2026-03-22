import * as React from 'react';
import { useControllableState } from '@vertex-lab/hooks';
import { Box } from '@vertex-lab/primitives';
import { AccordionProvider } from './AccordionContext';

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof Box> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      value: valueProp,
      defaultValue = [],
      onValueChange,
      collapsible = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        if (type === 'single') {
          if (value.includes(itemValue)) {
            if (collapsible) setValue([]);
          } else {
            setValue([itemValue]);
          }
        } else {
          if (value.includes(itemValue)) {
            setValue(value.filter((v: string) => v !== itemValue));
          } else {
            setValue([...value, itemValue]);
          }
        }
      },
      [type, value, setValue, collapsible]
    );

    return (
      <AccordionProvider
        value={{
          value,
          toggleItem,
          type,
          collapsible,
        }}
      >
        <Box {...props} ref={ref} />
      </AccordionProvider>
    );
  }
);

Accordion.displayName = 'Accordion';
