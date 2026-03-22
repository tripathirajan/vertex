/**
 * Vertex UI Primitives
 * Low-level DOM abstractions.
 */

export * from './types/polymorphic';
export * from './utils/compose-event-handlers';

export * from './layout/index';
export * from './text/index';
export * from './media/index';
export * from './form/index';
export * from './accessibility/index';
export * from './structure/index';
export * from './interaction/index';
export * from './focus/index';
export * from './collection/index';
export * from './observers/index';
export * from './overlay/index';
export * from './utility/index';

// Re-export Primitive and Slot for convenience
export { Primitive } from './structure/Primitive';
export { Slot } from './structure/Slot';
