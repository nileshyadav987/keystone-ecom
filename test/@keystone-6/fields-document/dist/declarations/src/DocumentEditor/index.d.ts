/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { ReactNode } from 'react';
import { Editor, Node, Element, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { ComponentBlock } from '../component-blocks';
import { DocumentFeatures } from '../views';
import { Relationships } from './relationship';
export { Editor } from 'slate';
export declare function createDocumentEditor(documentFeatures: DocumentFeatures, componentBlocks: Record<string, ComponentBlock>, relationships: Relationships): {
    type?: undefined;
} & import("slate").BaseEditor & ReactEditor & import("slate-history").HistoryEditor;
export declare function DocumentEditor({ onChange, value, componentBlocks, relationships, documentFeatures, initialExpanded, ...props }: {
    onChange: undefined | ((value: Descendant[]) => void);
    value: Descendant[];
    componentBlocks: Record<string, ComponentBlock>;
    relationships: Relationships;
    documentFeatures: DocumentFeatures;
    initialExpanded?: boolean;
} & Omit<EditableProps, 'value' | 'onChange'>): jsx.JSX.Element;
export declare function DocumentEditorProvider({ children, editor, onChange, value, componentBlocks, documentFeatures, relationships, }: {
    children: ReactNode;
    value: Descendant[];
    onChange: (value: Descendant[]) => void;
    editor: Editor;
    componentBlocks: Record<string, ComponentBlock>;
    relationships: Relationships;
    documentFeatures: DocumentFeatures;
}): jsx.JSX.Element;
export declare function DocumentEditorEditable(props: EditableProps): jsx.JSX.Element;
export declare type Block = Exclude<Element, {
    type: 'relationship' | 'link';
}>;
declare type BlockContainerSchema = {
    kind: 'blocks';
    allowedChildren: ReadonlySet<Element['type']>;
    blockToWrapInlinesIn: TypesWhichHaveNoExtraRequiredProps;
    invalidPositionHandleMode: 'unwrap' | 'move';
};
declare type InlineContainerSchema = {
    kind: 'inlines';
    invalidPositionHandleMode: 'unwrap' | 'move';
};
declare type TypesWhichHaveNoExtraRequiredProps = {
    [Type in Block['type']]: {
        type: Type;
        children: Descendant[];
    } extends Block & {
        type: Type;
    } ? Type : never;
}[Block['type']];
declare type EditorSchema = typeof editorSchema;
export declare const editorSchema: {
    editor: BlockContainerSchema;
    layout: BlockContainerSchema;
    'layout-area': BlockContainerSchema;
    blockquote: BlockContainerSchema;
    paragraph: InlineContainerSchema;
    code: InlineContainerSchema;
    divider: InlineContainerSchema;
    heading: InlineContainerSchema;
    'component-block': BlockContainerSchema;
    'component-inline-prop': InlineContainerSchema;
    'component-block-prop': BlockContainerSchema;
    'ordered-list': BlockContainerSchema;
    'unordered-list': BlockContainerSchema;
    'list-item': BlockContainerSchema;
    'list-item-content': InlineContainerSchema;
};
declare type InlineContainingType = {
    [Key in keyof EditorSchema]: {
        inlines: Key;
        blocks: never;
    }[EditorSchema[Key]['kind']];
}[keyof EditorSchema];
export declare function isInlineContainer(node: Node): node is Block & {
    type: InlineContainingType;
};
export declare function isBlock(node: Descendant): node is Block;
