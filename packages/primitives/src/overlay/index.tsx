import * as React from 'react';
import { Portal } from '../structure/index';
import { useScrollLock } from '@vertex-lab/hooks';

/**
 * Overlay
 */
export interface OverlayProps {
  children: React.ReactNode;
  open?: boolean;
}

export const Overlay = ({ children, open = false }: OverlayProps) => {
  if (!open) return null;
  return <Portal>{children}</Portal>;
};

Overlay.displayName = 'Overlay';

/**
 * OverlayContainer
 */
export const OverlayContainer = ({ children }: { children: React.ReactNode }) => {
  return <div id="overlay-container">{children}</div>;
};

OverlayContainer.displayName = 'OverlayContainer';

/**
 * LayerManager
 */
export const LayerManager = {
  layers: new Set<string>(),
  add: (id: string) => LayerManager.layers.add(id),
  remove: (id: string) => LayerManager.layers.delete(id),
  isTop: (id: string) => Array.from(LayerManager.layers).pop() === id,
};

/**
 * ScrollLock
 */
export const ScrollLock = ({ lock = false }: { lock?: boolean }) => {
  useScrollLock(lock);
  return null;
};

ScrollLock.displayName = 'ScrollLock';
