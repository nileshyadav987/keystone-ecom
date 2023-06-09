/// <reference types="react" />
import { GraphQLError } from 'graphql';
declare type GraphQLErrorNoticeProps = {
    networkError: Error | null | undefined;
    errors: readonly GraphQLError[] | undefined;
};
export declare function GraphQLErrorNotice({ errors, networkError }: GraphQLErrorNoticeProps): JSX.Element | null;
export {};
