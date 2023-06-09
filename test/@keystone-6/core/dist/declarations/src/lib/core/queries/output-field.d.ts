import { CacheHint } from 'apollo-server-types';
import { NextFieldType, IndividualFieldAccessControl, BaseListTypeInfo, BaseItem, KeystoneContext, FieldReadItemAccessArgs } from '../../../types';
import { graphql } from '../../..';
import { ResolvedDBField } from '../resolve-relationships';
import { InitialisedList } from '../types-for-lists';
export declare function outputTypeField(output: NextFieldType['output'], dbField: ResolvedDBField, cacheHint: CacheHint | undefined, access: IndividualFieldAccessControl<FieldReadItemAccessArgs<BaseListTypeInfo>>, listKey: string, fieldKey: string, lists: Record<string, InitialisedList>): import("@graphql-ts/schema").Field<BaseItem, any, graphql.OutputType, string, KeystoneContext<import("../../../types").BaseKeystoneTypeInfo>>;
