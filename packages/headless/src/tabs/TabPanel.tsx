import * as React from 'react';
import { Box } from '@vertex-lab/primitives';
import { useTabsContext } from './TabsContext';

export interface TabPanelProps extends React.ComponentPropsWithoutRef<typeof Box> {
  value: string;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, ...props }, ref) => {
    const { value: selectedValue, baseId } = useTabsContext('TabPanel');
    const isSelected = selectedValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isSelected) return null;

    return (
      <Box
        role="tabpanel"
        aria-labelledby={tabId}
        id={panelId}
        tabIndex={0}
        data-state={isSelected ? 'active' : 'inactive'}
        {...props}
        ref={ref}
      />
    );
  }
);

TabPanel.displayName = 'TabPanel';
