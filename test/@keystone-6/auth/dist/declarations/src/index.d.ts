import { BaseListTypeInfo, KeystoneConfig, BaseKeystoneTypeInfo } from '@keystone-6/core/types';
import { AuthConfig } from './types';
/**
 * createAuth function
 *
 * Generates config for Keystone to implement standard auth features.
 */
export declare function createAuth<ListTypeInfo extends BaseListTypeInfo>({ listKey, secretField, initFirstItem, identityField, magicAuthLink, passwordResetLink, sessionData, }: AuthConfig<ListTypeInfo>): {
    withAuth: <TypeInfo extends BaseKeystoneTypeInfo>(keystoneConfig: KeystoneConfig<TypeInfo>) => KeystoneConfig<TypeInfo>;
};
