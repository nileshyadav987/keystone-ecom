import { graphql } from '@keystone-6/core';
import { AuthGqlNames, AuthTokenTypeConfig, SecretFieldImpl } from '../types';
declare const errorCodes: readonly ["FAILURE", "TOKEN_EXPIRED", "TOKEN_REDEEMED"];
export declare function getPasswordResetSchema<I extends string, S extends string>({ listKey, identityField, secretField, gqlNames, passwordResetLink, passwordResetTokenSecretFieldImpl, }: {
    listKey: string;
    identityField: I;
    secretField: S;
    gqlNames: AuthGqlNames;
    passwordResetLink: AuthTokenTypeConfig;
    passwordResetTokenSecretFieldImpl: SecretFieldImpl;
}): {
    mutation: {
        [x: string]: import("@graphql-ts/schema").Field<unknown, {
            [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
        }, graphql.NonNullType<graphql.ScalarType<boolean>>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>> | import("@graphql-ts/schema").Field<unknown, {
            [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
            token: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
        }, import("@graphql-ts/schema").ObjectType<{
            code: (typeof errorCodes)[number];
            message: string;
        }, graphql.Context>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>>;
    };
    query: {
        [x: string]: import("@graphql-ts/schema").Field<unknown, {
            [x: string]: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
            token: graphql.Arg<graphql.NonNullType<graphql.ScalarType<string>>, false>;
        }, import("@graphql-ts/schema").ObjectType<{
            code: (typeof errorCodes)[number];
            message: string;
        }, graphql.Context>, string, import("@keystone-6/core/types").KeystoneContext<import("@keystone-6/core/types").BaseKeystoneTypeInfo>>;
    };
};
export {};
