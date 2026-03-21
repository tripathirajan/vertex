import * as React from 'react';
import { Box } from '@vertex/primitives';
import { useTabsContext } from './TabsContext';

export interface TabListProps extends React.ComponentPropsWithoutRef<typeof Box> {}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  (props, ref) => {
    const { orientation } = useTabsContext('TabList');

    return (
      <Box
        role="tablist"
        aria-orientation={orientation}
        data-orientation={orientation}
        {...props}
        ref={ref}
      />
    );
  }
);

TabList.displayName = 'TabList';
