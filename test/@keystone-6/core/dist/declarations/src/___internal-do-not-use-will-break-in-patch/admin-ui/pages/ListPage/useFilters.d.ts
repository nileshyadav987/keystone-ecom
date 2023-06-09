import { JSONValue, ListMeta } from '../../../../types';
export declare type Filter = {
    field: string;
    type: string;
    value: JSONValue;
};
export declare function useFilters(list: ListMeta, filterableFields: Set<string>): {
    filters: Filter[];
    where: {
        id: {
            equals: number;
        };
        AND: {}[];
    };
} | {
    filters: Filter[];
    where: {};
};
