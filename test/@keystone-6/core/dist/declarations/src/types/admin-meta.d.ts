import { GraphQLError } from 'graphql';
import type { ReactElement } from 'react';
import { GqlNames, JSONValue } from './utils';
export declare type NavigationProps = {
    authenticatedItem: AuthenticatedItem;
    lists: ListMeta[];
};
export declare type AuthenticatedItem = {
    state: 'unauthenticated';
} | {
    state: 'authenticated';
    label: string;
    id: string;
    listKey: string;
} | {
    state: 'loading';
} | {
    state: 'error';
    error: Error | readonly [GraphQLError, ...GraphQLError[]];
};
export declare type VisibleLists = {
    state: 'loaded';
    lists: ReadonlySet<string>;
} | {
    state: 'loading';
} | {
    state: 'error';
    error: Error | readonly [GraphQLError, ...GraphQLError[]];
};
export declare type CreateViewFieldModes = {
    state: 'loaded';
    lists: Record<string, Record<string, 'edit' | 'hidden'>>;
} | {
    state: 'loading';
} | {
    state: 'error';
    error: Error | readonly [GraphQLError, ...GraphQLError[]];
};
export declare type AdminConfig = {
    components?: {
        Logo?: (props: {}) => ReactElement;
        Navigation?: (props: NavigationProps) => ReactElement;
    };
};
export declare type FieldControllerConfig<FieldMeta extends JSONValue | undefined = undefined> = {
    listKey: string;
    path: string;
    label: string;
    description: string | null;
    customViews: Record<string, any>;
    fieldMeta: FieldMeta;
};
declare type FilterTypeDeclaration<Value extends JSONValue> = {
    readonly label: string;
    readonly initialValue: Value;
};
export declare type FilterTypeToFormat<Value extends JSONValue> = {
    readonly type: string;
    readonly label: string;
    readonly value: Value;
};
export declare type FieldController<FormState, FilterValue extends JSONValue = never> = {
    path: string;
    label: string;
    description: string | null;
    graphqlSelection: string;
    defaultValue: FormState;
    deserialize: (item: any) => FormState;
    serialize: (formState: FormState) => any;
    validate?: (formState: FormState) => boolean;
    filter?: {
        types: Record<string, FilterTypeDeclaration<FilterValue>>;
        graphql(type: {
            type: string;
            value: FilterValue;
        }): Record<string, any>;
        Label(type: FilterTypeToFormat<FilterValue>): string | ReactElement | null;
        Filter(props: {
            type: string;
            value: FilterValue;
            onChange(value: FilterValue): void;
            autoFocus?: boolean;
        }): ReactElement | null;
    };
};
export declare type FieldMeta = {
    path: string;
    label: string;
    description: string | null;
    fieldMeta: JSONValue;
    viewsIndex: number;
    customViewsIndex: number | null;
    views: FieldViews[number];
    controller: FieldController<unknown, JSONValue>;
    search: 'default' | 'insensitive' | null;
    itemView: {
        /**
         * `null` indicates that the value is dynamic and must be fetched for any given item
         */
        fieldMode: 'edit' | 'read' | 'hidden' | null;
    };
};
export declare type FieldGroupMeta = {
    label: string;
    description: string | null;
    fields: FieldMeta[];
};
export declare type ListMeta = {
    key: string;
    path: string;
    label: string;
    singular: string;
    plural: string;
    description: string | null;
    gqlNames: GqlNames;
    initialColumns: string[];
    pageSize: number;
    labelField: string;
    initialSort: null | {
        direction: 'ASC' | 'DESC';
        field: string;
    };
    fields: {
        [path: string]: FieldMeta;
    };
    groups: FieldGroupMeta[];
    isSingleton: boolean;
};
export declare type AdminMeta = {
    lists: {
        [list: string]: ListMeta;
    };
};
export declare type FieldProps<FieldControllerFn extends (...args: any) => FieldController<any, any>> = {
    field: ReturnType<FieldControllerFn>;
    value: ReturnType<ReturnType<FieldControllerFn>['deserialize']>;
    onChange?(value: ReturnType<ReturnType<FieldControllerFn>['deserialize']>): void;
    autoFocus?: boolean;
    /**
     * Will be true when the user has clicked submit and
     * the validate function on the field controller has returned false
     */
    forceValidation?: boolean;
};
export declare type FieldViews = Record<string, {
    Field: (props: FieldProps<any>) => ReactElement | null;
    Cell: CellComponent;
    CardValue: CardValueComponent;
    controller: (args: FieldControllerConfig<any>) => FieldController<unknown, JSONValue>;
    allowedExportsOnCustomViews?: string[];
}>;
export declare type CellComponent<FieldControllerFn extends (...args: any) => FieldController<any, any> = () => FieldController<any, any>> = {
    (props: {
        item: Record<string, any>;
        linkTo: {
            href: string;
            as: string;
        } | undefined;
        field: ReturnType<FieldControllerFn>;
    }): ReactElement | null;
    supportsLinkTo?: boolean;
};
export declare type CardValueComponent<FieldControllerFn extends (...args: any) => FieldController<any, any> = () => FieldController<any, any>> = (props: {
    item: Record<string, any>;
    field: ReturnType<FieldControllerFn>;
}) => ReactElement;
export {};
