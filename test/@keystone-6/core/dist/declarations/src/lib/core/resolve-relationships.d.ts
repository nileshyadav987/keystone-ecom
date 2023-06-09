import { DBField, MultiDBField, NoDBField, ScalarishDBField } from '../../types';
declare type BaseResolvedRelationDBField = {
    kind: 'relation';
    list: string;
    field: string;
    relationName: string;
};
export declare type ResolvedRelationDBField = (BaseResolvedRelationDBField & {
    mode: 'many';
}) | (BaseResolvedRelationDBField & {
    mode: 'one';
    foreignIdField: {
        kind: 'none';
    } | {
        kind: 'owned' | 'owned-unique';
        map: string;
    };
});
export declare type ListsWithResolvedRelations = Record<string, FieldsWithResolvedRelations>;
export declare type ResolvedDBField = ResolvedRelationDBField | ScalarishDBField | NoDBField | MultiDBField<Record<string, ScalarishDBField>>;
declare type FieldsWithResolvedRelations = Record<string, ResolvedDBField>;
export declare function resolveRelationships(lists: Record<string, {
    fields: Record<string, {
        dbField: DBField;
    }>;
    isSingleton: boolean;
}>): ListsWithResolvedRelations;
export {};
