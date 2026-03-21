import * as React from 'react';
import { createContext } from '@vertex/utilities';

export interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  baseId: string;
}

export const [TabsProvider, useTabsContext] = createContext<TabsContextValue>('Tabs');
