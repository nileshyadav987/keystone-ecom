import type { BaseItem } from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';
import { AuthGqlNames, AuthTokenTypeConfig, SecretFieldImpl } from '../types';
declare const errorCodes: readonly ["FAILURE", "TOKEN_EXPIRED", "TOKEN_REDEEMED"];
export declare function getMagicAuthLinkSchema<I extends string>({ listKey, identityField, gqlNames, magicAuthLink, magicAuthTokenSecretFieldImpl, base, }: {
    listKey: string;
    identityField: I;
    gqlNames: AuthGqlNames;
    magicAuthLink: AuthTokenTypeConfig;
    magicAuthTokenSecretFieldImpl: SecretFieldImpl;
    base: graphql.BaseSchemaMeta;
}): {
    mutation: {
        [x: string]: import("@graphql-ts/schema").Field<unknown, {
            [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
        }, graphql.NonNullType<graphql.ScalarType<boolean>>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>> | import("@graphql-ts/schema").Field<unknown, {
            [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
            token: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
        }, graphql.NonNullType<import("@graphql-ts/schema").UnionType<{
            token: string;
            item: BaseItem;
        } | {
            code: (typeof errorCodes)[number];
            message: string;
        }, graphql.Context>>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>>;
    };
};
export {};
