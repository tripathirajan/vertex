/**
 * Safely merges user-provided event handlers with internal handlers.
 */
export function composeEventHandlers<E>(
  userHandler?: (event: E) => void,
  internalHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    userHandler?.(event);

    if (!(event as unknown as Event).defaultPrevented) {
      return internalHandler?.(event);
    }
  };
}
