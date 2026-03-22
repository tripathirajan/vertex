import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Box, Button, RovingFocusGroup, FocusItem, composeEventHandlers } from './index';

describe('Primitives', () => {
  describe('Ref Forwarding', () => {
    it('forwards ref to Box', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Box ref={ref}>Box</Box>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Event Handler Composition', () => {
    it('composes event handlers correctly', () => {
      const userHandler = vi.fn();
      const internalHandler = vi.fn();
      const composed = composeEventHandlers(userHandler, internalHandler);

      const event = { defaultPrevented: false } as unknown as React.BaseSyntheticEvent;
      composed(event);

      expect(userHandler).toHaveBeenCalledWith(event);
      expect(internalHandler).toHaveBeenCalledWith(event);
    });

    it('stops internal handler if default is prevented', () => {
      const userHandler = vi.fn((e: React.BaseSyntheticEvent) => {
        e.defaultPrevented = true;
      });
      const internalHandler = vi.fn();
      const composed = composeEventHandlers(userHandler, internalHandler);

      const event = { defaultPrevented: false } as unknown as React.BaseSyntheticEvent;
      composed(event);

      expect(userHandler).toHaveBeenCalledWith(event);
      expect(internalHandler).not.toHaveBeenCalled();
    });
  });

  describe('RovingFocusGroup', () => {
    it('navigates with keyboard', () => {
      render(
        <RovingFocusGroup>
          <FocusItem value="1">
            <button>Item 1</button>
          </FocusItem>
          <FocusItem value="2">
            <button>Item 2</button>
          </FocusItem>
          <FocusItem value="3">
            <button>Item 3</button>
          </FocusItem>
        </RovingFocusGroup>
      );

      const item1 = screen.getByText('Item 1');
      const item2 = screen.getByText('Item 2');

      item1.focus();
      expect(document.activeElement).toBe(item1);

      fireEvent.keyDown(item1, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(item2);

      fireEvent.keyDown(item2, { key: 'ArrowLeft' });
      expect(document.activeElement).toBe(item1);
    });
  });
});
