import type { AuthenticatedItem, VisibleLists, CreateViewFieldModes } from '../../types';
import { DocumentNode } from '../apollo';
export type { AuthenticatedItem, VisibleLists, CreateViewFieldModes };
export declare function useLazyMetadata(query: DocumentNode): {
    authenticatedItem: AuthenticatedItem;
    refetch: () => void;
    visibleLists: VisibleLists;
    createViewFieldModes: CreateViewFieldModes;
};
