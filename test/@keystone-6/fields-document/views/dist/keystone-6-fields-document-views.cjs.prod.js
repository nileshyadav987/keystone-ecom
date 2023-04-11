'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var slate = require('slate');
var documentRenderer = require('@keystone-6/document-renderer');
var weakMemoize = require('@emotion/weak-memoize');
var components = require('@keystone-6/core/admin-ui/components');
var index = require('../../dist/index-7de09e4b.cjs.prod.js');
var formFromPreview = require('../../dist/form-from-preview-5e2462c9.cjs.prod.js');
var api = require('../../dist/api-3438d02b.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/extends');
require('@babel/runtime/helpers/objectWithoutProperties');
require('react');
require('is-hotkey');
require('slate-react');
require('slate-history');
require('@keystone-ui/popover');
require('@keystone-ui/tooltip');
require('@keystone-ui/icons/icons/LinkIcon');
require('@keystone-ui/icons/icons/Trash2Icon');
require('@keystone-ui/icons/icons/ExternalLinkIcon');
require('../../dist/toolbar-208f7fe5.cjs.prod.js');
require('../../dist/orderable-cf9aac62.cjs.prod.js');
require('@dnd-kit/core');
require('@dnd-kit/sortable');
require('@dnd-kit/modifiers');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/ColumnsIcon');
require('@keystone-6/core/admin-ui/context');
require('@keystone-6/core/fields/types/relationship/views/RelationshipSelect');
require('apply-ref');
require('@keystone-ui/icons/icons/BoldIcon');
require('@keystone-ui/icons/icons/ItalicIcon');
require('@keystone-ui/icons/icons/PlusIcon');
require('@keystone-ui/icons/icons/ChevronDownIcon');
require('@keystone-ui/icons/icons/Maximize2Icon');
require('@keystone-ui/icons/icons/Minimize2Icon');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/CodeIcon');
require('@keystone-ui/icons/icons/AlignLeftIcon');
require('@keystone-ui/icons/icons/AlignRightIcon');
require('@keystone-ui/icons/icons/AlignCenterIcon');
require('@keystone-ui/icons/icons/MinusIcon');
require('match-sorter');
require('scroll-into-view-if-needed');
require('mdast-util-from-markdown');
require('mdast-util-gfm-autolink-literal/from-markdown');
require('micromark-extension-gfm-autolink-literal');
require('mdast-util-gfm-strikethrough/from-markdown');
require('micromark-extension-gfm-strikethrough');
require('@keystone-ui/icons/icons/PlusCircleIcon');
require('@keystone-ui/modals');
require('@keystone-6/core');
require('@braintree/sanitize-url');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, {
    as: "span",
    id: `${field.path}-label`
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(formFromPreview.ForceValidationProvider, {
    value: !!forceValidation
  }, core.jsx(index.DocumentEditor, {
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
  return nodes.map(n => slate.Node.string(n)).join('\n');
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
  return linkTo ? core.jsx(components.CellLink, linkTo, cutText) : core.jsx(components.CellContainer, null, cutText);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  var _item$field$path2;
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), core.jsx(documentRenderer.DocumentRenderer, {
    document: ((_item$field$path2 = item[field.path]) === null || _item$field$path2 === void 0 ? void 0 : _item$field$path2.document) || []
  }));
};
const allowedExportsOnCustomViews = ['componentBlocks'];
const controller = config => {
  const memoizedIsComponentBlockValid = weakMemoize__default["default"](componentBlock => weakMemoize__default["default"](props => formFromPreview.clientSideValidateProp({
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
  const validateNode = weakMemoize__default["default"](node => {
    if (slate.Text.isText(node)) {
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
    if (node.type === 'link' && (typeof node.href !== 'string' || !api.isValidURL(node.href))) {
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
      const editor = index.createDocumentEditor(config.fieldMeta.documentFeatures, componentBlocks, config.fieldMeta.relationships);
      editor.children = documentFromServer;
      slate.Editor.normalize(editor, {
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

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.allowedExportsOnCustomViews = allowedExportsOnCustomViews;
exports.controller = controller;
