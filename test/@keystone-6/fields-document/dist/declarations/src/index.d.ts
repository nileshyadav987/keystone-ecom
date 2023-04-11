import { BaseListTypeInfo, CommonFieldConfig, FieldTypeFunc } from '@keystone-6/core/types';
import { ComponentBlock } from './component-blocks';
declare type RelationshipsConfig = Record<string, {
    listKey: string;
    /** GraphQL fields to select when querying the field */
    selection?: string;
    label: string;
}>;
declare type FormattingConfig = {
    inlineMarks?: true | {
        bold?: true;
        italic?: true;
        underline?: true;
        strikethrough?: true;
        code?: true;
        superscript?: true;
        subscript?: true;
        keyboard?: true;
    };
    listTypes?: true | {
        ordered?: true;
        unordered?: true;
    };
    alignment?: true | {
        center?: true;
        end?: true;
    };
    headingLevels?: true | readonly (1 | 2 | 3 | 4 | 5 | 6)[];
    blockTypes?: true | {
        blockquote?: true;
        code?: true;
    };
    softBreaks?: true;
};
export declare type DocumentFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    relationships?: RelationshipsConfig;
    componentBlocks?: Record<string, ComponentBlock>;
    formatting?: true | FormattingConfig;
    links?: true;
    dividers?: true;
    layouts?: readonly (readonly [number, ...number[]])[];
    db?: {
        map?: string;
    };
};
export declare const document: <ListTypeInfo extends BaseListTypeInfo>({ componentBlocks, dividers, formatting, layouts, relationships: configRelationships, links, ...config }?: DocumentFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
export { structure } from './structure';
