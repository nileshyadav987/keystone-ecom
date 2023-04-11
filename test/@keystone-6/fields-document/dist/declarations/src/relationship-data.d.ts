import { KeystoneContext } from '@keystone-6/core/types';
import { Descendant } from 'slate';
import { GraphQLSchema } from 'graphql';
import { ComponentBlock, ComponentSchema, RelationshipData, RelationshipField } from './DocumentEditor/component-blocks/api';
import { Relationships } from './DocumentEditor/relationship';
export declare function addRelationshipData(nodes: Descendant[], context: KeystoneContext, relationships: Relationships, componentBlocks: Record<string, ComponentBlock>): Promise<Descendant[]>;
export declare function fetchRelationshipData(context: KeystoneContext, listKey: string, many: boolean, selection: string, data: any): Promise<RelationshipData | {
    id: string | number;
    label: string;
    data: {};
}[] | null>;
export declare function addRelationshipDataToComponentProps(schema: ComponentSchema, val: any, fetchData: (relationship: RelationshipField<boolean>, data: any) => Promise<any>): Promise<any>;
export declare const getLabelFieldsForLists: import("@emotion/weak-memoize").UnaryFn<GraphQLSchema, Record<string, string>>;
