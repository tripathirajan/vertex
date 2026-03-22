import * as React from 'react';
import { createContext } from '@vertex-lab/utilities';
import { Slot } from '../structure/Slot';

/**
 * Collection
 */
interface CollectionItemData {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
  data?: unknown;
}

interface CollectionContextValue {
  registerItem: (item: CollectionItemData) => () => void;
  items: CollectionItemData[];
}

const [CollectionProviderInternal, useCollectionContext] = createContext<CollectionContextValue>('Collection');

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<CollectionItemData[]>([]);

  const registerItem = React.useCallback((item: CollectionItemData) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });

    return () => {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    };
  }, []);

  return (
    <CollectionProviderInternal value={{ registerItem, items }}>
      {children}
    </CollectionProviderInternal>
  );
};

CollectionProvider.displayName = 'CollectionProvider';

export interface CollectionItemProps {
  id: string;
  data?: unknown;
  children: React.ReactNode;
}

export const CollectionItem = ({
  id,
  data,
  children,
}: CollectionItemProps) => {
  const context = useCollectionContext();
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    return context.registerItem({ id, ref, data });
  }, [id, data, context]);

  return <Slot ref={ref}>{children}</Slot>;
};

CollectionItem.displayName = 'CollectionItem';

export const Collection = ({ children }: { children: React.ReactNode }) => {
  return <CollectionProvider>{children}</CollectionProvider>;
};

Collection.displayName = 'Collection';

export const ItemRegistry = {
  getItems: (context: CollectionContextValue) => context.items,
};

export { useCollectionContext };
