import { InitialisedField } from './types-for-lists';
export declare type ListForValidation = {
    listKey: string;
    fields: Record<string, InitialisedField>;
};
export declare function assertFieldsValid(list: ListForValidation): void;
