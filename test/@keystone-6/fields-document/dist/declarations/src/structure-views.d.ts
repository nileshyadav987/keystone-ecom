/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig, FieldProps } from '@keystone-6/core/types';
import { ComponentSchemaForGraphQL } from './DocumentEditor/component-blocks/api';
export declare const Field: ({ field, value, onChange, autoFocus, forceValidation, }: FieldProps<typeof controller>) => jsx.JSX.Element;
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
export declare const allowedExportsOnCustomViews: string[];
export declare const controller: (config: FieldControllerConfig) => FieldController<{
    kind: 'create' | 'update';
    value: unknown;
}> & {
    schema: ComponentSchemaForGraphQL;
};
