import { CacheHint } from 'apollo-server-types';
import { FieldTypeFunc } from '../next-fields';
import { BaseListTypeInfo } from '../type-info';
import { KeystoneContextFromListTypeInfo, MaybePromise } from '..';
import { MaybeItemFunction, MaybeSessionFunction } from './lists';
import { FieldHooks } from './hooks';
import { FieldAccessControl } from './access-control';
export declare type BaseFields<ListTypeInfo extends BaseListTypeInfo> = {
    [key: string]: FieldTypeFunc<ListTypeInfo>;
};
export declare type FilterOrderArgs<ListTypeInfo extends BaseListTypeInfo> = {
    context: KeystoneContextFromListTypeInfo<ListTypeInfo>;
    session: KeystoneContextFromListTypeInfo<ListTypeInfo>['session'];
    listKey: string;
    fieldKey: string;
};
export declare type CommonFieldConfig<ListTypeInfo extends BaseListTypeInfo> = {
    access?: FieldAccessControl<ListTypeInfo>;
    hooks?: FieldHooks<ListTypeInfo>;
    label?: string;
    ui?: {
        description?: string;
        views?: string;
        createView?: {
            fieldMode?: MaybeSessionFunction<'edit' | 'hidden', ListTypeInfo>;
        };
        itemView?: {
            fieldMode?: MaybeItemFunction<'edit' | 'read' | 'hidden', ListTypeInfo>;
            fieldPosition?: MaybeItemFunction<'form' | 'sidebar', ListTypeInfo>;
        };
        listView?: {
            fieldMode?: MaybeSessionFunction<'read' | 'hidden', ListTypeInfo>;
        };
    };
    graphql?: {
        cacheHint?: CacheHint;
        omit?: true | readonly ('read' | 'create' | 'update')[];
    };
    isFilterable?: boolean | ((args: FilterOrderArgs<ListTypeInfo>) => MaybePromise<boolean>);
    isOrderable?: boolean | ((args: FilterOrderArgs<ListTypeInfo>) => MaybePromise<boolean>);
};
