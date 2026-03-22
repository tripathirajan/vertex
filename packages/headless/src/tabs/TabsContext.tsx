import { createContext } from '@vertex-lab/utilities';

export interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  baseId: string;
}

export const [TabsProvider, useTabsContext] = createContext<TabsContextValue>('Tabs');
