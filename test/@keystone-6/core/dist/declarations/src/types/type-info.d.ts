import { KeystoneContext } from './context';
import { BaseItem } from './next-fields';
declare type GraphQLInput = Record<string, any>;
export declare type BaseListTypeInfo = {
    key: string;
    isSingleton: boolean;
    fields: string;
    item: BaseItem;
    inputs: {
        create: GraphQLInput;
        update: GraphQLInput;
        where: GraphQLInput;
        uniqueWhere: {
            readonly id?: string | null;
        } & GraphQLInput;
        orderBy: Record<string, 'asc' | 'desc' | null>;
    };
    /**
     * WARNING: may be renamed in patch
     */
    prisma: {
        create: Record<string, any>;
        update: Record<string, any>;
    };
    all: BaseKeystoneTypeInfo;
};
export declare type KeystoneContextFromListTypeInfo<ListTypeInfo extends BaseListTypeInfo> = KeystoneContext<ListTypeInfo['all']>;
export declare type BaseKeystoneTypeInfo = {
    lists: Record<string, BaseListTypeInfo>;
    prisma: any;
};
export {};
