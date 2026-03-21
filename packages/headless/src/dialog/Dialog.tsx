import * as React from 'react';
import { useControllableState, useId } from '@vertex/hooks';
import { DialogProvider } from './DialogContext';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const id = useId();

  return (
    <DialogProvider value={{ open, onOpenChange: setOpen, baseId: id! }}>
      {children}
    </DialogProvider>
  );
}
