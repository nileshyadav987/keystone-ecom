import type { CacheHint } from 'apollo-server-types';
import type { MaybePromise } from '../utils';
import { BaseListTypeInfo } from '../type-info';
import { KeystoneContextFromListTypeInfo } from '..';
import type { ListHooks } from './hooks';
import type { ListAccessControl } from './access-control';
import type { BaseFields, FilterOrderArgs } from './fields';
export declare type ListSchemaConfig = Record<string, ListConfig<any, BaseFields<BaseListTypeInfo>>>;
export declare type IdFieldConfig = {
    kind: 'cuid' | 'uuid';
} | {
    kind: 'autoincrement';
    /**
     * Configures the database type of the id field. Only `Int` is supported on SQLite.
     * @default 'Int'
     */
    type?: 'Int' | 'BigInt';
};
export declare type ListConfig<ListTypeInfo extends BaseListTypeInfo, Fields extends BaseFields<ListTypeInfo>> = {
    isSingleton?: boolean;
    fields: Fields;
    /**
     * Controls what data users of the Admin UI and GraphQL can access and change
     * @see https://www.keystonejs.com/guides/auth-and-access-control
     */
    access: ListAccessControl<ListTypeInfo>;
    /** Config for how this list should act in the Admin UI */
    ui?: ListAdminUIConfig<ListTypeInfo, Fields>;
    /**
     * Hooks to modify the behaviour of GraphQL operations at certain points
     * @see https://www.keystonejs.com/guides/hooks
     */
    hooks?: ListHooks<ListTypeInfo>;
    graphql?: ListGraphQLConfig;
    db?: ListDBConfig;
    /**
     * Defaults the Admin UI and GraphQL descriptions
     */
    description?: string;
    defaultIsFilterable?: false | ((args: FilterOrderArgs<ListTypeInfo>) => MaybePromise<boolean>);
    defaultIsOrderable?: false | ((args: FilterOrderArgs<ListTypeInfo>) => MaybePromise<boolean>);
};
export declare type ListAdminUIConfig<ListTypeInfo extends BaseListTypeInfo, Fields extends BaseFields<ListTypeInfo>> = {
    /**
     * The field to use as a label in the Admin UI. If you want to base the label off more than a single field, use a virtual field and reference that field here.
     * @default 'label', if it exists, falling back to 'name', then 'title', and finally 'id', which is guaranteed to exist.
     */
    labelField?: 'id' | Exclude<keyof Fields, number>;
    /**
     * The fields used by the Admin UI when searching this list.
     * It is always possible to search by id and `id` should not be specified in this option.
     * @default The `labelField` if it has a string `contains` filter, otherwise none.
     */
    searchFields?: readonly Extract<keyof Fields, string>[];
    /** The path that the list should be at in the Admin UI */
    /**
     * The description shown on the list page
     * @default listConfig.description
     */
    description?: string;
    /**
     * Excludes this list from the Admin UI
     * @default false
     */
    isHidden?: MaybeSessionFunction<boolean, ListTypeInfo>;
    /**
     * Hides the create button in the Admin UI.
     * Note that this does **not** disable creating items through the GraphQL API, it only hides the button to create an item for this list in the Admin UI.
     * @default false
     */
    hideCreate?: MaybeSessionFunction<boolean, ListTypeInfo>;
    /**
     * Hides the delete button in the Admin UI.
     * Note that this does **not** disable deleting items through the GraphQL API, it only hides the button to delete an item for this list in the Admin UI.
     * @default false
     */
    hideDelete?: MaybeSessionFunction<boolean, ListTypeInfo>;
    /**
     * Configuration specific to the create view in the Admin UI
     */
    createView?: {
        /**
         * The default field mode for fields on the create view for this list.
         * Specific field modes on a per-field basis via a field's config.
         * @default 'edit'
         */
        defaultFieldMode?: MaybeSessionFunction<'edit' | 'hidden', ListTypeInfo>;
    };
    /**
     * Configuration specific to the item view in the Admin UI
     */
    itemView?: {
        /**
         * The default field mode for fields on the item view for this list.
         * This controls what people can do for fields
         * Specific field modes on a per-field basis via a field's config.
         * @default 'edit'
         */
        defaultFieldMode?: MaybeItemFunction<'edit' | 'read' | 'hidden', ListTypeInfo>;
    };
    /**
     * Configuration specific to the list view in the Admin UI
     */
    listView?: {
        /**
         * The default field mode for fields on the list view for this list.
         * Specific field modes on a per-field basis via a field's config.
         * @default 'read'
         */
        defaultFieldMode?: MaybeSessionFunction<'read' | 'hidden', ListTypeInfo>;
        /**
         * The columns(which refer to fields) that should be shown to users of the Admin UI.
         * Users of the Admin UI can select different columns to show in the UI.
         * @default the first three fields in the list
         */
        initialColumns?: readonly ('id' | keyof Fields)[];
        initialSort?: {
            field: 'id' | keyof Fields;
            direction: 'ASC' | 'DESC';
        };
        pageSize?: number;
    };
    /**
     * The label used to identify the list in navigation and etc.
     * @default listKey.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s|_|\-/).filter(i => i).map(upcase).join(' ');
     */
    label?: string;
    /**
     * The singular form of the list key.
     *
     * It is used in sentences like `Are you sure you want to delete these {plural}?`
     * @default pluralize.singular(label)
     */
    singular?: string;
    /**
     * The plural form of the list key.
     *
     * It is used in sentences like `Are you sure you want to delete this {singular}?`.
     * @default pluralize.plural(label)
     */
    plural?: string;
    /**
     * The path segment to identify the list in URLs.
     *
     * It must match the pattern `/^[a-z-_][a-z0-9-_]*$/`.
     * @default label.split(' ').join('-').toLowerCase()
     */
    path?: string;
};
export declare type MaybeSessionFunction<T extends string | boolean, ListTypeInfo extends BaseListTypeInfo> = T | ((args: {
    session: any;
    context: KeystoneContextFromListTypeInfo<ListTypeInfo>;
}) => MaybePromise<T>);
export declare type MaybeItemFunction<T, ListTypeInfo extends BaseListTypeInfo> = T | ((args: {
    session: any;
    context: KeystoneContextFromListTypeInfo<ListTypeInfo>;
    item: ListTypeInfo['item'];
}) => MaybePromise<T>);
export declare type ListGraphQLConfig = {
    /**
     * The description added to the GraphQL schema
     * @default listConfig.description
     */
    description?: string;
    /**
     * The plural form of the list key to use in the generated GraphQL schema.
     * Note that there is no singular here because the singular used in the GraphQL schema is the list key.
     */
    plural?: string;
    /**
     * The maximum value for the take parameter when querying this list
     */
    maxTake?: number;
    cacheHint?: ((args: CacheHintArgs) => CacheHint) | CacheHint;
    omit?: true | readonly ('query' | 'create' | 'update' | 'delete')[];
};
export declare type CacheHintArgs = {
    results: any;
    operationName?: string;
    meta: boolean;
};
export declare type ListDBConfig = {
    /**
     * The kind of id to use.
     * @default { kind: "cuid" }
     */
    idField?: IdFieldConfig;
    /**
     * Specifies an alternative name name for the table to use, if you don't want
     * the default (derived from the list key)
     */
    map?: string;
};
