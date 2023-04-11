import { graphql } from '@keystone-6/core';
import { FieldData } from '@keystone-6/core/types';
import { ComponentSchemaForGraphQL } from './DocumentEditor/component-blocks/api';
declare type OutputField = graphql.Field<{
    value: unknown;
}, Record<string, graphql.Arg<graphql.InputType, boolean>>, graphql.OutputType, string>;
export declare function getOutputGraphQLField(name: string, schema: ComponentSchemaForGraphQL, interfaceImplementations: graphql.ObjectType<unknown>[], cache: Map<ComponentSchemaForGraphQL, OutputField>, meta: FieldData): OutputField;
export {};
