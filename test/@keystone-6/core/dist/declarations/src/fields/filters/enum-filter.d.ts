import { graphql } from '../../types/schema';
export declare type EnumNullableFilter<Enum extends graphql.EnumType<any>> = graphql.InputObjectType<{
    equals: graphql.Arg<Enum>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    not: graphql.Arg<EnumNullableFilter<Enum>>;
}>;
export declare type EnumFilter<Enum extends graphql.EnumType<any>> = graphql.InputObjectType<{
    equals: graphql.Arg<Enum>;
    in: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    notIn: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    not: graphql.Arg<EnumFilter<Enum>>;
}>;
declare type EnumNullableListFilterType<Enum extends graphql.EnumType<any>> = graphql.InputObjectType<{
    equals: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    has: graphql.Arg<Enum>;
    hasEvery: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    hasSome: graphql.Arg<graphql.ListType<graphql.NonNullType<Enum>>>;
    isEmpty: graphql.Arg<Enum>;
}>;
export declare function enumFilters<Enum extends graphql.EnumType<any>>(enumType: Enum): {
    optional: EnumNullableFilter<Enum>;
    required: EnumFilter<Enum>;
    many: EnumNullableListFilterType<Enum>;
};
export {};
