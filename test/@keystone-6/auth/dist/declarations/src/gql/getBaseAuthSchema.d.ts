import type { BaseItem } from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import { AuthGqlNames, SecretFieldImpl } from '../types';
export declare function getBaseAuthSchema<I extends string, S extends string>({ listKey, identityField, secretField, gqlNames, secretFieldImpl, base, }: {
    listKey: string;
    identityField: I;
    secretField: S;
    gqlNames: AuthGqlNames;
    secretFieldImpl: SecretFieldImpl;
    base: graphql.BaseSchemaMeta;
}): {
    extension: {
        query: {
            authenticatedItem: import("@graphql-ts/schema").Field<unknown, {}, import("@graphql-ts/schema").UnionType<BaseItem, graphql.Context>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>>;
        };
        mutation: {
            [x: string]: import("@graphql-ts/schema").Field<unknown, {
                [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
            }, import("@graphql-ts/schema").UnionType<{
                sessionToken: string;
                item: BaseItem;
            } | {
                message: string;
            }, graphql.Context>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>>;
        };
    };
    ItemAuthenticationWithPasswordSuccess: import("@graphql-ts/schema").ObjectType<{
        sessionToken: string;
        item: BaseItem;
    }, graphql.Context>;
};
