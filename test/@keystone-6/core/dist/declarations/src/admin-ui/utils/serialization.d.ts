import { GraphQLError } from 'graphql';
import { JSONValue, FieldMeta } from '../../types';
import { DataGetter } from './dataGetter';
export declare type ItemData = {
    id: string;
    [key: string]: any;
};
export declare type DeserializedValue = Record<string, {
    kind: 'error';
    errors: readonly [GraphQLError, ...GraphQLError[]];
} | {
    kind: 'value';
    value: any;
}>;
export declare function deserializeValue(fields: Record<string, FieldMeta>, itemGetter: DataGetter<ItemData>): DeserializedValue;
export declare function serializeValueToObjByFieldKey(fields: Record<string, FieldMeta>, value: DeserializedValue): Record<string, Record<string, JSONValue>>;
