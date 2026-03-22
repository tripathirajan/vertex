import { createContext } from '@vertex/utilities';

export interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  baseId: string;
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextValue>('Dialog');
