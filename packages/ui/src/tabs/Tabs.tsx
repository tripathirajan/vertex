import * as React from 'react';
import * as Headless from '@vertex-lab/headless';

export const Tabs = React.forwardRef<HTMLDivElement, Headless.TabsProps>(
  ({ className, ...props }, ref) => (
    <Headless.Tabs
      {...props}
      ref={ref}
      className={`w-full ${className || ''}`}
    />
  )
);
Tabs.displayName = 'Tabs';

export const TabList = React.forwardRef<HTMLDivElement, Headless.TabListProps>(
  ({ className, ...props }, ref) => (
    <Headless.TabList
      {...props}
      ref={ref}
      className={`flex border-b border-neutral-200 dark:border-neutral-800 ${className || ''}`}
    />
  )
);
TabList.displayName = 'TabList';

export const Tab = React.forwardRef<HTMLButtonElement, Headless.TabProps>(
  ({ className, ...props }, ref) => (
    <Headless.Tab
      {...props}
      ref={ref}
      className={`
        px-4 py-2 text-sm font-medium transition-colors
        border-b-2 border-transparent
        hover:text-primary-600 dark:hover:text-primary-400
        data-[state=active]:border-primary-500 data-[state=active]:text-primary-600
        dark:data-[state=active]:text-primary-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ''}
      `}
    />
  )
);
Tab.displayName = 'Tab';

export const TabPanel = React.forwardRef<HTMLDivElement, Headless.TabPanelProps>(
  ({ className, ...props }, ref) => (
    <Headless.TabPanel
      {...props}
      ref={ref}
      className={`py-4 focus:outline-none ${className || ''}`}
    />
  )
);
TabPanel.displayName = 'TabPanel';
