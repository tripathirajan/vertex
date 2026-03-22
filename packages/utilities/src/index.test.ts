import { describe, it, expect } from 'vitest';
import { composeEventHandlers } from './index';

describe('composeEventHandlers', () => {
  it('should call both handlers', () => {
    let called1 = false;
    let called2 = false;
    const handler1 = () => { called1 = true; };
    const handler2 = () => { called2 = true; };
    const composed = composeEventHandlers(handler1, handler2);
    composed(new Event('click'));
    expect(called1).toBe(true);
    expect(called2).toBe(true);
  });

  it('should not call the second handler if the first one prevents default', () => {
    let called2 = false;
    const handler1 = (event: Event) => { event.preventDefault(); };
    const handler2 = () => { called2 = true; };
    const composed = composeEventHandlers(handler1, handler2);
    composed(new Event('click', { cancelable: true }));
    expect(called2).toBe(false);
  });
});
