import { BaseListTypeInfo, FieldTypeFunc, CommonFieldConfig } from '@keystone-6/core/types';
import { ComponentSchemaForGraphQL } from './DocumentEditor/component-blocks/api';
export declare type StructureFieldConfig<ListTypeInfo extends BaseListTypeInfo> = CommonFieldConfig<ListTypeInfo> & {
    db?: {
        map?: string;
    };
    schema: ComponentSchemaForGraphQL;
};
export declare const structure: <ListTypeInfo extends BaseListTypeInfo>({ schema, ...config }: StructureFieldConfig<ListTypeInfo>) => FieldTypeFunc<ListTypeInfo>;
