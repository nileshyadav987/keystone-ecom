import { graphql } from '@keystone-6/core';
import { FieldData, GraphQLTypesForList, KeystoneContext } from '@keystone-6/core/types';
import { ComponentSchemaForGraphQL } from './DocumentEditor/component-blocks/api';
import { ReadonlyPropPath } from './DocumentEditor/component-blocks/utils';
export declare function getGraphQLInputType(name: string, schema: ComponentSchemaForGraphQL, operation: 'create' | 'update', cache: Map<ComponentSchemaForGraphQL, graphql.InputType>, meta: FieldData): graphql.InputType;
export declare function getValueForUpdate(schema: ComponentSchemaForGraphQL, value: any, prevValue: any, context: KeystoneContext, path: ReadonlyPropPath): Promise<any>;
export declare function getValueForCreate(schema: ComponentSchemaForGraphQL, value: any, context: KeystoneContext, path: ReadonlyPropPath): Promise<any>;
/** MANY */
declare type _CreateValueManyType = Exclude<graphql.InferValueFromArg<graphql.Arg<Exclude<GraphQLTypesForList['relateTo']['many']['create'], undefined>>>, null | undefined>;
declare type _UpdateValueManyType = Exclude<graphql.InferValueFromArg<graphql.Arg<Exclude<GraphQLTypesForList['relateTo']['many']['update'], undefined>>>, null | undefined>;
export declare class RelationshipErrors extends Error {
    errors: {
        error: Error;
        tag: string;
    }[];
    constructor(errors: {
        error: Error;
        tag: string;
    }[]);
}
export declare const isFulfilled: <T>(arg: PromiseSettledResult<T>) => arg is PromiseFulfilledResult<T>;
export declare const isRejected: (arg: PromiseSettledResult<any>) => arg is PromiseRejectedResult;
export declare function resolveRelateToManyForCreateInput(value: _CreateValueManyType, context: KeystoneContext, foreignListKey: string, tag?: string): Promise<{
    id: string;
}[]>;
export declare function resolveRelateToManyForUpdateInput(value: _UpdateValueManyType, context: KeystoneContext, foreignListKey: string, prevVal: {
    id: string;
}[]): Promise<{
    id: string;
}[]>;
/** ONE */
declare type _CreateValueType = Exclude<graphql.InferValueFromArg<graphql.Arg<Exclude<GraphQLTypesForList['relateTo']['one']['create'], undefined>>>, null | undefined>;
declare type _UpdateValueType = Exclude<graphql.InferValueFromArg<graphql.Arg<graphql.NonNullType<Exclude<GraphQLTypesForList['relateTo']['one']['update'], undefined>>>>, null | undefined>;
export declare function checkUniqueItemExists(uniqueInput: Record<string, unknown>, listKey: string, context: KeystoneContext, operation: string): Promise<{
    id: string;
}>;
export declare function resolveRelateToOneForCreateInput(value: _CreateValueType, context: KeystoneContext, foreignListKey: string): Promise<{
    id: string;
} | undefined>;
export declare function resolveRelateToOneForUpdateInput(value: _UpdateValueType, context: KeystoneContext, foreignListKey: string): Promise<{
    id: string;
} | undefined> | null | undefined;
export {};
