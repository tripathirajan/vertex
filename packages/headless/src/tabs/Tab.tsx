import * as React from 'react';
import { Button } from '@vertex/primitives';
import { useTabsContext } from './TabsContext';

export interface TabProps extends React.ComponentPropsWithoutRef<typeof Button> {
  value: string;
  disabled?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled, onFocus, onClick, onKeyDown, ...props }, ref) => {
    const { value: selectedValue, onValueChange, orientation, activationMode, baseId } = useTabsContext('Tab');
    const isSelected = selectedValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      if (activationMode === 'automatic' && !disabled) {
        onValueChange?.(value);
      }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!disabled) {
        onValueChange?.(value);
      }
    };

    return (
      <Button
        role="tab"
        aria-selected={isSelected}
        aria-controls={panelId}
        aria-disabled={disabled}
        id={tabId}
        tabIndex={isSelected ? 0 : -1}
        data-state={isSelected ? 'active' : 'inactive'}
        data-disabled={disabled ? '' : undefined}
        data-orientation={orientation}
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    );
  }
);

Tab.displayName = 'Tab';
