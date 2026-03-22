import * as React from 'react';
import { useControllableState, useId } from '@vertex-lab/hooks';
import { Box } from '@vertex-lab/primitives';
import { TabsProvider } from './TabsContext';

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof Box> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      activationMode = 'automatic',
      id: idProp,
      ...props
    },
    ref
  ) => {
    const id = useId(idProp);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <TabsProvider
        value={{
          value,
          onValueChange: setValue,
          orientation,
          activationMode,
          baseId: id!,
        }}
      >
        <Box
          {...props}
          ref={ref}
          id={id}
          data-orientation={orientation}
        />
      </TabsProvider>
    );
  }
);

Tabs.displayName = 'Tabs';
