import { ComponentSchema, GenericPreviewProps, ValueForComponentSchema } from './api';
export declare function previewPropsToValue<Schema extends ComponentSchema>(props: GenericPreviewProps<ComponentSchema, unknown>): ValueForComponentSchema<Schema>;
export declare function setValueToPreviewProps<Schema extends ComponentSchema>(value: ValueForComponentSchema<Schema>, props: GenericPreviewProps<ComponentSchema, unknown>): void;
