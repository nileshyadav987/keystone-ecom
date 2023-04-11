import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';
import { Text, Editor, Node } from 'slate';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import weakMemoize from '@emotion/weak-memoize';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';
import { D as DocumentEditor, c as createDocumentEditor } from '../../dist/index-964bca20.esm.js';
import { B as ForceValidationProvider, e as clientSideValidateProp } from '../../dist/form-from-preview-f68e552c.esm.js';
import { i as isValidURL } from '../../dist/api-6f16c890.esm.js';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/extends';
import '@babel/runtime/helpers/objectWithoutProperties';
import 'react';
import 'is-hotkey';
import 'slate-react';
import 'slate-history';
import '@keystone-ui/popover';
import '@keystone-ui/tooltip';
import '@keystone-ui/icons/icons/LinkIcon';
import '@keystone-ui/icons/icons/Trash2Icon';
import '@keystone-ui/icons/icons/ExternalLinkIcon';
import '../../dist/toolbar-4133eda9.esm.js';
import '../../dist/orderable-ff385078.esm.js';
import '@dnd-kit/core';
import '@dnd-kit/sortable';
import '@dnd-kit/modifiers';
import '@keystone-ui/button';
import '@keystone-ui/icons/icons/ColumnsIcon';
import '@keystone-6/core/admin-ui/context';
import '@keystone-6/core/fields/types/relationship/views/RelationshipSelect';
import 'apply-ref';
import '@keystone-ui/icons/icons/BoldIcon';
import '@keystone-ui/icons/icons/ItalicIcon';
import '@keystone-ui/icons/icons/PlusIcon';
import '@keystone-ui/icons/icons/ChevronDownIcon';
import '@keystone-ui/icons/icons/Maximize2Icon';
import '@keystone-ui/icons/icons/Minimize2Icon';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/CodeIcon';
import '@keystone-ui/icons/icons/AlignLeftIcon';
import '@keystone-ui/icons/icons/AlignRightIcon';
import '@keystone-ui/icons/icons/AlignCenterIcon';
import '@keystone-ui/icons/icons/MinusIcon';
import 'match-sorter';
import 'scroll-into-view-if-needed';
import 'mdast-util-from-markdown';
import 'mdast-util-gfm-autolink-literal/from-markdown';
import 'micromark-extension-gfm-autolink-literal';
import 'mdast-util-gfm-strikethrough/from-markdown';
import 'micromark-extension-gfm-strikethrough';
import '@keystone-ui/icons/icons/PlusCircleIcon';
import '@keystone-ui/modals';
import '@keystone-6/core';
import '@braintree/sanitize-url';

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  return jsx(FieldContainer, null, jsx(FieldLabel, {
    as: "span",
    id: `${field.path}-label`
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), jsx(ForceValidationProvider, {
    value: !!forceValidation
  }, jsx(DocumentEditor, {
    autoFocus: autoFocus,
    "aria-labelledby": `${field.path}-label`,
    value: value,
    onChange: onChange,
    componentBlocks: field.componentBlocks,
    relationships: field.relationships,
    documentFeatures: field.documentFeatures
  })));
};
const serialize = nodes => {
  return nodes.map(n => Node.string(n)).join('\n');
};
const Cell = _ref2 => {
  var _item$field$path;
  let {
    item,
    field,
    linkTo
  } = _ref2;
  const value = (_item$field$path = item[field.path]) === null || _item$field$path === void 0 ? void 0 : _item$field$path.document;
  if (!value) return null;
  const plainText = serialize(value);
  const cutText = plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  return linkTo ? jsx(CellLink, linkTo, cutText) : jsx(CellContainer, null, cutText);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  var _item$field$path2;
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), jsx(DocumentRenderer, {
    document: ((_item$field$path2 = item[field.path]) === null || _item$field$path2 === void 0 ? void 0 : _item$field$path2.document) || []
  }));
};
const allowedExportsOnCustomViews = ['componentBlocks'];
const controller = config => {
  const memoizedIsComponentBlockValid = weakMemoize(componentBlock => weakMemoize(props => clientSideValidateProp({
    kind: 'object',
    fields: componentBlock.schema
  }, props)));
  const componentBlocks = config.customViews.componentBlocks || {};
  const serverSideComponentBlocksSet = new Set(config.fieldMeta.componentBlocksPassedOnServer);
  const componentBlocksOnlyBeingPassedOnTheClient = Object.keys(componentBlocks).filter(x => !serverSideComponentBlocksSet.has(x));
  if (componentBlocksOnlyBeingPassedOnTheClient.length) {
    throw new Error(`(${config.listKey}:${config.path}) The following component blocks are being passed in the custom view but not in the server-side field config: ${JSON.stringify(componentBlocksOnlyBeingPassedOnTheClient)}`);
  }
  const clientSideComponentBlocksSet = new Set(Object.keys(componentBlocks));
  const componentBlocksOnlyBeingPassedOnTheServer = config.fieldMeta.componentBlocksPassedOnServer.filter(x => !clientSideComponentBlocksSet.has(x));
  if (componentBlocksOnlyBeingPassedOnTheServer.length) {
    throw new Error(`(${config.listKey}:${config.path}) The following component blocks are being passed in the server-side field config but not in the custom view: ${JSON.stringify(componentBlocksOnlyBeingPassedOnTheServer)}`);
  }
  const validateNode = weakMemoize(node => {
    if (Text.isText(node)) {
      return true;
    }
    if (node.type === 'component-block') {
      const componentBlock = componentBlocks[node.component];
      if (componentBlock) {
        if (!memoizedIsComponentBlockValid(componentBlock)(node.props)) {
          return false;
        }
      }
    }
    if (node.type === 'link' && (typeof node.href !== 'string' || !isValidURL(node.href))) {
      return false;
    }
    return node.children.every(node => validateNode(node));
  });
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {document(hydrateRelationships: true)}`,
    componentBlocks: config.customViews.componentBlocks || {},
    documentFeatures: config.fieldMeta.documentFeatures,
    relationships: config.fieldMeta.relationships,
    defaultValue: [{
      type: 'paragraph',
      children: [{
        text: ''
      }]
    }],
    deserialize: data => {
      var _data$config$path;
      const documentFromServer = (_data$config$path = data[config.path]) === null || _data$config$path === void 0 ? void 0 : _data$config$path.document;
      if (!documentFromServer) {
        return [{
          type: 'paragraph',
          children: [{
            text: ''
          }]
        }];
      }
      // make a temporary editor to normalize the document
      const editor = createDocumentEditor(config.fieldMeta.documentFeatures, componentBlocks, config.fieldMeta.relationships);
      editor.children = documentFromServer;
      Editor.normalize(editor, {
        force: true
      });
      return editor.children;
    },
    serialize: value => ({
      [config.path]: value
    }),
    validate(value) {
      return value.every(node => validateNode(node));
    }
  };
};

export { CardValue, Cell, Field, allowedExportsOnCustomViews, controller };
