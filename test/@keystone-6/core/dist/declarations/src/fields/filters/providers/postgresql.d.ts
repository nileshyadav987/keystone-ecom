import { graphql } from '../../../types/schema';
import { QueryMode } from '../../../types/next-fields';
declare type StringNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    mode: graphql.Arg<typeof QueryMode>;
    not: graphql.Arg<typeof NestedStringNullableFilter>;
}>;
declare type NestedStringNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    not: graphql.Arg<typeof NestedStringNullableFilter>;
}>;
declare const NestedStringNullableFilter: NestedStringNullableFilterType;
declare type StringFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    mode: graphql.Arg<typeof QueryMode>;
    not: graphql.Arg<typeof NestedStringFilter>;
}>;
declare type NestedStringFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.String>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    lt: graphql.Arg<typeof graphql.String>;
    lte: graphql.Arg<typeof graphql.String>;
    gt: graphql.Arg<typeof graphql.String>;
    gte: graphql.Arg<typeof graphql.String>;
    contains: graphql.Arg<typeof graphql.String>;
    startsWith: graphql.Arg<typeof graphql.String>;
    endsWith: graphql.Arg<typeof graphql.String>;
    not: graphql.Arg<typeof NestedStringFilter>;
}>;
declare const NestedStringFilter: NestedStringFilterType;
declare type StringNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    has: graphql.Arg<typeof graphql.String>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type BoolNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Boolean>;
    not: graphql.Arg<typeof BoolNullableFilter>;
}>;
declare const BoolNullableFilter: BoolNullableFilterType;
declare type BoolFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Boolean>;
    not: graphql.Arg<typeof BoolFilter>;
}>;
declare const BoolFilter: BoolFilterType;
declare type BoolNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Boolean>>>;
    has: graphql.Arg<typeof graphql.Boolean>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Boolean>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Boolean>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type IntNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Int>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    lt: graphql.Arg<typeof graphql.Int>;
    lte: graphql.Arg<typeof graphql.Int>;
    gt: graphql.Arg<typeof graphql.Int>;
    gte: graphql.Arg<typeof graphql.Int>;
    not: graphql.Arg<typeof IntNullableFilter>;
}>;
declare const IntNullableFilter: IntNullableFilterType;
declare type IntFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Int>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    lt: graphql.Arg<typeof graphql.Int>;
    lte: graphql.Arg<typeof graphql.Int>;
    gt: graphql.Arg<typeof graphql.Int>;
    gte: graphql.Arg<typeof graphql.Int>;
    not: graphql.Arg<typeof IntFilter>;
}>;
declare const IntFilter: IntFilterType;
declare type IntNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    has: graphql.Arg<typeof graphql.Int>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Int>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type FloatNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Float>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    lt: graphql.Arg<typeof graphql.Float>;
    lte: graphql.Arg<typeof graphql.Float>;
    gt: graphql.Arg<typeof graphql.Float>;
    gte: graphql.Arg<typeof graphql.Float>;
    not: graphql.Arg<typeof FloatNullableFilter>;
}>;
declare const FloatNullableFilter: FloatNullableFilterType;
declare type FloatFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Float>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    lt: graphql.Arg<typeof graphql.Float>;
    lte: graphql.Arg<typeof graphql.Float>;
    gt: graphql.Arg<typeof graphql.Float>;
    gte: graphql.Arg<typeof graphql.Float>;
    not: graphql.Arg<typeof FloatFilter>;
}>;
declare const FloatFilter: FloatFilterType;
declare type FloatNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    has: graphql.Arg<typeof graphql.Float>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Float>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type DateTimeNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.DateTime>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    lt: graphql.Arg<typeof graphql.DateTime>;
    lte: graphql.Arg<typeof graphql.DateTime>;
    gt: graphql.Arg<typeof graphql.DateTime>;
    gte: graphql.Arg<typeof graphql.DateTime>;
    not: graphql.Arg<typeof DateTimeNullableFilter>;
}>;
declare const DateTimeNullableFilter: DateTimeNullableFilterType;
declare type DateTimeFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.DateTime>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    lt: graphql.Arg<typeof graphql.DateTime>;
    lte: graphql.Arg<typeof graphql.DateTime>;
    gt: graphql.Arg<typeof graphql.DateTime>;
    gte: graphql.Arg<typeof graphql.DateTime>;
    not: graphql.Arg<typeof DateTimeFilter>;
}>;
declare const DateTimeFilter: DateTimeFilterType;
declare type DateTimeNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    has: graphql.Arg<typeof graphql.DateTime>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.DateTime>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type DecimalNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Decimal>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    lt: graphql.Arg<typeof graphql.Decimal>;
    lte: graphql.Arg<typeof graphql.Decimal>;
    gt: graphql.Arg<typeof graphql.Decimal>;
    gte: graphql.Arg<typeof graphql.Decimal>;
    not: graphql.Arg<typeof DecimalNullableFilter>;
}>;
declare const DecimalNullableFilter: DecimalNullableFilterType;
declare type DecimalFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.Decimal>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    lt: graphql.Arg<typeof graphql.Decimal>;
    lte: graphql.Arg<typeof graphql.Decimal>;
    gt: graphql.Arg<typeof graphql.Decimal>;
    gte: graphql.Arg<typeof graphql.Decimal>;
    not: graphql.Arg<typeof DecimalFilter>;
}>;
declare const DecimalFilter: DecimalFilterType;
declare type DecimalNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    has: graphql.Arg<typeof graphql.Decimal>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.Decimal>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
declare type BigIntNullableFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.BigInt>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    lt: graphql.Arg<typeof graphql.BigInt>;
    lte: graphql.Arg<typeof graphql.BigInt>;
    gt: graphql.Arg<typeof graphql.BigInt>;
    gte: graphql.Arg<typeof graphql.BigInt>;
    not: graphql.Arg<typeof BigIntNullableFilter>;
}>;
declare const BigIntNullableFilter: BigIntNullableFilterType;
declare type BigIntFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<typeof graphql.BigInt>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    lt: graphql.Arg<typeof graphql.BigInt>;
    lte: graphql.Arg<typeof graphql.BigInt>;
    gt: graphql.Arg<typeof graphql.BigInt>;
    gte: graphql.Arg<typeof graphql.BigInt>;
    not: graphql.Arg<typeof BigIntFilter>;
}>;
declare const BigIntFilter: BigIntFilterType;
declare type BigIntNullableListFilterType = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    has: graphql.Arg<typeof graphql.BigInt>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.BigInt>>>;
    isEmpty: graphql.Arg<typeof graphql.Boolean>;
}>;
export declare const String: {
    optional: StringNullableFilterType;
    required: StringFilterType;
    many: StringNullableListFilterType;
};
export declare const Boolean: {
    optional: BoolNullableFilterType;
    required: BoolFilterType;
    many: BoolNullableListFilterType;
};
export declare const Int: {
    optional: IntNullableFilterType;
    required: IntFilterType;
    many: IntNullableListFilterType;
};
export declare const Float: {
    optional: FloatNullableFilterType;
    required: FloatFilterType;
    many: FloatNullableListFilterType;
};
export declare const DateTime: {
    optional: DateTimeNullableFilterType;
    required: DateTimeFilterType;
    many: DateTimeNullableListFilterType;
};
export declare const Decimal: {
    optional: DecimalNullableFilterType;
    required: DecimalFilterType;
    many: DecimalNullableListFilterType;
};
export declare const BigInt: {
    optional: BigIntNullableFilterType;
    required: BigIntFilterType;
    many: BigIntNullableListFilterType;
};
export { enumFilters as enum } from '../enum-filter';
