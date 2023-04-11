/** @jsxRuntime classic */
/** @jsx jsx */
import { graphql } from '@keystone-6/core';
import { jsx } from '@keystone-ui/core';
import { HTMLAttributes, ReactElement, ReactNode } from 'react';
export declare type FormFieldValue = string | number | boolean | null | readonly FormFieldValue[] | {
    [key: string]: FormFieldValue | undefined;
};
export declare type FormField<Value extends FormFieldValue, Options> = {
    kind: 'form';
    Input(props: {
        value: Value;
        onChange(value: Value): void;
        autoFocus: boolean;
        /**
         * This will be true when validate has returned false and the user has attempted to close the form
         * or when the form is open and they attempt to save the item
         */
        forceValidation: boolean;
    }): ReactElement | null;
    /**
     * The options are config about the field that are available on the
     * preview props when rendering the toolbar and preview component
     */
    options: Options;
    defaultValue: Value;
    /**
     * validate will be called in two cases:
     * - on the client in the editor when a user is changing the value.
     *   Returning `false` will block closing the form
     *   and saving the item.
     * - on the server when a change is received before allowing it to be saved
     *   if `true` is returned
     * @param value The value of the form field. You should NOT trust
     * this value to be of the correct type because it could come from
     * a potentially malicious client
     */
    validate(value: unknown): boolean;
};
export declare type FormFieldWithGraphQLField<Value extends FormFieldValue, Options> = FormField<Value, Options> & {
    graphql: {
        output: graphql.Field<{
            value: Value;
        }, Record<string, graphql.Arg<graphql.InputType, boolean>>, graphql.OutputType, 'value'>;
        input: graphql.NullableInputType;
    };
};
declare type InlineMarksConfig = 'inherit' | {
    bold?: 'inherit';
    code?: 'inherit';
    italic?: 'inherit';
    strikethrough?: 'inherit';
    underline?: 'inherit';
    keyboard?: 'inherit';
    subscript?: 'inherit';
    superscript?: 'inherit';
};
declare type BlockFormattingConfig = {
    alignment?: 'inherit';
    blockTypes?: 'inherit';
    headingLevels?: 'inherit' | (1 | 2 | 3 | 4 | 5 | 6)[];
    inlineMarks?: InlineMarksConfig;
    listTypes?: 'inherit';
    softBreaks?: 'inherit';
};
export declare type ChildField = {
    kind: 'child';
    options: {
        kind: 'block';
        placeholder: string;
        formatting?: BlockFormattingConfig;
        dividers?: 'inherit';
        links?: 'inherit';
        relationships?: 'inherit';
    } | {
        kind: 'inline';
        placeholder: string;
        formatting?: {
            inlineMarks?: InlineMarksConfig;
            softBreaks?: 'inherit';
        };
        links?: 'inherit';
        relationships?: 'inherit';
    };
};
export declare type ArrayField<ElementField extends ComponentSchema> = {
    kind: 'array';
    element: ElementField;
    label?(props: unknown): string;
};
export declare type RelationshipField<Many extends boolean> = {
    kind: 'relationship';
    listKey: string;
    selection: string | undefined;
    label: string;
    many: Many;
};
export interface ObjectField<Fields extends Record<string, ComponentSchema> = Record<string, ComponentSchema>> {
    kind: 'object';
    fields: Fields;
}
export declare type ConditionalField<DiscriminantField extends FormField<string | boolean, any>, ConditionalValues extends {
    [Key in `${DiscriminantField['defaultValue']}`]: ComponentSchema;
}> = {
    kind: 'conditional';
    discriminant: DiscriminantField;
    values: ConditionalValues;
};
declare type ArrayFieldInComponentSchema = {
    kind: 'array';
    element: ComponentSchema;
    label?(props: unknown): string;
};
export declare type ComponentSchema = ChildField | FormField<any, any> | ObjectField | ConditionalField<FormField<any, any>, {
    [key: string]: ComponentSchema;
}> | RelationshipField<boolean> | ArrayFieldInComponentSchema;
declare type ArrayFieldInComponentSchemaForGraphQL = {
    kind: 'array';
    element: ComponentSchemaForGraphQL;
    label?(props: unknown): string;
};
export declare type ComponentSchemaForGraphQL = FormFieldWithGraphQLField<any, any> | ObjectField<Record<string, ComponentSchemaForGraphQL>> | ConditionalField<FormFieldWithGraphQLField<any, any>, {
    [key: string]: ComponentSchemaForGraphQL;
}> | RelationshipField<boolean> | ArrayFieldInComponentSchemaForGraphQL;
export declare const fields: {
    text({ label, defaultValue, }: {
        label: string;
        defaultValue?: string | undefined;
    }): FormFieldWithGraphQLField<string, undefined>;
    integer({ label, defaultValue, }: {
        label: string;
        defaultValue?: number | undefined;
    }): FormFieldWithGraphQLField<number, undefined>;
    url({ label, defaultValue, }: {
        label: string;
        defaultValue?: string | undefined;
    }): FormFieldWithGraphQLField<string, undefined>;
    select<Option extends {
        label: string;
        value: string;
    }>({ label, options, defaultValue, }: {
        label: string;
        options: readonly Option[];
        defaultValue: Option["value"];
    }): FormFieldWithGraphQLField<Option["value"], readonly Option[]>;
    multiselect<Option_1 extends {
        label: string;
        value: string;
    }>({ label, options, defaultValue, }: {
        label: string;
        options: readonly Option_1[];
        defaultValue: readonly Option_1["value"][];
    }): FormFieldWithGraphQLField<readonly Option_1["value"][], readonly Option_1[]>;
    checkbox({ label, defaultValue, }: {
        label: string;
        defaultValue?: boolean | undefined;
    }): FormFieldWithGraphQLField<boolean, undefined>;
    empty(): FormField<null, undefined>;
    child(options: {
        kind: 'block';
        placeholder: string;
        formatting?: BlockFormattingConfig | 'inherit';
        dividers?: 'inherit';
        links?: 'inherit';
        relationships?: 'inherit';
    } | {
        kind: 'inline';
        placeholder: string;
        formatting?: 'inherit' | {
            inlineMarks?: InlineMarksConfig;
            softBreaks?: 'inherit';
        };
        links?: 'inherit';
        relationships?: 'inherit';
    }): ChildField;
    object<Fields extends Record<string, ComponentSchema>>(fields: Fields): ObjectField<Fields>;
    conditional<DiscriminantField extends FormField<string | boolean, any>, ConditionalValues extends { [Key in `${DiscriminantField["defaultValue"]}`]: ComponentSchema; }>(discriminant: DiscriminantField, values: ConditionalValues): ConditionalField<DiscriminantField, ConditionalValues>;
    relationship<Many extends boolean | undefined = false>({ listKey, selection, label, many, }: {
        listKey: string;
        label: string;
        selection?: string | undefined;
    } & (Many extends false | undefined ? {
        many?: Many | undefined;
    } : {
        many: Many;
    })): RelationshipField<Many extends true ? true : false>;
    array<ElementField extends ComponentSchema>(element: ElementField, opts?: {
        label?: ((props: GenericPreviewProps<ElementField, unknown>) => string) | undefined;
    } | undefined): ArrayField<ElementField>;
};
export declare type ComponentBlock<Fields extends Record<string, ComponentSchema> = Record<string, ComponentSchema>> = {
    preview: (props: any) => ReactElement | null;
    schema: Fields;
    label: string;
} & ({
    chromeless: true;
    toolbar?: (props: {
        props: Record<string, any>;
        onRemove(): void;
    }) => ReactElement;
} | {
    chromeless?: false;
    toolbar?: (props: {
        props: Record<string, any>;
        onShowEditMode(): void;
        onRemove(): void;
        isValid: boolean;
    }) => ReactElement;
});
declare type ChildFieldPreviewProps<Schema extends ChildField, ChildFieldElement> = {
    readonly element: ChildFieldElement;
    readonly schema: Schema;
};
declare type FormFieldPreviewProps<Schema extends FormField<any, any>> = {
    readonly value: Schema['defaultValue'];
    onChange(value: Schema['defaultValue']): void;
    readonly options: Schema['options'];
    readonly schema: Schema;
};
declare type ObjectFieldPreviewProps<Schema extends ObjectField<any>, ChildFieldElement> = {
    readonly fields: {
        readonly [Key in keyof Schema['fields']]: GenericPreviewProps<Schema['fields'][Key], ChildFieldElement>;
    };
    onChange(value: {
        readonly [Key in keyof Schema['fields']]?: InitialOrUpdateValueFromComponentPropField<Schema['fields'][Key]>;
    }): void;
    readonly schema: Schema;
};
declare type ConditionalFieldPreviewProps<Schema extends ConditionalField<FormField<string | boolean, any>, any>, ChildFieldElement> = {
    readonly [Key in keyof Schema['values']]: {
        readonly discriminant: DiscriminantStringToDiscriminantValue<Schema['discriminant'], Key>;
        onChange<Discriminant extends Schema['discriminant']['defaultValue']>(discriminant: Discriminant, value?: InitialOrUpdateValueFromComponentPropField<Schema['values'][`${Discriminant}`]>): void;
        readonly options: Schema['discriminant']['options'];
        readonly value: GenericPreviewProps<Schema['values'][Key], ChildFieldElement>;
        readonly schema: Schema;
    };
}[keyof Schema['values']];
declare type RelationshipDataType<Many extends boolean> = Many extends true ? readonly HydratedRelationshipData[] : HydratedRelationshipData | null;
declare type RelationshipFieldPreviewProps<Schema extends RelationshipField<boolean>> = {
    readonly value: RelationshipDataType<Schema['many']>;
    onChange(relationshipData: RelationshipDataType<Schema['many']>): void;
    readonly schema: Schema;
};
declare type ArrayFieldPreviewProps<Schema extends ArrayField<ComponentSchema>, ChildFieldElement> = {
    readonly elements: readonly (GenericPreviewProps<Schema['element'], ChildFieldElement> & {
        readonly key: string;
    })[];
    readonly onChange: (value: readonly {
        key: string | undefined;
        value?: InitialOrUpdateValueFromComponentPropField<Schema['element']>;
    }[]) => void;
    readonly schema: Schema;
};
export declare type GenericPreviewProps<Schema extends ComponentSchema, ChildFieldElement> = Schema extends ChildField ? ChildFieldPreviewProps<Schema, ChildFieldElement> : Schema extends FormField<infer Value, infer Options> ? FormFieldPreviewProps<Schema> : Schema extends ObjectField<infer Value> ? ObjectFieldPreviewProps<Schema, ChildFieldElement> : Schema extends ConditionalField<infer DiscriminantField, infer Values> ? ConditionalFieldPreviewProps<Schema, ChildFieldElement> : Schema extends RelationshipField<infer Many> ? RelationshipFieldPreviewProps<Schema> : Schema extends ArrayField<infer ElementField> ? ArrayFieldPreviewProps<Schema, ChildFieldElement> : never;
export declare type PreviewProps<Schema extends ComponentSchema> = GenericPreviewProps<Schema, ReactNode>;
export declare type InitialOrUpdateValueFromComponentPropField<Schema extends ComponentSchema> = Schema extends ChildField ? undefined : Schema extends FormField<infer Value, any> ? Value | undefined : Schema extends ObjectField<infer Value> ? {
    readonly [Key in keyof Value]?: InitialOrUpdateValueFromComponentPropField<Value[Key]>;
} : Schema extends ConditionalField<infer DiscriminantField, infer Values> ? {
    readonly [Key in keyof Values]: {
        readonly discriminant: DiscriminantStringToDiscriminantValue<DiscriminantField, Key>;
        readonly value?: InitialOrUpdateValueFromComponentPropField<Values[Key]>;
    };
}[keyof Values] : Schema extends RelationshipField<infer Many> ? Many extends true ? readonly HydratedRelationshipData[] : HydratedRelationshipData | null : Schema extends ArrayField<infer ElementField> ? readonly {
    key: string | undefined;
    value?: InitialOrUpdateValueFromComponentPropField<ElementField>;
}[] : never;
declare type DiscriminantStringToDiscriminantValue<DiscriminantField extends FormField<any, any>, DiscriminantString extends PropertyKey> = DiscriminantField['defaultValue'] extends boolean ? 'true' extends DiscriminantString ? true : 'false' extends DiscriminantString ? false : never : DiscriminantString;
export declare type PreviewPropsForToolbar<Schema extends ComponentSchema> = GenericPreviewProps<Schema, undefined>;
export declare type HydratedRelationshipData = {
    id: string;
    label: string;
    data: Record<string, any>;
};
export declare type RelationshipData = {
    id: string;
    label: string | undefined;
    data: Record<string, any> | undefined;
};
export declare function component<Schema extends {
    [Key in any]: ComponentSchema;
}>(options: {
    /** The preview component shown in the editor */
    preview: (props: PreviewProps<ObjectField<Schema>>) => ReactElement | null;
    /** The schema for the props that the preview component, toolbar and rendered component will receive */
    schema: Schema;
    /** The label to show in the insert menu and chrome around the block if chromeless is false */
    label: string;
} & ({
    chromeless: true;
    toolbar?: (props: {
        props: PreviewPropsForToolbar<ObjectField<Schema>>;
        onRemove(): void;
    }) => ReactElement;
} | {
    chromeless?: false;
    toolbar?: (props: {
        props: PreviewPropsForToolbar<ObjectField<Schema>>;
        onShowEditMode(): void;
        onRemove(): void;
    }) => ReactElement;
})): ComponentBlock<Schema>;
export declare const NotEditable: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => jsx.JSX.Element;
declare type Comp<Props> = (props: Props) => ReactElement | null;
declare type ValueForRenderingFromComponentPropField<Schema extends ComponentSchema> = Schema extends ChildField ? ReactNode : Schema extends FormField<infer Value, any> ? Value : Schema extends ObjectField<infer Value> ? {
    readonly [Key in keyof Value]: ValueForRenderingFromComponentPropField<Value[Key]>;
} : Schema extends ConditionalField<infer DiscriminantField, infer Values> ? {
    readonly [Key in keyof Values]: {
        readonly discriminant: DiscriminantStringToDiscriminantValue<DiscriminantField, Key>;
        readonly value: ValueForRenderingFromComponentPropField<Values[Key]>;
    };
}[keyof Values] : Schema extends RelationshipField<infer Many> ? Many extends true ? readonly HydratedRelationshipData[] : HydratedRelationshipData | null : Schema extends ArrayField<infer ElementField> ? readonly ValueForRenderingFromComponentPropField<ElementField>[] : never;
export declare type ValueForComponentSchema<Schema extends ComponentSchema> = Schema extends ChildField ? null : Schema extends FormField<infer Value, any> ? Value : Schema extends ObjectField<infer Value> ? {
    readonly [Key in keyof Value]: ValueForRenderingFromComponentPropField<Value[Key]>;
} : Schema extends ConditionalField<infer DiscriminantField, infer Values> ? {
    readonly [Key in keyof Values]: {
        readonly discriminant: DiscriminantStringToDiscriminantValue<DiscriminantField, Key>;
        readonly value: ValueForRenderingFromComponentPropField<Values[Key]>;
    };
}[keyof Values] : Schema extends RelationshipField<infer Many> ? Many extends true ? readonly HydratedRelationshipData[] : HydratedRelationshipData | null : Schema extends ArrayField<infer ElementField> ? readonly ValueForRenderingFromComponentPropField<ElementField>[] : never;
declare type ExtractPropsForPropsForRendering<Props extends Record<string, ComponentSchema>> = {
    readonly [Key in keyof Props]: ValueForRenderingFromComponentPropField<Props[Key]>;
};
export declare type InferRenderersForComponentBlocks<ComponentBlocks extends Record<string, ComponentBlock<any>>> = {
    [Key in keyof ComponentBlocks]: Comp<ExtractPropsForPropsForRendering<ComponentBlocks[Key]['schema']>>;
};
export {};
