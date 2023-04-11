/// <reference types="node" />
import type { ReadStream } from 'fs';
import * as graphqlTsSchema from '@graphql-ts/schema';
import { Decimal as DecimalValue } from 'decimal.js';
import type { GraphQLFieldExtensions, GraphQLResolveInfo } from 'graphql';
import { KeystoneContext } from '../context';
import { JSONValue } from '../utils';
export { Boolean, Float, ID, Int, String, enum, enumValues, arg, inputObject, list, nonNull, scalar, } from '@graphql-ts/schema/api-without-context';
export type { Arg, EnumType, EnumValue, InferValueFromArg, InferValueFromArgs, InferValueFromInputType, InputObjectType, InferValueFromOutputType, InputType, ListType, NonNullType, NullableInputType, ScalarType, } from '@graphql-ts/schema/api-without-context';
export { bindGraphQLSchemaAPIToContext } from '@graphql-ts/schema';
export type { BaseSchemaMeta, Extension } from '@graphql-ts/extend';
export { extend, wrap } from '@graphql-ts/extend';
export { fields, interface, interfaceField, object, union } from './schema-api-with-context';
declare type SomeTypeThatIsntARecordOfArgs = string;
declare type FieldFuncResolve<Source, Args extends {
    [Key in keyof Args]: graphqlTsSchema.Arg<graphqlTsSchema.InputType>;
}, Type extends OutputType, Key extends string, Context extends KeystoneContext<any>> = [
    Key
] extends [keyof Source] ? Source[Key] extends graphqlTsSchema.InferValueFromOutputType<Type> | ((args: graphqlTsSchema.InferValueFromArgs<Args>, context: Context, info: GraphQLResolveInfo) => graphqlTsSchema.InferValueFromOutputType<Type>) ? {
    resolve?: graphqlTsSchema.FieldResolver<Source, SomeTypeThatIsntARecordOfArgs extends Args ? {} : Args, Type, Context>;
} : {
    resolve: graphqlTsSchema.FieldResolver<Source, SomeTypeThatIsntARecordOfArgs extends Args ? {} : Args, Type, Context>;
} : {
    resolve: graphqlTsSchema.FieldResolver<Source, SomeTypeThatIsntARecordOfArgs extends Args ? {} : Args, Type, Context>;
};
declare type FieldFuncArgs<Source, Args extends {
    [Key in keyof Args]: graphqlTsSchema.Arg<graphqlTsSchema.InputType>;
}, Type extends OutputType, Key extends string, Context extends KeystoneContext<any>> = {
    args?: Args;
    type: Type;
    deprecationReason?: string;
    description?: string;
    extensions?: Readonly<GraphQLFieldExtensions<Source, unknown>>;
} & FieldFuncResolve<Source, Args, Type, Key, Context>;
declare type FieldFunc = <Source, Type extends OutputType, Key extends string, Context extends KeystoneContext, Args extends {
    [Key in keyof Args]: graphqlTsSchema.Arg<graphqlTsSchema.InputType>;
} = {}>(field: FieldFuncArgs<Source, Args, Type, Key, Context>) => graphqlTsSchema.Field<Source, Args, Type, Key, KeystoneContext>;
export declare const field: FieldFunc;
export declare type Context = KeystoneContext;
export declare const JSON: graphqlTsSchema.graphql.ScalarType<JSONValue>;
declare type FileUpload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream(): ReadStream;
};
export declare const Upload: graphqlTsSchema.graphql.ScalarType<Promise<FileUpload>>;
export declare const Decimal: graphqlTsSchema.graphql.ScalarType<DecimalValue & {
    scaleToPrint?: number | undefined;
}>;
export declare const BigInt: graphqlTsSchema.graphql.ScalarType<bigint>;
export declare const DateTime: graphqlTsSchema.graphql.ScalarType<Date>;
export declare const CalendarDay: graphqlTsSchema.graphql.ScalarType<string>;
export declare type NullableType = graphqlTsSchema.NullableType<Context>;
export declare type Type = graphqlTsSchema.Type<Context>;
export declare type NullableOutputType = graphqlTsSchema.NullableOutputType<Context>;
export declare type OutputType = graphqlTsSchema.OutputType<Context>;
export declare type Field<Source, Args extends Record<string, graphqlTsSchema.Arg<any>>, TType extends OutputType, Key extends string> = graphqlTsSchema.Field<Source, Args, TType, Key, Context>;
export declare type FieldResolver<Source, Args extends Record<string, graphqlTsSchema.Arg<any>>, TType extends OutputType> = graphqlTsSchema.FieldResolver<Source, Args, TType, Context>;
export declare type ObjectType<Source> = graphqlTsSchema.ObjectType<Source, Context>;
export declare type UnionType<Source> = graphqlTsSchema.UnionType<Source, Context>;
export declare type InterfaceType<Source, Fields extends Record<string, graphqlTsSchema.InterfaceField<any, OutputType, Context>>> = graphqlTsSchema.InterfaceType<Source, Fields, Context>;
export declare type InterfaceField<Args extends Record<string, graphqlTsSchema.Arg<any>>, TType extends OutputType> = graphqlTsSchema.InterfaceField<Args, TType, Context>;
