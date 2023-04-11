'use strict';

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var core = require('@keystone-ui/core');
var React = require('react');
var isHotkey = require('is-hotkey');
var slate = require('slate');
var slateReact = require('slate-react');
var slateHistory = require('slate-history');
var popover = require('@keystone-ui/popover');
var tooltip = require('@keystone-ui/tooltip');
var LinkIcon = require('@keystone-ui/icons/icons/LinkIcon');
var Trash2Icon = require('@keystone-ui/icons/icons/Trash2Icon');
var ExternalLinkIcon = require('@keystone-ui/icons/icons/ExternalLinkIcon');
var toolbar = require('./toolbar-90322708.cjs.dev.js');
require('./orderable-eb77c396.cjs.dev.js');
var formFromPreview = require('./form-from-preview-31c5b8ad.cjs.dev.js');
var button = require('@keystone-ui/button');
var api = require('./api-32643067.cjs.dev.js');
var weakMemoize = require('@emotion/weak-memoize');
var ColumnsIcon = require('@keystone-ui/icons/icons/ColumnsIcon');
var context = require('@keystone-6/core/admin-ui/context');
var RelationshipSelect = require('@keystone-6/core/fields/types/relationship/views/RelationshipSelect');
var applyRef = require('apply-ref');
var BoldIcon = require('@keystone-ui/icons/icons/BoldIcon');
var ItalicIcon = require('@keystone-ui/icons/icons/ItalicIcon');
var PlusIcon = require('@keystone-ui/icons/icons/PlusIcon');
var ChevronDownIcon = require('@keystone-ui/icons/icons/ChevronDownIcon');
var Maximize2Icon = require('@keystone-ui/icons/icons/Maximize2Icon');
var Minimize2Icon = require('@keystone-ui/icons/icons/Minimize2Icon');
var MoreHorizontalIcon = require('@keystone-ui/icons/icons/MoreHorizontalIcon');
var CodeIcon = require('@keystone-ui/icons/icons/CodeIcon');
var AlignLeftIcon = require('@keystone-ui/icons/icons/AlignLeftIcon');
var AlignRightIcon = require('@keystone-ui/icons/icons/AlignRightIcon');
var AlignCenterIcon = require('@keystone-ui/icons/icons/AlignCenterIcon');
var MinusIcon = require('@keystone-ui/icons/icons/MinusIcon');
var matchSorter = require('match-sorter');
var scrollIntoView = require('scroll-into-view-if-needed');
var mdASTUtilFromMarkdown = require('mdast-util-from-markdown');
var autoLinkLiteralFromMarkdownExtension = require('mdast-util-gfm-autolink-literal/from-markdown');
var autoLinkLiteralMarkdownSyntax = require('micromark-extension-gfm-autolink-literal');
var gfmStrikethroughFromMarkdownExtension = require('mdast-util-gfm-strikethrough/from-markdown');
var gfmStrikethroughMarkdownSyntax = require('micromark-extension-gfm-strikethrough');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var isHotkey__default = /*#__PURE__*/_interopDefault(isHotkey);
var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);
var scrollIntoView__default = /*#__PURE__*/_interopDefault(scrollIntoView);
var mdASTUtilFromMarkdown__default = /*#__PURE__*/_interopDefault(mdASTUtilFromMarkdown);
var autoLinkLiteralFromMarkdownExtension__default = /*#__PURE__*/_interopDefault(autoLinkLiteralFromMarkdownExtension);
var autoLinkLiteralMarkdownSyntax__default = /*#__PURE__*/_interopDefault(autoLinkLiteralMarkdownSyntax);
var gfmStrikethroughFromMarkdownExtension__default = /*#__PURE__*/_interopDefault(gfmStrikethroughFromMarkdownExtension);
var gfmStrikethroughMarkdownSyntax__default = /*#__PURE__*/_interopDefault(gfmStrikethroughMarkdownSyntax);

const paragraphElement = () => ({
  type: 'paragraph',
  children: [{
    text: ''
  }]
});
function withParagraphs(editor) {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (slate.Editor.isEditor(node)) {
      let lastNode = node.children[node.children.length - 1];
      if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) !== 'paragraph') {
        slate.Transforms.insertNodes(editor, paragraphElement(), {
          at: [...path, node.children.length]
        });
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

function areArraysEqual(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
function normalizeTextBasedOnInlineMarksAndSoftBreaks(_ref, editor, inlineMarks, softBreaks) {
  let [node, path] = _ref;
  const marksToRemove = Object.keys(node).filter(x => x !== 'text' && x !== 'insertMenu' && inlineMarks[x] !== true);
  if (marksToRemove.length) {
    slate.Transforms.unsetNodes(editor, marksToRemove, {
      at: path
    });
    return true;
  }
  if (!softBreaks) {
    const hasSoftBreaks = node.text.includes('\n');
    if (hasSoftBreaks) {
      const [parentNode] = slate.Editor.parent(editor, path);
      if (parentNode.type !== 'code') {
        for (const position of slate.Editor.positions(editor, {
          at: path
        })) {
          const character = slate.Node.get(editor, position.path).text[position.offset];
          if (character === '\n') {
            slate.Transforms.delete(editor, {
              at: position
            });
            return true;
          }
        }
      }
    }
  }
  return false;
}
function normalizeInlineBasedOnLinksAndRelationships(_ref2, editor, links, relationshipsEnabled, relationships) {
  let [node, path] = _ref2;
  if (node.type === 'link' && !links) {
    slate.Transforms.insertText(editor, ` (${node.href})`, {
      at: slate.Editor.end(editor, path)
    });
    slate.Transforms.unwrapNodes(editor, {
      at: path
    });
    return true;
  }
  if (node.type === 'relationship' && (!relationshipsEnabled || relationships[node.relationship] === undefined)) {
    const data = node.data;
    if (data) {
      const relationship = relationships[node.relationship];
      slate.Transforms.insertText(editor, `${data.label || data.id || ''} (${(relationship === null || relationship === void 0 ? void 0 : relationship.label) || node.relationship}:${data.id || ''})`, {
        at: slate.Editor.before(editor, path)
      });
    }
    slate.Transforms.removeNodes(editor, {
      at: path
    });
    return true;
  }
  return false;
}
function normalizeElementBasedOnDocumentFeatures(_ref3, editor, _ref4, relationships) {
  let [node, path] = _ref3;
  let {
    formatting,
    dividers,
    layouts,
    links,
    relationships: relationshipsEnabled
  } = _ref4;
  if (node.type === 'heading' && (!formatting.headingLevels.length || !formatting.headingLevels.includes(node.level)) || node.type === 'ordered-list' && !formatting.listTypes.ordered || node.type === 'unordered-list' && !formatting.listTypes.unordered || node.type === 'code' && !formatting.blockTypes.code || node.type === 'blockquote' && !formatting.blockTypes.blockquote || node.type === 'layout' && (layouts.length === 0 || !layouts.some(layout => areArraysEqual(layout, node.layout)))) {
    slate.Transforms.unwrapNodes(editor, {
      at: path
    });
    return true;
  }
  if ((node.type === 'paragraph' || node.type === 'heading') && (!formatting.alignment.center && node.textAlign === 'center' || !formatting.alignment.end && node.textAlign === 'end' || 'textAlign' in node && node.textAlign !== 'center' && node.textAlign !== 'end')) {
    slate.Transforms.unsetNodes(editor, 'textAlign', {
      at: path
    });
    return true;
  }
  if (node.type === 'divider' && !dividers) {
    slate.Transforms.removeNodes(editor, {
      at: path
    });
    return true;
  }
  return normalizeInlineBasedOnLinksAndRelationships([node, path], editor, links, relationshipsEnabled, relationships);
}
function withDocumentFeaturesNormalization(documentFeatures, relationships, editor) {
  const {
    normalizeNode
  } = editor;
  const documentFeaturesForNormalization = _objectSpread(_objectSpread({}, documentFeatures), {}, {
    relationships: true
  });
  editor.normalizeNode = _ref5 => {
    let [node, path] = _ref5;
    if (slate.Text.isText(node)) {
      normalizeTextBasedOnInlineMarksAndSoftBreaks([node, path], editor, documentFeatures.formatting.inlineMarks, documentFeatures.formatting.softBreaks);
    } else if (slate.Element.isElement(node)) {
      normalizeElementBasedOnDocumentFeatures([node, path], editor, documentFeaturesForNormalization, relationships);
    }
    normalizeNode([node, path]);
  };
  return editor;
}

function updateComponentBlockElementProps(editor, componentBlock, prevProps, newProps, basePath, setElement) {
  slate.Editor.withoutNormalizing(editor, () => {
    setElement({
      props: newProps
    });
    const childPropPaths = findChildPropPathsWithPrevious(newProps, prevProps, {
      kind: 'object',
      fields: componentBlock.schema
    }, [], [], []);
    const getNode = () => slate.Node.get(editor, basePath);
    const elementForChildren = getNode();
    if (childPropPaths.length === 0) {
      const indexes = elementForChildren.children.map((_, i) => i).reverse();
      for (const idx of indexes) {
        slate.Transforms.removeNodes(editor, {
          at: [...basePath, idx]
        });
      }
      slate.Transforms.insertNodes(editor, {
        type: 'component-inline-prop',
        propPath: undefined,
        children: [{
          text: ''
        }]
      }, {
        at: [...basePath, 0]
      });
      return;
    }
    const initialPropPathsToEditorPath = new Map();
    for (const [idx, node] of elementForChildren.children.entries()) {
      formFromPreview.assert(node.type === 'component-block-prop' || node.type === 'component-inline-prop');
      initialPropPathsToEditorPath.set(node.propPath === undefined ? undefined : JSON.stringify(node.propPath), idx);
    }
    const childrenLeftToAdd = new Set(childPropPaths);
    for (const childProp of childPropPaths) {
      if (childProp.prevPath === undefined) {
        continue;
      }
      const stringifiedPath = JSON.stringify(childProp.prevPath);
      const idxInChildren = initialPropPathsToEditorPath.get(stringifiedPath);
      if (idxInChildren !== undefined) {
        const prevNode = elementForChildren.children[idxInChildren];
        formFromPreview.assert(prevNode.propPath !== undefined);
        if (!areArraysEqual(childProp.path, prevNode.propPath)) {
          slate.Transforms.setNodes(editor, {
            propPath: childProp.path
          }, {
            at: [...basePath, idxInChildren]
          });
        }
        childrenLeftToAdd.delete(childProp);
        initialPropPathsToEditorPath.delete(stringifiedPath);
      }
    }
    let newIdx = getNode().children.length;
    for (const childProp of childrenLeftToAdd) {
      slate.Transforms.insertNodes(editor, {
        type: `component-${childProp.options.kind}-prop`,
        propPath: childProp.path,
        children: [childProp.options.kind === 'block' ? {
          type: 'paragraph',
          children: [{
            text: ''
          }]
        } : {
          text: ''
        }]
      }, {
        at: [...basePath, newIdx]
      });
      newIdx++;
    }
    const pathsToRemove = [];
    for (const [, idxInChildren] of initialPropPathsToEditorPath) {
      pathsToRemove.push(slate.Editor.pathRef(editor, [...basePath, idxInChildren]));
    }
    for (const pathRef of pathsToRemove) {
      const path = pathRef.unref();
      formFromPreview.assert(path !== null);
      slate.Transforms.removeNodes(editor, {
        at: path
      });
    }
    const propPathsToExpectedIndexes = new Map();
    for (const [idx, thing] of childPropPaths.entries()) {
      propPathsToExpectedIndexes.set(JSON.stringify(thing.path), idx);
    }
    outer: while (true) {
      for (const [idx, childNode] of getNode().children.entries()) {
        formFromPreview.assert(childNode.type === 'component-block-prop' || childNode.type === 'component-inline-prop');
        const expectedIndex = propPathsToExpectedIndexes.get(JSON.stringify(childNode.propPath));
        formFromPreview.assert(expectedIndex !== undefined);
        if (idx === expectedIndex) continue;
        slate.Transforms.moveNodes(editor, {
          at: [...basePath, idx],
          to: [...basePath, expectedIndex]
        });

        // start the for-loop again
        continue outer;
      }
      break;
    }
  });
}
function findChildPropPathsWithPrevious(value, prevValue, schema, newPath, prevPath, pathWithKeys) {
  switch (schema.kind) {
    case 'form':
      return [];
    case 'relationship':
      return [];
    case 'child':
      return [{
        path: newPath,
        prevPath,
        options: schema.options
      }];
    case 'conditional':
      const hasChangedDiscriminant = value.discriminant === prevValue.discriminant;
      return findChildPropPathsWithPrevious(value.value, hasChangedDiscriminant ? prevValue.value : formFromPreview.getInitialPropsValue(schema.values[value.discriminant]), schema.values[value.discriminant], newPath.concat('value'), hasChangedDiscriminant ? undefined : prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat('value'), hasChangedDiscriminant ? undefined : pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat('value'));
    case 'object':
      {
        const paths = [];
        for (const key of Object.keys(schema.fields)) {
          paths.push(...findChildPropPathsWithPrevious(value[key], prevValue[key], schema.fields[key], newPath.concat(key), prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat(key), pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat(key)));
        }
        return paths;
      }
    case 'array':
      {
        const paths = [];
        const prevKeys = formFromPreview.getKeysForArrayValue(prevValue);
        const keys = formFromPreview.getKeysForArrayValue(value);
        for (const [i, val] of value.entries()) {
          const key = keys[i];
          const prevIdx = prevKeys.indexOf(key);
          let prevVal;
          if (prevIdx === -1) {
            prevVal = formFromPreview.getInitialPropsValue(schema.element);
          } else {
            prevVal = prevValue[prevIdx];
          }
          paths.push(...findChildPropPathsWithPrevious(val, prevVal, schema.element, newPath.concat(i), prevIdx === -1 ? undefined : prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat(prevIdx), prevIdx === -1 ? undefined : pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat(key)));
        }
        return paths;
      }
  }
}

/** @jsxRuntime classic */
const ChildrenByPathContext = /*#__PURE__*/React__default["default"].createContext({});
function ChildFieldEditable(_ref) {
  let {
    path
  } = _ref;
  const childrenByPath = React.useContext(ChildrenByPathContext);
  const child = childrenByPath[JSON.stringify(path)];
  if (child === undefined) {
    return null;
  }
  return child;
}
function ComponentBlockRender(_ref2) {
  let {
    componentBlock,
    element,
    onChange,
    children
  } = _ref2;
  const getPreviewProps = React.useMemo(() => {
    return formFromPreview.createGetPreviewProps({
      kind: 'object',
      fields: componentBlock.schema
    }, onChange, path => core.jsx(ChildFieldEditable, {
      path: path
    }));
  }, [onChange, componentBlock]);
  const previewProps = getPreviewProps(element.props);
  const childrenByPath = {};
  let maybeChild;
  children.forEach(child => {
    const propPath = child.props.children.props.element.propPath;
    if (propPath === undefined) {
      maybeChild = child;
    } else {
      childrenByPath[JSON.stringify(propPathWithIndiciesToKeys(propPath, element.props))] = child;
    }
  });
  const ComponentBlockPreview = componentBlock.preview;
  return core.jsx(ChildrenByPathContext.Provider, {
    value: childrenByPath
  }, React.useMemo(() => core.jsx(ComponentBlockPreview, previewProps), [previewProps, ComponentBlockPreview]), core.jsx("span", {
    css: {
      caretColor: 'transparent',
      '& ::selection': {
        backgroundColor: 'transparent'
      }
    }
  }, maybeChild));
}

// note this is written to avoid crashing when the given prop path doesn't exist in the value
// this is because editor updates happen asynchronously but we have some logic to ensure
// that updating the props of a component block synchronously updates it
// (this is primarily to not mess up things like cursors in inputs)
// this means that sometimes the child elements will be inconsistent with the values
// so to deal with this, we return a prop path this is "wrong" but won't break anything
function propPathWithIndiciesToKeys(propPath, val) {
  return propPath.map(key => {
    var _val2;
    if (typeof key === 'string') {
      var _val;
      val = (_val = val) === null || _val === void 0 ? void 0 : _val[key];
      return key;
    }
    if (!Array.isArray(val)) {
      val = undefined;
      return '';
    }
    const keys = formFromPreview.getKeysForArrayValue(val);
    val = (_val2 = val) === null || _val2 === void 0 ? void 0 : _val2[key];
    return keys[key];
  });
}

function ChromefulComponentBlockElement(props) {
  var _props$componentBlock;
  const selected = slateReact.useSelected();
  const {
    colors,
    fields,
    spacing,
    typography
  } = core.useTheme();
  const isValid = React.useMemo(() => formFromPreview.clientSideValidateProp({
    kind: 'object',
    fields: props.componentBlock.schema
  }, props.elementProps), [props.componentBlock, props.elementProps]);
  const [editMode, setEditMode] = React.useState(false);
  const onCloseEditMode = React.useCallback(() => {
    setEditMode(false);
  }, []);
  const onShowEditMode = React.useCallback(() => {
    setEditMode(true);
  }, []);
  const ChromefulToolbar = (_props$componentBlock = props.componentBlock.toolbar) !== null && _props$componentBlock !== void 0 ? _props$componentBlock : DefaultToolbarWithChrome;
  return core.jsx("div", _extends({}, props.attributes, {
    css: {
      marginBottom: spacing.xlarge,
      marginTop: spacing.xlarge,
      paddingLeft: spacing.xlarge,
      position: 'relative',
      ':before': {
        content: '" "',
        backgroundColor: selected ? colors.focusRing : editMode ? colors.linkColor : colors.border,
        borderRadius: 4,
        width: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
      }
    }
  }), core.jsx(api.NotEditable, {
    css: {
      color: fields.legendColor,
      display: 'block',
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.bold,
      lineHeight: 1,
      marginBottom: spacing.small,
      textTransform: 'uppercase'
    }
  }, props.componentBlock.label), editMode ? core.jsx(React.Fragment, null, core.jsx(FormValue, {
    isValid: isValid,
    props: props.previewProps,
    onClose: onCloseEditMode
  }), core.jsx("div", {
    css: {
      display: 'none'
    }
  }, props.children)) : core.jsx(React.Fragment, null, props.renderedBlock, core.jsx(ChromefulToolbar, {
    isValid: isValid,
    onRemove: props.onRemove,
    onShowEditMode: onShowEditMode,
    props: props.previewProps
  })));
}
function DefaultToolbarWithChrome(_ref) {
  let {
    onShowEditMode,
    onRemove,
    isValid
  } = _ref;
  const theme = core.useTheme();
  return core.jsx(toolbar.ToolbarGroup, {
    as: api.NotEditable,
    marginTop: "small"
  }, core.jsx(toolbar.ToolbarButton, {
    onClick: () => {
      onShowEditMode();
    }
  }, "Edit"), core.jsx(toolbar.ToolbarSeparator, null), core.jsx(tooltip.Tooltip, {
    content: "Remove",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    variant: "destructive",
    onClick: () => {
      onRemove();
    }
  }, attrs), core.jsx(Trash2Icon.Trash2Icon, {
    size: "small"
  }))), !isValid && core.jsx(React.Fragment, null, core.jsx(toolbar.ToolbarSeparator, null), core.jsx("span", {
    css: {
      color: theme.palette.red500,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.small
    }
  }, "Please edit the form, there are invalid fields.")));
}
function FormValue(_ref2) {
  let {
    onClose,
    props,
    isValid
  } = _ref2;
  const [forceValidation, setForceValidation] = React.useState(false);
  return core.jsx(core.Stack, {
    gap: "xlarge",
    contentEditable: false
  }, core.jsx(formFromPreview.FormValueContentFromPreviewProps, _extends({}, props, {
    forceValidation: forceValidation
  })), core.jsx(button.Button, {
    size: "small",
    tone: "active",
    weight: "bold",
    onClick: () => {
      if (isValid) {
        onClose();
      } else {
        setForceValidation(true);
      }
    }
  }, "Done"));
}

function ChromelessComponentBlockElement(props) {
  var _props$componentBlock;
  const {
    trigger,
    dialog
  } = popover.useControlledPopover({
    isOpen: props.isOpen,
    onClose: () => {}
  }, {
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  const {
    spacing
  } = core.useTheme();
  const ChromelessToolbar = (_props$componentBlock = props.componentBlock.toolbar) !== null && _props$componentBlock !== void 0 ? _props$componentBlock : DefaultToolbarWithoutChrome;
  return core.jsx("div", _extends({}, props.attributes, {
    css: {
      marginBottom: spacing.xlarge,
      marginTop: spacing.xlarge
    }
  }), core.jsx("div", _extends({}, trigger.props, {
    ref: trigger.ref
  }), props.renderedBlock, props.isOpen && core.jsx(toolbar.InlineDialog, _extends({}, dialog.props, {
    ref: dialog.ref
  }), core.jsx(ChromelessToolbar, {
    onRemove: props.onRemove,
    props: props.previewProps
  }))));
}
function DefaultToolbarWithoutChrome(_ref) {
  let {
    onRemove
  } = _ref;
  return core.jsx(tooltip.Tooltip, {
    content: "Remove",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    variant: "destructive",
    onMouseDown: event => {
      event.preventDefault();
      onRemove();
    }
  }, attrs), core.jsx(Trash2Icon.Trash2Icon, {
    size: "small"
  })));
}

function getAncestorComponentBlock(editor) {
  if (editor.selection) {
    const ancestorEntry = slate.Editor.above(editor, {
      match: node => slate.Editor.isBlock(editor, node) && node.type !== 'paragraph'
    });
    if (ancestorEntry && (ancestorEntry[0].type === 'component-block-prop' || ancestorEntry[0].type === 'component-inline-prop')) {
      return {
        isInside: true,
        componentBlock: slate.Editor.parent(editor, ancestorEntry[1]),
        prop: ancestorEntry
      };
    }
  }
  return {
    isInside: false
  };
}
const alreadyNormalizedThings = new WeakMap();
function normalizeNodeWithinComponentProp(_ref, editor, fieldOptions, relationships) {
  let [node, path] = _ref;
  let alreadyNormalizedNodes = alreadyNormalizedThings.get(fieldOptions);
  if (!alreadyNormalizedNodes) {
    alreadyNormalizedNodes = new WeakSet();
    alreadyNormalizedThings.set(fieldOptions, alreadyNormalizedNodes);
  }
  if (alreadyNormalizedNodes.has(node)) {
    return false;
  }
  let didNormalization = false;
  if (fieldOptions.inlineMarks !== 'inherit' && slate.Text.isText(node)) {
    didNormalization = normalizeTextBasedOnInlineMarksAndSoftBreaks([node, path], editor, fieldOptions.inlineMarks, fieldOptions.softBreaks);
  }
  if (slate.Element.isElement(node)) {
    let childrenHasChanged = node.children.map((node, i) => normalizeNodeWithinComponentProp([node, [...path, i]], editor, fieldOptions, relationships))
    // .map then .some because we don't want to exit early
    .some(x => x);
    if (fieldOptions.kind === 'block') {
      didNormalization = normalizeElementBasedOnDocumentFeatures([node, path], editor, fieldOptions.documentFeatures, relationships) || childrenHasChanged;
    } else {
      didNormalization = normalizeInlineBasedOnLinksAndRelationships([node, path], editor, fieldOptions.documentFeatures.links, fieldOptions.documentFeatures.relationships, relationships);
    }
  }
  if (didNormalization === false) {
    alreadyNormalizedNodes.add(node);
  }
  return didNormalization;
}
function canSchemaContainChildField(rootSchema) {
  const queue = new Set([rootSchema]);
  for (const schema of queue) {
    if (schema.kind === 'form' || schema.kind === 'relationship') ; else if (schema.kind === 'child') {
      return true;
    } else if (schema.kind === 'array') {
      queue.add(schema.element);
    } else if (schema.kind === 'object') {
      for (const innerProp of Object.values(schema.fields)) {
        queue.add(innerProp);
      }
    } else if (schema.kind === 'conditional') {
      for (const innerProp of Object.values(schema.values)) {
        queue.add(innerProp);
      }
    } else {
      formFromPreview.assertNever(schema);
    }
  }
  return false;
}
function doesSchemaOnlyEverContainASingleChildField(rootSchema) {
  const queue = new Set([rootSchema]);
  let hasFoundChildField = false;
  for (const schema of queue) {
    if (schema.kind === 'form' || schema.kind === 'relationship') ; else if (schema.kind === 'child') {
      if (hasFoundChildField) {
        return false;
      }
      hasFoundChildField = true;
    } else if (schema.kind === 'array') {
      if (canSchemaContainChildField(schema.element)) {
        return false;
      }
    } else if (schema.kind === 'object') {
      for (const innerProp of Object.values(schema.fields)) {
        queue.add(innerProp);
      }
    } else if (schema.kind === 'conditional') {
      for (const innerProp of Object.values(schema.values)) {
        queue.add(innerProp);
      }
    } else {
      formFromPreview.assertNever(schema);
    }
  }
  return hasFoundChildField;
}
function findArrayFieldsWithSingleChildField(schema, value) {
  const propPaths = [];
  formFromPreview.traverseProps(schema, value, (schema, value, path) => {
    if (schema.kind === 'array' && doesSchemaOnlyEverContainASingleChildField(schema.element)) {
      propPaths.push([path, schema]);
    }
  });
  return propPaths;
}
function isEmptyChildFieldNode(element) {
  const firstChild = element.children[0];
  return element.children.length === 1 && (element.type === 'component-inline-prop' && firstChild.type === undefined && firstChild.text === '' || element.type === 'component-block-prop' && firstChild.type === 'paragraph' && firstChild.children.length === 1 && firstChild.children[0].type === undefined && firstChild.children[0].text === '');
}
function withComponentBlocks(blockComponents, editorDocumentFeatures, relationships, editor) {
  // note that conflicts between the editor document features
  // and the child field document features are dealt with elsewhere
  const memoizedGetDocumentFeaturesForChildField = weakMemoize__default["default"](options => {
    return formFromPreview.getDocumentFeaturesForChildField(editorDocumentFeatures, options);
  });
  const {
    normalizeNode,
    deleteBackward,
    insertBreak
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const ancestorComponentBlock = getAncestorComponentBlock(editor);
      if (ancestorComponentBlock.isInside && slate.Range.isCollapsed(editor.selection) && slate.Editor.isStart(editor, editor.selection.anchor, ancestorComponentBlock.prop[1]) && ancestorComponentBlock.prop[1][ancestorComponentBlock.prop[1].length - 1] === 0) {
        slate.Transforms.unwrapNodes(editor, {
          at: ancestorComponentBlock.componentBlock[1]
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const ancestorComponentBlock = getAncestorComponentBlock(editor);
    if (editor.selection && ancestorComponentBlock.isInside) {
      const {
        prop: [componentPropNode, componentPropPath],
        componentBlock: [componentBlockNode, componentBlockPath]
      } = ancestorComponentBlock;
      const isLastProp = componentPropPath[componentPropPath.length - 1] === componentBlockNode.children.length - 1;
      if (componentPropNode.type === 'component-block-prop') {
        const [[paragraphNode, paragraphPath]] = slate.Editor.nodes(editor, {
          match: node => node.type === 'paragraph'
        });
        const isLastParagraph = paragraphPath[paragraphPath.length - 1] === componentPropNode.children.length - 1;
        if (slate.Node.string(paragraphNode) === '' && isLastParagraph) {
          if (isLastProp) {
            slate.Transforms.moveNodes(editor, {
              at: paragraphPath,
              to: slate.Path.next(ancestorComponentBlock.componentBlock[1])
            });
          } else {
            slate.Transforms.move(editor, {
              distance: 1,
              unit: 'line'
            });
            slate.Transforms.removeNodes(editor, {
              at: paragraphPath
            });
          }
          return;
        }
      }
      if (componentPropNode.type === 'component-inline-prop') {
        slate.Editor.withoutNormalizing(editor, () => {
          const componentBlock = blockComponents[componentBlockNode.component];
          if (componentPropNode.propPath !== undefined && componentBlock !== undefined) {
            const rootSchema = {
              kind: 'object',
              fields: componentBlock.schema
            };
            const ancestorFields = formFromPreview.getAncestorSchemas(rootSchema, componentPropNode.propPath, componentBlockNode.props);
            const idx = [...ancestorFields].reverse().findIndex(item => item.kind === 'array');
            if (idx !== -1) {
              const arrayFieldIdx = ancestorFields.length - 1 - idx;
              const arrayField = ancestorFields[arrayFieldIdx];
              formFromPreview.assert(arrayField.kind === 'array');
              const val = formFromPreview.getValueAtPropPath(componentBlockNode.props, componentPropNode.propPath.slice(0, arrayFieldIdx));
              if (doesSchemaOnlyEverContainASingleChildField(arrayField.element)) {
                if (slate.Node.string(componentPropNode) === '' && val.length - 1 === componentPropNode.propPath[arrayFieldIdx]) {
                  slate.Transforms.removeNodes(editor, {
                    at: componentPropPath
                  });
                  if (isLastProp) {
                    slate.Transforms.insertNodes(editor, {
                      type: 'paragraph',
                      children: [{
                        text: ''
                      }]
                    }, {
                      at: slate.Path.next(componentBlockPath)
                    });
                    slate.Transforms.select(editor, slate.Path.next(componentBlockPath));
                  } else {
                    slate.Transforms.move(editor, {
                      distance: 1,
                      unit: 'line'
                    });
                  }
                } else {
                  insertBreak();
                }
                return;
              }
            }
          }
          slate.Transforms.splitNodes(editor, {
            always: true
          });
          const splitNodePath = slate.Path.next(componentPropPath);
          if (isLastProp) {
            slate.Transforms.moveNodes(editor, {
              at: splitNodePath,
              to: slate.Path.next(componentBlockPath)
            });
          } else {
            formFromPreview.moveChildren(editor, splitNodePath, [...slate.Path.next(splitNodePath), 0]);
            slate.Transforms.removeNodes(editor, {
              at: splitNodePath
            });
          }
        });
        return;
      }
    }
    insertBreak();
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (node.type === 'component-inline-prop' && !node.propPath && (node.children.length !== 1 || !slate.Text.isText(node.children[0]) || node.children[0].text !== '')) {
      slate.Transforms.removeNodes(editor, {
        at: path
      });
      return;
    }
    if (node.type === 'component-block') {
      const componentBlock = blockComponents[node.component];
      if (componentBlock) {
        const rootSchema = {
          kind: 'object',
          fields: componentBlock.schema
        };
        const updatedProps = addMissingFields(node.props, rootSchema);
        if (updatedProps !== node.props) {
          slate.Transforms.setNodes(editor, {
            props: updatedProps
          }, {
            at: path
          });
          return;
        }
        for (const [propPath, arrayField] of findArrayFieldsWithSingleChildField(rootSchema, node.props)) {
          if (node.children.length === 1 && node.children[0].type === 'component-inline-prop' && node.children[0].propPath === undefined) {
            break;
          }
          const nodesWithin = [];
          for (const [idx, childNode] of node.children.entries()) {
            if ((childNode.type === 'component-block-prop' || childNode.type === 'component-inline-prop') && childNode.propPath !== undefined) {
              const subPath = childNode.propPath.concat();
              while (subPath.length) {
                if (typeof subPath.pop() === 'number') break;
              }
              if (areArraysEqual(propPath, subPath)) {
                nodesWithin.push([idx, childNode]);
              }
            }
          }
          const arrVal = formFromPreview.getValueAtPropPath(node.props, propPath);
          const prevKeys = formFromPreview.getKeysForArrayValue(arrVal);
          const prevKeysSet = new Set(prevKeys);
          const alreadyUsedIndicies = new Set();
          const newVal = [];
          const newKeys = [];
          const getNewKey = () => {
            let key = formFromPreview.getNewArrayElementKey();
            while (prevKeysSet.has(key)) {
              key = formFromPreview.getNewArrayElementKey();
            }
            return key;
          };
          for (const [, node] of nodesWithin) {
            const idxFromValue = node.propPath[propPath.length];
            formFromPreview.assert(typeof idxFromValue === 'number');
            if (arrVal.length <= idxFromValue || alreadyUsedIndicies.has(idxFromValue) && isEmptyChildFieldNode(node)) {
              newVal.push(formFromPreview.getInitialPropsValue(arrayField.element));
              newKeys.push(getNewKey());
            } else {
              alreadyUsedIndicies.add(idxFromValue);
              newVal.push(arrVal[idxFromValue]);
              newKeys.push(alreadyUsedIndicies.has(idxFromValue) ? getNewKey() : prevKeys[idxFromValue]);
            }
          }
          formFromPreview.setKeysForArrayValue(newVal, newKeys);
          if (!areArraysEqual(arrVal, newVal)) {
            const transformedProps = formFromPreview.replaceValueAtPropPath(rootSchema, node.props, newVal, propPath);
            slate.Transforms.setNodes(editor, {
              props: transformedProps
            }, {
              at: path
            });
            for (const [idx, [idxInChildrenOfBlock, nodeWithin]] of nodesWithin.entries()) {
              const newPropPath = [...nodeWithin.propPath];
              newPropPath[propPath.length] = idx;
              slate.Transforms.setNodes(editor, {
                propPath: newPropPath
              }, {
                at: [...path, idxInChildrenOfBlock]
              });
            }
            return;
          }
        }
        const missingKeys = new Map(formFromPreview.findChildPropPaths(node.props, componentBlock.schema).map(x => [JSON.stringify(x.path), x.options.kind]));
        node.children.forEach(node => {
          formFromPreview.assert(node.type === 'component-block-prop' || node.type === 'component-inline-prop');
          missingKeys.delete(JSON.stringify(node.propPath));
        });
        if (missingKeys.size) {
          slate.Transforms.insertNodes(editor, [...missingKeys].map(_ref2 => {
            let [prop, kind] = _ref2;
            return {
              type: `component-${kind}-prop`,
              propPath: prop ? JSON.parse(prop) : prop,
              children: [{
                text: ''
              }]
            };
          }), {
            at: [...path, node.children.length]
          });
          return;
        }
        const foundProps = new Set();
        const stringifiedInlinePropPaths = {};
        formFromPreview.findChildPropPaths(node.props, blockComponents[node.component].schema).forEach((x, index) => {
          stringifiedInlinePropPaths[JSON.stringify(x.path)] = {
            options: x.options,
            index
          };
        });
        for (const [index, childNode] of node.children.entries()) {
          if (
          // children that are not these will be handled by
          // the generic allowedChildren normalization
          childNode.type !== 'component-inline-prop' && childNode.type !== 'component-block-prop') {
            continue;
          }
          const childPath = [...path, index];
          const stringifiedPropPath = JSON.stringify(childNode.propPath);
          if (stringifiedInlinePropPaths[stringifiedPropPath] === undefined) {
            slate.Transforms.removeNodes(editor, {
              at: childPath
            });
            return;
          }
          if (foundProps.has(stringifiedPropPath)) {
            slate.Transforms.removeNodes(editor, {
              at: childPath
            });
            return;
          }
          foundProps.add(stringifiedPropPath);
          const propInfo = stringifiedInlinePropPaths[stringifiedPropPath];
          const expectedIndex = propInfo.index;
          if (index !== expectedIndex) {
            slate.Transforms.moveNodes(editor, {
              at: childPath,
              to: [...path, expectedIndex]
            });
            return;
          }
          const expectedChildNodeType = `component-${propInfo.options.kind}-prop`;
          if (childNode.type !== expectedChildNodeType) {
            slate.Transforms.setNodes(editor, {
              type: expectedChildNodeType
            }, {
              at: childPath
            });
            return;
          }
          const documentFeatures = memoizedGetDocumentFeaturesForChildField(propInfo.options);
          if (normalizeNodeWithinComponentProp([childNode, childPath], editor, documentFeatures, relationships)) {
            return;
          }
        }
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

// the only thing that this will fix is a new field being added to an object field, nothing else.
function addMissingFields(value, schema) {
  if (schema.kind === 'child' || schema.kind === 'form' || schema.kind === 'relationship') {
    return value;
  }
  if (schema.kind === 'conditional') {
    const conditionalValue = value;
    const updatedInnerValue = addMissingFields(conditionalValue.value, schema.values[conditionalValue.discriminant.toString()]);
    if (updatedInnerValue === conditionalValue.value) {
      return value;
    }
    return {
      discriminant: conditionalValue.discriminant,
      value: updatedInnerValue
    };
  }
  if (schema.kind === 'array') {
    const arrValue = value;
    const newArrValue = arrValue.map(x => addMissingFields(x, schema.element));
    if (areArraysEqual(arrValue, newArrValue)) {
      return value;
    }
    return newArrValue;
  }
  if (schema.kind === 'object') {
    const objectValue = value;
    let hasChanged = false;
    const newObjectValue = {};
    for (const [key, innerSchema] of Object.entries(schema.fields)) {
      const innerValue = objectValue[key];
      if (innerValue === undefined) {
        hasChanged = true;
        newObjectValue[key] = formFromPreview.getInitialPropsValue(innerSchema);
        continue;
      }
      const newInnerValue = addMissingFields(innerValue, innerSchema);
      if (newInnerValue !== innerValue) {
        hasChanged = true;
      }
      newObjectValue[key] = newInnerValue;
    }
    if (hasChanged) {
      return newObjectValue;
    }
    return value;
  }
  formFromPreview.assertNever(schema);
}

/** @jsxRuntime classic */
const ComponentBlockContext = /*#__PURE__*/React.createContext({});
function ComponentInlineProp(props) {
  return core.jsx("span", props.attributes, props.children);
}
function insertComponentBlock(editor, componentBlocks, componentBlock) {
  const node = formFromPreview.getInitialValue(componentBlock, componentBlocks[componentBlock]);
  formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, node);
  const componentBlockEntry = slate.Editor.above(editor, {
    match: node => node.type === 'component-block'
  });
  if (componentBlockEntry) {
    const start = slate.Editor.start(editor, componentBlockEntry[1]);
    slate.Transforms.setSelection(editor, {
      anchor: start,
      focus: start
    });
  }
}
const BlockComponentsButtons = _ref => {
  let {
    onClose
  } = _ref;
  const editor = slateReact.useSlateStatic();
  const blockComponents = React.useContext(ComponentBlockContext);
  return core.jsx(React.Fragment, null, Object.keys(blockComponents).map(key => core.jsx(toolbar.ToolbarButton, {
    key: key,
    onMouseDown: event => {
      event.preventDefault();
      insertComponentBlock(editor, blockComponents, key);
      onClose();
    }
  }, blockComponents[key].label)));
};
const ComponentBlocksElement = _ref2 => {
  let {
    attributes,
    children,
    element: __elementToGetPath
  } = _ref2;
  const editor = slateReact.useSlateStatic();
  const focused = slateReact.useFocused();
  const selected = slateReact.useSelected();
  const [currentElement, setElement] = formFromPreview.useElementWithSetNodes(editor, __elementToGetPath);
  const {
    spacing
  } = core.useTheme();
  const blockComponents = React.useContext(ComponentBlockContext);
  const componentBlock = blockComponents[currentElement.component];
  const elementToGetPathRef = React.useRef({
    __elementToGetPath,
    currentElement
  });
  React.useEffect(() => {
    elementToGetPathRef.current = {
      __elementToGetPath,
      currentElement
    };
  });
  const onRemove = formFromPreview.useEventCallback(() => {
    const path = slateReact.ReactEditor.findPath(editor, __elementToGetPath);
    slate.Transforms.removeNodes(editor, {
      at: path
    });
  });
  const onPropsChange = React.useCallback(cb => {
    const prevProps = elementToGetPathRef.current.currentElement.props;
    updateComponentBlockElementProps(editor, componentBlock, prevProps, cb(prevProps), slateReact.ReactEditor.findPath(editor, elementToGetPathRef.current.__elementToGetPath), setElement);
  }, [setElement, componentBlock, editor]);
  const getToolbarPreviewProps = React.useMemo(() => {
    if (!componentBlock) {
      return () => {
        throw new Error('expected component block to exist when called');
      };
    }
    return formFromPreview.createGetPreviewProps({
      kind: 'object',
      fields: componentBlock.schema
    }, onPropsChange, () => undefined);
  }, [componentBlock, onPropsChange]);
  if (!componentBlock) {
    return core.jsx("div", {
      css: {
        border: 'red 4px solid',
        padding: spacing.medium
      }
    }, core.jsx("pre", {
      contentEditable: false,
      css: {
        userSelect: 'none'
      }
    }, `The block "${currentElement.component}" no longer exists.

Props:

${JSON.stringify(currentElement.props, null, 2)}

Content:`), children);
  }
  const toolbarPreviewProps = getToolbarPreviewProps(currentElement.props);
  const renderedBlock = core.jsx(ComponentBlockRender, {
    children: children,
    componentBlock: componentBlock,
    element: currentElement,
    onChange: onPropsChange
  });
  return componentBlock.chromeless ? core.jsx(ChromelessComponentBlockElement, {
    attributes: attributes,
    renderedBlock: renderedBlock,
    componentBlock: componentBlock,
    isOpen: focused && selected,
    onRemove: onRemove,
    previewProps: toolbarPreviewProps
  }) : core.jsx(ChromefulComponentBlockElement, {
    attributes: attributes,
    children: children,
    componentBlock: componentBlock,
    onRemove: onRemove,
    previewProps: toolbarPreviewProps,
    renderedBlock: renderedBlock,
    elementProps: currentElement.props
  });
};

const LayoutOptionsContext = /*#__PURE__*/React.createContext([]);
const LayoutOptionsProvider = LayoutOptionsContext.Provider;

// UI Components
const LayoutContainer = _ref => {
  let {
    attributes,
    children,
    element
  } = _ref;
  const {
    spacing
  } = core.useTheme();
  const focused = slateReact.useFocused();
  const selected = slateReact.useSelected();
  const editor = slateReact.useSlateStatic();
  const layout = element.layout;
  const layoutOptions = React.useContext(LayoutOptionsContext);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: focused && selected,
    onClose: () => {}
  }, {
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx("div", _extends({
    css: {
      marginBottom: spacing.medium,
      marginTop: spacing.medium,
      position: 'relative'
    }
  }, attributes), core.jsx("div", _extends({}, trigger.props, {
    ref: trigger.ref,
    css: {
      columnGap: spacing.small,
      display: 'grid',
      gridTemplateColumns: layout.map(x => `${x}fr`).join(' ')
    }
  }), children), focused && selected && core.jsx(toolbar.InlineDialog, _extends({
    ref: dialog.ref
  }, dialog.props), core.jsx(toolbar.ToolbarGroup, null, layoutOptions.map((layoutOption, i) => core.jsx(toolbar.ToolbarButton, {
    isSelected: layoutOption.toString() === layout.toString(),
    key: i,
    onMouseDown: event => {
      event.preventDefault();
      const path = slateReact.ReactEditor.findPath(editor, element);
      slate.Transforms.setNodes(editor, {
        type: 'layout',
        layout: layoutOption
      }, {
        at: path
      });
    }
  }, makeLayoutIcon(layoutOption))), core.jsx(toolbar.ToolbarSeparator, null), core.jsx(tooltip.Tooltip, {
    content: "Remove",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    variant: "destructive",
    onMouseDown: event => {
      event.preventDefault();
      const path = slateReact.ReactEditor.findPath(editor, element);
      slate.Transforms.removeNodes(editor, {
        at: path
      });
    }
  }, attrs), core.jsx(Trash2Icon.Trash2Icon, {
    size: "small"
  }))))));
};
const LayoutArea = _ref2 => {
  let {
    attributes,
    children
  } = _ref2;
  const {
    colors,
    radii,
    spacing
  } = core.useTheme();
  return core.jsx("div", _extends({
    css: {
      border: `2px dashed ${colors.border}`,
      borderRadius: radii.small,
      paddingLeft: spacing.medium,
      paddingRight: spacing.medium
    }
  }, attributes), children);
};
const insertLayout = (editor, layout) => {
  formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, [{
    type: 'layout',
    layout,
    children: [{
      type: 'layout-area',
      children: [{
        type: 'paragraph',
        children: [{
          text: ''
        }]
      }]
    }]
  }]);
  const layoutEntry = slate.Editor.above(editor, {
    match: x => x.type === 'layout'
  });
  if (layoutEntry) {
    slate.Transforms.select(editor, [...layoutEntry[1], 0]);
  }
};

// Plugin
function withLayouts(editor) {
  const {
    normalizeNode,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection && slate.Range.isCollapsed(editor.selection) &&
    // this is just an little optimisation
    // we're only doing things if we're at the start of a layout area
    // and the start of anything will always be offset 0
    // so we'll bailout if we're not at offset 0
    editor.selection.anchor.offset === 0) {
      const [aboveNode, abovePath] = slate.Editor.above(editor, {
        match: node => node.type === 'layout-area'
      }) || [editor, []];
      if (aboveNode.type === 'layout-area' && slate.Point.equals(slate.Editor.start(editor, abovePath), editor.selection.anchor)) {
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (slate.Element.isElement(node) && node.type === 'layout') {
      if (node.layout === undefined) {
        slate.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      if (node.children.length < node.layout.length) {
        slate.Transforms.insertNodes(editor, Array.from({
          length: node.layout.length - node.children.length
        }).map(() => ({
          type: 'layout-area',
          children: [paragraphElement()]
        })), {
          at: [...path, node.children.length]
        });
        return;
      }
      if (node.children.length > node.layout.length) {
        Array.from({
          length: node.children.length - node.layout.length
        }).map((_, i) => i).reverse().forEach(i => {
          const layoutAreaToRemovePath = [...path, i + node.layout.length];
          const child = node.children[i + node.layout.length];
          formFromPreview.moveChildren(editor, layoutAreaToRemovePath, [...path, node.layout.length - 1, node.children[node.layout.length - 1].children.length], node => node.type !== 'paragraph' || slate.Node.string(child) !== '');
          slate.Transforms.removeNodes(editor, {
            at: layoutAreaToRemovePath
          });
        });
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

// Utils
// ------------------------------

function makeLayoutIcon(ratios) {
  const size = 16;
  const element = core.jsx("div", {
    role: "img",
    css: {
      display: 'grid',
      gridTemplateColumns: ratios.map(r => `${r}fr`).join(' '),
      gap: 2,
      width: size,
      height: size
    }
  }, ratios.map((_, i) => {
    return core.jsx("div", {
      key: i,
      css: {
        backgroundColor: 'currentcolor',
        borderRadius: 1
      }
    });
  }));
  return element;
}
const layoutsIcon = core.jsx(ColumnsIcon.ColumnsIcon, {
  size: "small"
});
const LayoutsButton = _ref3 => {
  let {
    layouts
  } = _ref3;
  const {
    editor,
    layouts: {
      isSelected
    }
  } = useToolbarState();
  return React.useMemo(() => core.jsx(tooltip.Tooltip, {
    content: "Layouts",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    isSelected: isSelected,
    onMouseDown: event => {
      event.preventDefault();
      if (formFromPreview.isElementActive(editor, 'layout')) {
        slate.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'layout'
        });
        return;
      }
      insertLayout(editor, layouts[0]);
    }
  }, attrs), layoutsIcon)), [editor, isSelected, layouts]);
};

const _excluded$2 = ["type"];
const isListType = type => type === 'ordered-list' || type === 'unordered-list';
const isListNode = node => isListType(node.type);
const toggleList = (editor, format) => {
  const listAbove = getListTypeAbove(editor);
  const isActive = formFromPreview.isElementActive(editor, format) && (listAbove === 'none' || listAbove === format);
  slate.Editor.withoutNormalizing(editor, () => {
    slate.Transforms.unwrapNodes(editor, {
      match: isListNode,
      split: true,
      mode: isActive ? 'all' : 'lowest'
    });
    if (!isActive) {
      slate.Transforms.wrapNodes(editor, {
        type: format,
        children: []
      }, {
        match: x => x.type !== 'list-item-content' && slate.Editor.isBlock(editor, x)
      });
    }
  });
};
function getAncestorList(editor) {
  if (editor.selection) {
    const listItem = slate.Editor.above(editor, {
      match: formFromPreview.nodeTypeMatcher('list-item')
    });
    const list = slate.Editor.above(editor, {
      match: isListNode
    });
    if (listItem && list) {
      return {
        isInside: true,
        listItem,
        list
      };
    }
  }
  return {
    isInside: false
  };
}
function withList(editor) {
  const {
    insertBreak,
    normalizeNode,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const ancestorList = getAncestorList(editor);
      if (ancestorList.isInside && slate.Range.isCollapsed(editor.selection) && slate.Editor.isStart(editor, editor.selection.anchor, ancestorList.list[1])) {
        slate.Transforms.unwrapNodes(editor, {
          match: isListNode,
          split: true
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const [listItem] = slate.Editor.nodes(editor, {
      match: node => node.type === 'list-item',
      mode: 'lowest'
    });
    if (listItem && slate.Node.string(listItem[0]) === '') {
      slate.Transforms.unwrapNodes(editor, {
        match: isListNode,
        split: true
      });
      return;
    }
    insertBreak();
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (slate.Element.isElement(node) || slate.Editor.isEditor(node)) {
      const isElementBeingNormalizedAList = isListNode(node);
      for (const [childNode, childPath] of slate.Node.children(editor, path)) {
        const index = childPath[childPath.length - 1];
        // merge sibling lists
        if (isListNode(childNode)) {
          var _node$children;
          if (((_node$children = node.children[childPath[childPath.length - 1] + 1]) === null || _node$children === void 0 ? void 0 : _node$children.type) === childNode.type) {
            const siblingNodePath = slate.Path.next(childPath);
            formFromPreview.moveChildren(editor, siblingNodePath, [...childPath, childNode.children.length]);
            slate.Transforms.removeNodes(editor, {
              at: siblingNodePath
            });
            return;
          }
          if (isElementBeingNormalizedAList) {
            const previousChild = node.children[index - 1];
            if (slate.Element.isElement(previousChild)) {
              slate.Transforms.moveNodes(editor, {
                at: childPath,
                to: [...slate.Path.previous(childPath), previousChild.children.length - 1]
              });
            } else {
              slate.Transforms.unwrapNodes(editor, {
                at: childPath
              });
            }
            return;
          }
        }
        if (node.type === 'list-item' && childNode.type !== 'list-item-content' && index === 0 && slate.Editor.isBlock(editor, childNode)) {
          if (path[path.length - 1] !== 0) {
            const previousChild = slate.Node.get(editor, slate.Path.previous(path));
            if (slate.Element.isElement(previousChild)) {
              slate.Transforms.moveNodes(editor, {
                at: path,
                to: [...slate.Path.previous(path), previousChild.children.length]
              });
              return;
            }
          }
          slate.Transforms.unwrapNodes(editor, {
            at: childPath
          });
          return;
        }
        if (node.type === 'list-item' && childNode.type === 'list-item-content' && index !== 0) {
          slate.Transforms.splitNodes(editor, {
            at: childPath
          });
          return;
        }
      }
    }
    normalizeNode(entry);
  };
  return editor;
}
const ListButton = /*#__PURE__*/React.forwardRef(function ListButton(props, ref) {
  const {
    editor,
    lists: {
      [props.type === 'ordered-list' ? 'ordered' : 'unordered']: {
        isDisabled,
        isSelected
      }
    }
  } = useToolbarState();
  return React.useMemo(() => {
    const {
        type
      } = props,
      restProps = _objectWithoutProperties(props, _excluded$2);
    return core.jsx(toolbar.ToolbarButton, _extends({
      ref: ref,
      isDisabled: isDisabled,
      isSelected: isSelected,
      onMouseDown: event => {
        event.preventDefault();
        toggleList(editor, type);
      }
    }, restProps));
  }, [props, ref, isDisabled, isSelected, editor]);
});
function nestList(editor) {
  const block = slate.Editor.above(editor, {
    match: n => slate.Editor.isBlock(editor, n)
  });
  if (!block || block[0].type !== 'list-item-content') {
    return false;
  }
  const listItemPath = slate.Path.parent(block[1]);
  // we're the first item in the list therefore we can't nest
  if (listItemPath[listItemPath.length - 1] === 0) {
    return false;
  }
  const previousListItemPath = slate.Path.previous(listItemPath);
  const previousListItemNode = slate.Node.get(editor, previousListItemPath);
  if (previousListItemNode.children.length !== 1) {
    // there's a list nested inside our previous sibling list item so move there
    slate.Transforms.moveNodes(editor, {
      at: listItemPath,
      to: [...previousListItemPath, previousListItemNode.children.length - 1, previousListItemNode.children[previousListItemNode.children.length - 1].children.length]
    });
    return true;
  }
  const type = slate.Editor.parent(editor, slate.Path.parent(block[1]))[0].type;
  slate.Editor.withoutNormalizing(editor, () => {
    slate.Transforms.wrapNodes(editor, {
      type,
      children: []
    }, {
      at: listItemPath
    });
    slate.Transforms.moveNodes(editor, {
      to: [...previousListItemPath, previousListItemNode.children.length],
      at: listItemPath
    });
  });
  return true;
}
function unnestList(editor) {
  const block = slate.Editor.above(editor, {
    match: n => slate.Editor.isBlock(editor, n)
  });
  if (block && block[0].type === 'list-item-content') {
    slate.Transforms.unwrapNodes(editor, {
      match: isListNode,
      split: true
    });
    return true;
  }
  return false;
}

const DocumentFieldRelationshipsContext = /*#__PURE__*/React.createContext({});
function useDocumentFieldRelationships() {
  return React.useContext(DocumentFieldRelationshipsContext);
}
const DocumentFieldRelationshipsProvider = DocumentFieldRelationshipsContext.Provider;
function withRelationship(editor) {
  const {
    isVoid,
    isInline
  } = editor;
  editor.isVoid = element => {
    return element.type === 'relationship' || isVoid(element);
  };
  editor.isInline = element => {
    return element.type === 'relationship' || isInline(element);
  };
  return editor;
}
function RelationshipButton(_ref) {
  let {
    onClose
  } = _ref;
  const {
    editor,
    relationships: {
      isDisabled
    }
  } = useToolbarState();
  const relationships = React.useContext(DocumentFieldRelationshipsContext);
  return core.jsx(React.Fragment, null, Object.entries(relationships).map(_ref2 => {
    let [key, relationship] = _ref2;
    return core.jsx(toolbar.ToolbarButton, {
      key: key,
      isDisabled: isDisabled,
      onMouseDown: event => {
        event.preventDefault();
        slate.Transforms.insertNodes(editor, {
          type: 'relationship',
          relationship: key,
          data: null,
          children: [{
            text: ''
          }]
        });
        onClose();
      }
    }, relationship.label);
  }));
}
function RelationshipElement(_ref3) {
  let {
    attributes,
    children,
    element
  } = _ref3;
  const keystone = context.useKeystone();
  const editor = slateReact.useSlateStatic();
  const relationships = React.useContext(DocumentFieldRelationshipsContext);
  const relationship = relationships[element.relationship];
  const list = keystone.adminMeta.lists[relationship.listKey];
  const searchFields = Object.keys(list.fields).filter(key => list.fields[key].search);
  return core.jsx("span", _extends({}, attributes, {
    css: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }), core.jsx("span", {
    contentEditable: false,
    css: {
      userSelect: 'none',
      width: 200,
      display: 'inline-block',
      paddingLeft: 4,
      paddingRight: 4,
      flex: 1
    }
  }, relationship ? core.jsx(RelationshipSelect.RelationshipSelect, {
    controlShouldRenderValue: true,
    isDisabled: false,
    list: list,
    labelField: list.labelField,
    searchFields: searchFields,
    portalMenu: true,
    state: {
      kind: 'one',
      value: element.data === null ? null : {
        id: element.data.id,
        label: element.data.label || element.data.id
      },
      onChange(value) {
        const at = slateReact.ReactEditor.findPath(editor, element);
        if (value === null) {
          slate.Transforms.removeNodes(editor, {
            at
          });
        } else {
          slate.Transforms.setNodes(editor, {
            data: value
          }, {
            at
          });
        }
      }
    }
  }) : 'Invalid relationship'), core.jsx("span", {
    css: {
      flex: 0
    }
  }, children));
}

const ToolbarStateContext = /*#__PURE__*/React__default["default"].createContext(null);
function useToolbarState() {
  const toolbarState = React.useContext(ToolbarStateContext);
  if (!toolbarState) {
    throw new Error('ToolbarStateProvider must be used to use useToolbarState');
  }
  return toolbarState;
}
function getAncestorComponentChildFieldDocumentFeatures(editor, editorDocumentFeatures, componentBlocks) {
  const ancestorComponentProp = slate.Editor.above(editor, {
    match: formFromPreview.nodeTypeMatcher('component-block-prop', 'component-inline-prop')
  });
  if (ancestorComponentProp) {
    const propPath = ancestorComponentProp[0].propPath;
    const ancestorComponent = slate.Editor.parent(editor, ancestorComponentProp[1]);
    if (ancestorComponent[0].type === 'component-block') {
      const component = ancestorComponent[0].component;
      const componentBlock = componentBlocks[component];
      if (componentBlock && propPath) {
        const childField = formFromPreview.getSchemaAtPropPath(propPath, ancestorComponent[0].props, componentBlock.schema);
        if ((childField === null || childField === void 0 ? void 0 : childField.kind) === 'child') {
          return formFromPreview.getDocumentFeaturesForChildField(editorDocumentFeatures, childField.options);
        }
      }
    }
  }
}
const createToolbarState = (editor, componentBlocks, editorDocumentFeatures) => {
  const locationDocumentFeatures = getAncestorComponentChildFieldDocumentFeatures(editor, editorDocumentFeatures, componentBlocks) || {
    kind: 'block',
    inlineMarks: 'inherit',
    documentFeatures: {
      dividers: true,
      formatting: {
        alignment: {
          center: true,
          end: true
        },
        blockTypes: {
          blockquote: true,
          code: true
        },
        headingLevels: [1, 2, 3, 4, 5, 6],
        listTypes: {
          ordered: true,
          unordered: true
        }
      },
      layouts: editorDocumentFeatures.layouts,
      links: true,
      relationships: true
    },
    softBreaks: true
  };
  let [maybeCodeBlockEntry] = slate.Editor.nodes(editor, {
    match: node => node.type !== 'code' && slate.Editor.isBlock(editor, node)
  });
  const editorMarks = slate.Editor.marks(editor) || {};
  const marks = Object.fromEntries(formFromPreview.allMarks.map(mark => [mark, {
    isDisabled: locationDocumentFeatures.inlineMarks !== 'inherit' && !locationDocumentFeatures.inlineMarks[mark] || !maybeCodeBlockEntry,
    isSelected: !!editorMarks[mark]
  }]));

  // Editor.marks is "what are the marks that would be applied if text was inserted now"
  // that's not really the UX we want, if we have some a document like this
  // <paragraph>
  //   <text>
  //     <anchor />
  //     content
  //   </text>
  //   <text bold>bold</text>
  //   <text>
  //     content
  //     <focus />
  //   </text>
  // </paragraph>

  // we want bold to be shown as selected even though if you inserted text from that selection, it wouldn't be bold
  // so we look at all the text nodes in the selection to get their marks
  // but only if the selection is expanded because if you're in the middle of some text
  // with your selection collapsed with a mark but you've removed it(i.e. editor.removeMark)
  // the text nodes you're in will have the mark but the ui should show the mark as not being selected
  if (editor.selection && slate.Range.isExpanded(editor.selection)) {
    for (const node of slate.Editor.nodes(editor, {
      match: slate.Text.isText
    })) {
      for (const key of Object.keys(node[0])) {
        if (key === 'insertMenu' || key === 'text') {
          continue;
        }
        if (key in marks) {
          marks[key].isSelected = true;
        }
      }
    }
  }
  let [headingEntry] = slate.Editor.nodes(editor, {
    match: formFromPreview.nodeTypeMatcher('heading')
  });
  let [listEntry] = slate.Editor.nodes(editor, {
    match: isListNode
  });
  let [alignableEntry] = slate.Editor.nodes(editor, {
    match: formFromPreview.nodeTypeMatcher('paragraph', 'heading')
  });

  // (we're gonna use markdown here because the equivelant slate structure is quite large and doesn't add value here)
  // let's imagine a document that looks like this:
  // - thing
  //   1. something<cursor />
  // in the toolbar, you don't want to see that both ordered and unordered lists are selected
  // you want to see only ordered list selected, because
  // - you want to know what list you're actually in, you don't really care about the outer list
  // - when you want to change the list to a unordered list, the unordered list button should be inactive to show you can change to it
  const listTypeAbove = getListTypeAbove(editor);
  return {
    marks,
    textStyles: {
      selected: headingEntry ? headingEntry[0].level : 'normal',
      allowedHeadingLevels: locationDocumentFeatures.kind === 'block' && !listEntry ? locationDocumentFeatures.documentFeatures.formatting.headingLevels : []
    },
    relationships: {
      isDisabled: !locationDocumentFeatures.documentFeatures.relationships
    },
    code: {
      isSelected: formFromPreview.isElementActive(editor, 'code'),
      isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.blockTypes.code)
    },
    lists: {
      ordered: {
        isSelected: formFromPreview.isElementActive(editor, 'ordered-list') && (listTypeAbove === 'none' || listTypeAbove === 'ordered-list'),
        isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.listTypes.ordered && !headingEntry)
      },
      unordered: {
        isSelected: formFromPreview.isElementActive(editor, 'unordered-list') && (listTypeAbove === 'none' || listTypeAbove === 'unordered-list'),
        isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.listTypes.unordered && !headingEntry)
      }
    },
    alignment: {
      isDisabled: !alignableEntry && !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.alignment),
      selected: (alignableEntry === null || alignableEntry === void 0 ? void 0 : alignableEntry[0].textAlign) || 'start'
    },
    blockquote: {
      isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.blockTypes.blockquote),
      isSelected: formFromPreview.isElementActive(editor, 'blockquote')
    },
    layouts: {
      isSelected: formFromPreview.isElementActive(editor, 'layout')
    },
    links: {
      isDisabled: !editor.selection || slate.Range.isCollapsed(editor.selection) || !locationDocumentFeatures.documentFeatures.links,
      isSelected: formFromPreview.isElementActive(editor, 'link')
    },
    editor,
    dividers: {
      isDisabled: locationDocumentFeatures.kind === 'inline' || !locationDocumentFeatures.documentFeatures.dividers
    },
    clearFormatting: {
      isDisabled: !(Object.values(marks).some(x => x.isSelected) || !!hasBlockThatClearsOnClearFormatting(editor))
    },
    editorDocumentFeatures
  };
};
function hasBlockThatClearsOnClearFormatting(editor) {
  const [node] = slate.Editor.nodes(editor, {
    match: node => node.type === 'heading' || node.type === 'code' || node.type === 'blockquote'
  });
  return !!node;
}
function getListTypeAbove(editor) {
  const listAbove = slate.Editor.above(editor, {
    match: isListNode
  });
  if (!listAbove) {
    return 'none';
  }
  return listAbove[0].type;
}
const ToolbarStateProvider = _ref => {
  let {
    children,
    componentBlocks,
    editorDocumentFeatures,
    relationships
  } = _ref;
  const editor = slateReact.useSlate();
  return /*#__PURE__*/React__default["default"].createElement(DocumentFieldRelationshipsProvider, {
    value: relationships
  }, /*#__PURE__*/React__default["default"].createElement(LayoutOptionsProvider, {
    value: editorDocumentFeatures.layouts
  }, /*#__PURE__*/React__default["default"].createElement(ComponentBlockContext.Provider, {
    value: componentBlocks
  }, /*#__PURE__*/React__default["default"].createElement(ToolbarStateContext.Provider, {
    value: createToolbarState(editor, componentBlocks, editorDocumentFeatures)
  }, children))));
};

const isLinkActive = editor => {
  return formFromPreview.isElementActive(editor, 'link');
};
const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    slate.Transforms.unwrapNodes(editor, {
      match: n => n.type === 'link'
    });
    return;
  }
  const {
    selection
  } = editor;
  const isCollapsed = selection && slate.Range.isCollapsed(selection);
  if (isCollapsed) {
    slate.Transforms.insertNodes(editor, {
      type: 'link',
      href: url,
      children: [{
        text: url
      }]
    });
  } else {
    slate.Transforms.wrapNodes(editor, {
      type: 'link',
      href: url,
      children: [{
        text: ''
      }]
    }, {
      split: true
    });
  }
};
const LinkElement = _ref => {
  let {
    attributes,
    children,
    element: __elementForGettingPath
  } = _ref;
  const {
    typography
  } = core.useTheme();
  const editor = slateReact.useSlateStatic();
  const [currentElement, setNode] = formFromPreview.useElementWithSetNodes(editor, __elementForGettingPath);
  const href = currentElement.href;
  const selected = slateReact.useSelected();
  const focused = slateReact.useFocused();
  const [focusedInInlineDialog, setFocusedInInlineDialog] = React.useState(false);
  // we want to show the link dialog when the editor is focused and the link element is selected
  // or when the input inside the dialog is focused so you would think that would look like this:
  // (selected && focused) || focusedInInlineDialog
  // this doesn't work though because the blur will happen before the focus is inside the inline dialog
  // so this component would be rendered and focused would be false so the input would be removed so it couldn't be focused
  // to fix this, we delay our reading of the updated `focused` value so that we'll still render the dialog
  // immediately after the editor is blurred but before the input has been focused
  const [delayedFocused, setDelayedFocused] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => {
      setDelayedFocused(focused);
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, [focused]);
  const [localForceValidation, setLocalForceValidation] = React.useState(false);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: selected && focused || focusedInInlineDialog,
    onClose: () => {}
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  const unlink = formFromPreview.useEventCallback(() => {
    slate.Transforms.unwrapNodes(editor, {
      at: slateReact.ReactEditor.findPath(editor, __elementForGettingPath)
    });
  });
  const forceValidation = formFromPreview.useForceValidation();
  const showInvalidState = api.isValidURL(href) ? false : forceValidation || localForceValidation;
  return core.jsx("span", _extends({}, attributes, {
    css: {
      position: 'relative',
      display: 'inline-block'
    }
  }), core.jsx("a", _extends({}, trigger.props, {
    css: {
      color: showInvalidState ? 'red' : undefined
    },
    ref: trigger.ref,
    href: href
  }), children), (selected && delayedFocused || focusedInInlineDialog) && core.jsx(toolbar.InlineDialog, _extends({}, dialog.props, {
    ref: dialog.ref,
    onFocus: () => {
      setFocusedInInlineDialog(true);
    },
    onBlur: () => {
      setFocusedInInlineDialog(false);
      setLocalForceValidation(true);
    }
  }), core.jsx("div", {
    css: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, core.jsx(toolbar.ToolbarGroup, null, core.jsx("input", {
    css: {
      fontSize: typography.fontSize.small,
      width: 240
    },
    value: href,
    onChange: event => {
      setNode({
        href: event.target.value
      });
    }
  }), core.jsx(tooltip.Tooltip, {
    content: "Open link in new tab",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    as: "a",
    onMouseDown: event => {
      event.preventDefault();
    },
    href: href,
    target: "_blank",
    rel: "noreferrer",
    variant: "action"
  }, attrs), externalLinkIcon)), separator, core.jsx(UnlinkButton, {
    onUnlink: unlink
  })), showInvalidState && core.jsx("span", {
    css: {
      color: 'red'
    }
  }, "Please enter a valid URL"))));
};
const separator = core.jsx(toolbar.ToolbarSeparator, null);
const externalLinkIcon = core.jsx(ExternalLinkIcon.ExternalLinkIcon, {
  size: "small"
});
const UnlinkButton = /*#__PURE__*/React.memo(function UnlinkButton(_ref2) {
  let {
    onUnlink
  } = _ref2;
  return core.jsx(tooltip.Tooltip, {
    content: "Unlink",
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    variant: "destructive",
    onMouseDown: event => {
      event.preventDefault();
      onUnlink();
    }
  }, attrs), core.jsx(Trash2Icon.Trash2Icon, {
    size: "small"
  })));
});
let linkIcon = core.jsx(LinkIcon.LinkIcon, {
  size: "small"
});
const LinkButton = /*#__PURE__*/React.forwardRef(function LinkButton(props, ref) {
  const {
    editor,
    links: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    ref: ref,
    isDisabled: isDisabled,
    isSelected: isSelected,
    onMouseDown: event => {
      event.preventDefault();
      wrapLink(editor, '');
    }
  }, props), linkIcon), [isSelected, isDisabled, editor, props, ref]);
});
const linkButton = core.jsx(tooltip.Tooltip, {
  content: "Link",
  weight: "subtle"
}, attrs => core.jsx(LinkButton, attrs));
const markdownLinkPattern = /(^|\s)\[(.+?)\]\((\S+)\)$/;
function withLink(editorDocumentFeatures, componentBlocks, editor) {
  const {
    insertText,
    isInline,
    normalizeNode
  } = editor;
  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };
  if (editorDocumentFeatures.links) {
    editor.insertText = text => {
      insertText(text);
      if (text !== ')' || !editor.selection) return;
      const startOfBlock = slate.Editor.start(editor, slate.Editor.above(editor, {
        match: node => slate.Editor.isBlock(editor, node)
      })[1]);
      const startOfBlockToEndOfShortcutString = slate.Editor.string(editor, {
        anchor: editor.selection.anchor,
        focus: startOfBlock
      });
      const match = markdownLinkPattern.exec(startOfBlockToEndOfShortcutString);
      if (!match) return;
      const ancestorComponentChildFieldDocumentFeatures = getAncestorComponentChildFieldDocumentFeatures(editor, editorDocumentFeatures, componentBlocks);
      if ((ancestorComponentChildFieldDocumentFeatures === null || ancestorComponentChildFieldDocumentFeatures === void 0 ? void 0 : ancestorComponentChildFieldDocumentFeatures.documentFeatures.links) === false) {
        return;
      }
      const [, maybeWhitespace, linkText, href] = match;
      // by doing this, the insertText(')') above will happen in a different undo than the link replacement
      // so that means that when someone does an undo after this
      // it will undo to the state of "[content](link)" rather than "[content](link" (note the missing closing bracket)
      editor.history.undos.push([]);
      const startOfShortcut = match.index === 0 ? startOfBlock : formFromPreview.EditorAfterButIgnoringingPointsWithNoContent(editor, startOfBlock, {
        distance: match.index
      });
      const startOfLinkText = formFromPreview.EditorAfterButIgnoringingPointsWithNoContent(editor, startOfShortcut, {
        distance: maybeWhitespace === '' ? 1 : 2
      });
      const endOfLinkText = formFromPreview.EditorAfterButIgnoringingPointsWithNoContent(editor, startOfLinkText, {
        distance: linkText.length
      });
      slate.Transforms.delete(editor, {
        at: {
          anchor: endOfLinkText,
          focus: editor.selection.anchor
        }
      });
      slate.Transforms.delete(editor, {
        at: {
          anchor: startOfShortcut,
          focus: startOfLinkText
        }
      });
      slate.Transforms.wrapNodes(editor, {
        type: 'link',
        href,
        children: []
      }, {
        at: {
          anchor: editor.selection.anchor,
          focus: startOfShortcut
        },
        split: true
      });
      const nextNode = slate.Editor.next(editor);
      if (nextNode) {
        slate.Transforms.select(editor, nextNode[1]);
      }
    };
  }
  editor.normalizeNode = _ref3 => {
    let [node, path] = _ref3;
    if (node.type === 'link') {
      if (slate.Node.string(node) === '') {
        slate.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      for (const [idx, child] of node.children.entries()) {
        if (child.type === 'link') {
          // links cannot contain links
          slate.Transforms.unwrapNodes(editor, {
            at: [...path, idx]
          });
          return;
        }
      }
    }
    if (isInlineContainer(node)) {
      let lastMergableLink = null;
      for (const [idx, child] of node.children.entries()) {
        var _lastMergableLink;
        if (child.type === 'link' && child.href === ((_lastMergableLink = lastMergableLink) === null || _lastMergableLink === void 0 ? void 0 : _lastMergableLink.node.href)) {
          const firstLinkPath = [...path, lastMergableLink.index];
          const secondLinkPath = [...path, idx];
          const to = [...firstLinkPath, lastMergableLink.node.children.length];
          // note this is going in reverse, js doesn't have double-ended iterators so it's a for(;;)
          for (let i = child.children.length - 1; i >= 0; i--) {
            const childPath = [...secondLinkPath, i];
            slate.Transforms.moveNodes(editor, {
              at: childPath,
              to
            });
          }
          slate.Transforms.removeNodes(editor, {
            at: secondLinkPath
          });
          return;
        }
        if (!slate.Text.isText(child) || child.text !== '') {
          lastMergableLink = null;
        }
        if (child.type === 'link') {
          lastMergableLink = {
            index: idx,
            node: child
          };
        }
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}

const insertBlockquote = editor => {
  const isActive = formFromPreview.isElementActive(editor, 'blockquote');
  if (isActive) {
    slate.Transforms.unwrapNodes(editor, {
      match: node => node.type === 'blockquote'
    });
  } else {
    slate.Transforms.wrapNodes(editor, {
      type: 'blockquote',
      children: []
    });
  }
};
function getDirectBlockquoteParentFromSelection(editor) {
  if (!editor.selection) return {
    isInside: false
  };
  const [, parentPath] = slate.Editor.parent(editor, editor.selection);
  if (!parentPath.length) {
    return {
      isInside: false
    };
  }
  const [maybeBlockquoteParent, maybeBlockquoteParentPath] = slate.Editor.parent(editor, parentPath);
  const isBlockquote = maybeBlockquoteParent.type === 'blockquote';
  return isBlockquote ? {
    isInside: true,
    path: maybeBlockquoteParentPath
  } : {
    isInside: false
  };
}
function withBlockquote(editor) {
  const {
    insertBreak,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const parentBlockquote = getDirectBlockquoteParentFromSelection(editor);
      if (parentBlockquote.isInside && slate.Range.isCollapsed(editor.selection) &&
      // the selection is at the start of the paragraph
      editor.selection.anchor.offset === 0 &&
      // it's the first paragraph in the panel
      editor.selection.anchor.path[editor.selection.anchor.path.length - 2] === 0) {
        slate.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'blockquote',
          split: true
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const panel = getDirectBlockquoteParentFromSelection(editor);
    if (editor.selection && panel.isInside) {
      const [node, nodePath] = slate.Editor.node(editor, editor.selection);
      if (slate.Path.isDescendant(nodePath, panel.path) && slate.Node.string(node) === '') {
        slate.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'blockquote',
          split: true
        });
        return;
      }
    }
    insertBreak();
  };
  return editor;
}
const BlockquoteElement = _ref => {
  let {
    attributes,
    children
  } = _ref;
  const {
    colors,
    spacing
  } = core.useTheme();
  return core.jsx("blockquote", _extends({
    css: {
      borderLeft: '3px solid #CBD5E0',
      color: colors.foregroundDim,
      margin: 0,
      padding: `0 ${spacing.xlarge}px`
    }
  }, attributes), children);
};
const BlockquoteButton = _ref2 => {
  let {
    attrs
  } = _ref2;
  const {
    editor,
    blockquote: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    isSelected: isSelected,
    isDisabled: isDisabled,
    onMouseDown: event => {
      event.preventDefault();
      insertBlockquote(editor);
    }
  }, attrs), core.jsx(QuoteIcon, null)), [editor, attrs, isDisabled, isSelected]);
};
const blockquoteButton = core.jsx(tooltip.Tooltip, {
  content: core.jsx(React.Fragment, null, "Quote", core.jsx(toolbar.KeyboardInTooltip, null, '> ')),
  weight: "subtle"
}, attrs => core.jsx(BlockquoteButton, {
  attrs: attrs
}));
const QuoteIcon = () => core.jsx(IconBase, null, core.jsx("path", {
  d: "M11.3031 2C9.83843 2 8.64879 3.22321 8.64879 4.73171C8.64879 6.23928 9.83843 7.46342 11.3031 7.46342C13.8195 7.46342 12.3613 12.2071 9.18767 12.7012C9.03793 12.7239 8.90127 12.7995 8.80243 12.9143C8.70358 13.029 8.64908 13.1754 8.64879 13.3268C8.64879 13.7147 8.99561 14.0214 9.37973 13.9627C15.148 13.0881 17.1991 2.00093 11.3031 2.00093V2ZM3.65526 2C2.18871 2 1 3.22228 1 4.73171C1 6.23835 2.18871 7.46155 3.65526 7.46155C6.17067 7.46155 4.71252 12.2071 1.53888 12.7012C1.3893 12.7239 1.25277 12.7993 1.15394 12.9139C1.05511 13.0285 1.00051 13.1746 1 13.3259C1 13.7137 1.34682 14.0205 1.73001 13.9617C7.50016 13.0872 9.55128 2 3.65526 2Z"
}));

function withCodeBlock(editor) {
  const {
    insertBreak,
    normalizeNode
  } = editor;
  editor.insertBreak = () => {
    const [node, path] = slate.Editor.above(editor, {
      match: n => slate.Editor.isBlock(editor, n)
    }) || [editor, []];
    if (node.type === 'code' && slate.Text.isText(node.children[0])) {
      const text = node.children[0].text;
      if (text[text.length - 1] === '\n' && editor.selection && slate.Range.isCollapsed(editor.selection) && slate.Point.equals(slate.Editor.end(editor, path), editor.selection.anchor)) {
        insertBreak();
        slate.Transforms.setNodes(editor, {
          type: 'paragraph',
          children: []
        });
        slate.Transforms.delete(editor, {
          distance: 1,
          at: {
            path: [...path, 0],
            offset: text.length - 1
          }
        });
        return;
      }
      editor.insertText('\n');
      return;
    }
    insertBreak();
  };
  editor.normalizeNode = _ref => {
    let [node, path] = _ref;
    if (node.type === 'code' && slate.Element.isElement(node)) {
      for (const [index, childNode] of node.children.entries()) {
        if (!slate.Text.isText(childNode)) {
          if (editor.isVoid(childNode)) {
            slate.Transforms.removeNodes(editor, {
              at: [...path, index]
            });
          } else {
            slate.Transforms.unwrapNodes(editor, {
              at: [...path, index]
            });
          }
          return;
        }
        const marks = Object.keys(childNode).filter(x => x !== 'text');
        if (marks.length) {
          slate.Transforms.unsetNodes(editor, marks, {
            at: [...path, index]
          });
          return;
        }
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}
function CodeButton(_ref2) {
  let {
    attrs
  } = _ref2;
  const {
    editor,
    code: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    isSelected: isSelected,
    isDisabled: isDisabled,
    onMouseDown: event => {
      event.preventDefault();
      if (isSelected) {
        slate.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'code'
        });
      } else {
        slate.Transforms.wrapNodes(editor, {
          type: 'code',
          children: [{
            text: ''
          }]
        });
      }
    }
  }, attrs), core.jsx(CodeIcon.CodeIcon, {
    size: "small"
  })), [isDisabled, isSelected, attrs, editor]);
}
const codeButton = core.jsx(tooltip.Tooltip, {
  weight: "subtle",
  content: core.jsx(React.Fragment, null, "Code block ", core.jsx(toolbar.KeyboardInTooltip, null, "```"))
}, attrs => core.jsx(CodeButton, {
  attrs: attrs
}));

const TextAlignMenu = _ref => {
  let {
    alignment
  } = _ref;
  const [showMenu, setShowMenu] = React.useState(false);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: showMenu,
    onClose: () => setShowMenu(false)
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx("div", {
    css: {
      display: 'inline-block',
      position: 'relative'
    }
  }, core.jsx(tooltip.Tooltip, {
    content: "Text alignment",
    weight: "subtle"
  }, attrs => core.jsx(TextAlignButton, {
    attrs: attrs,
    onToggle: () => {
      setShowMenu(x => !x);
    },
    trigger: trigger,
    showMenu: showMenu
  })), showMenu ? core.jsx(toolbar.InlineDialog, _extends({
    ref: dialog.ref
  }, dialog.props), core.jsx(TextAlignDialog, {
    alignment: alignment,
    onClose: () => {
      setShowMenu(false);
    }
  })) : null);
};
function TextAlignDialog(_ref2) {
  let {
    alignment,
    onClose
  } = _ref2;
  const {
    alignment: {
      selected
    },
    editor
  } = useToolbarState();
  const alignments = ['start', ...Object.keys(alignment).filter(key => alignment[key])];
  return core.jsx(toolbar.ToolbarGroup, null, alignments.map(alignment => core.jsx(tooltip.Tooltip, {
    key: alignment,
    content: `Align ${alignment}`,
    weight: "subtle"
  }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
    isSelected: selected === alignment,
    onMouseDown: event => {
      event.preventDefault();
      if (alignment === 'start') {
        slate.Transforms.unsetNodes(editor, 'textAlign', {
          match: node => node.type === 'paragraph' || node.type === 'heading'
        });
      } else {
        slate.Transforms.setNodes(editor, {
          textAlign: alignment
        }, {
          match: node => node.type === 'paragraph' || node.type === 'heading'
        });
      }
      onClose();
    }
  }, attrs), alignmentIcons[alignment]))));
}
const alignmentIcons = {
  start: core.jsx(AlignLeftIcon.AlignLeftIcon, {
    size: "small"
  }),
  center: core.jsx(AlignCenterIcon.AlignCenterIcon, {
    size: "small"
  }),
  end: core.jsx(AlignRightIcon.AlignRightIcon, {
    size: "small"
  })
};
function TextAlignButton(props) {
  const {
    alignment: {
      isDisabled,
      selected
    }
  } = useToolbarState();
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    isDisabled: isDisabled,
    isPressed: props.showMenu,
    onMouseDown: event => {
      event.preventDefault();
      props.onToggle();
    }
  }, props.attrs, props.trigger.props, {
    ref: applyRef.applyRefs(props.attrs.ref, props.trigger.ref)
  }), alignmentIcons[selected], downIcon$1), [isDisabled, selected, props]);
}
const downIcon$1 = core.jsx(ChevronDownIcon.ChevronDownIcon, {
  size: "small"
});

const minusIcon = /*#__PURE__*/React__default["default"].createElement(MinusIcon.MinusIcon, {
  size: "small"
});
function insertDivider(editor) {
  formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
    type: 'divider',
    children: [{
      text: ''
    }]
  });
  slate.Editor.insertNode(editor, {
    type: 'paragraph',
    children: [{
      text: ''
    }]
  });
}
const DividerButton = _ref => {
  let {
    attrs
  } = _ref;
  const {
    editor,
    dividers: {
      isDisabled
    }
  } = useToolbarState();
  return React.useMemo(() => /*#__PURE__*/React__default["default"].createElement(toolbar.ToolbarButton, _extends({
    isDisabled: isDisabled,
    onMouseDown: event => {
      event.preventDefault();
      insertDivider(editor);
    }
  }, attrs), minusIcon), [editor, isDisabled, attrs]);
};
const dividerButton = /*#__PURE__*/React__default["default"].createElement(tooltip.Tooltip, {
  content: /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, "Divider", /*#__PURE__*/React__default["default"].createElement(toolbar.KeyboardInTooltip, null, "---")),
  weight: "subtle"
}, attrs => /*#__PURE__*/React__default["default"].createElement(DividerButton, {
  attrs: attrs
}));
function withDivider(editor) {
  const {
    isVoid
  } = editor;
  editor.isVoid = node => {
    return node.type === 'divider' || isVoid(node);
  };
  return editor;
}

const _excluded$1 = ["type"],
  _excluded2 = ["ref"];
function Toolbar(_ref) {
  let {
    documentFeatures,
    viewState
  } = _ref;
  const relationship = React.useContext(DocumentFieldRelationshipsContext);
  const blockComponent = React.useContext(ComponentBlockContext);
  const hasBlockItems = Object.entries(relationship).length || Object.keys(blockComponent).length;
  const hasMarks = Object.values(documentFeatures.formatting.inlineMarks).some(x => x);
  return core.jsx(ToolbarContainer, null, core.jsx(toolbar.ToolbarGroup, null, !!documentFeatures.formatting.headingLevels.length && core.jsx(HeadingMenu, {
    headingLevels: documentFeatures.formatting.headingLevels
  }), hasMarks && core.jsx(InlineMarks, {
    marks: documentFeatures.formatting.inlineMarks
  }), hasMarks && core.jsx(toolbar.ToolbarSeparator, null), (documentFeatures.formatting.alignment.center || documentFeatures.formatting.alignment.end) && core.jsx(TextAlignMenu, {
    alignment: documentFeatures.formatting.alignment
  }), documentFeatures.formatting.listTypes.unordered && core.jsx(tooltip.Tooltip, {
    content: core.jsx(React.Fragment, null, "Bullet List ", core.jsx(toolbar.KeyboardInTooltip, null, "- ")),
    weight: "subtle"
  }, attrs => core.jsx(ListButton, _extends({
    type: "unordered-list"
  }, attrs), core.jsx(BulletListIcon, null))), documentFeatures.formatting.listTypes.ordered && core.jsx(tooltip.Tooltip, {
    content: core.jsx(React.Fragment, null, "Numbered List ", core.jsx(toolbar.KeyboardInTooltip, null, "1. ")),
    weight: "subtle"
  }, attrs => core.jsx(ListButton, _extends({
    type: "ordered-list"
  }, attrs), core.jsx(NumberedListIcon, null))), (documentFeatures.formatting.alignment.center || documentFeatures.formatting.alignment.end || documentFeatures.formatting.listTypes.unordered || documentFeatures.formatting.listTypes.ordered) && core.jsx(toolbar.ToolbarSeparator, null), documentFeatures.dividers && dividerButton, documentFeatures.links && linkButton, documentFeatures.formatting.blockTypes.blockquote && blockquoteButton, !!documentFeatures.layouts.length && core.jsx(LayoutsButton, {
    layouts: documentFeatures.layouts
  }), documentFeatures.formatting.blockTypes.code && codeButton, !!hasBlockItems && core.jsx(InsertBlockMenu, null)), React.useMemo(() => {
    const ExpandIcon = viewState !== null && viewState !== void 0 && viewState.expanded ? Minimize2Icon.Minimize2Icon : Maximize2Icon.Maximize2Icon;
    return viewState && core.jsx(toolbar.ToolbarGroup, null, core.jsx(toolbar.ToolbarSeparator, null), core.jsx(tooltip.Tooltip, {
      content: viewState.expanded ? 'Collapse' : 'Expand',
      weight: "subtle"
    }, attrs => core.jsx(toolbar.ToolbarButton, _extends({
      onMouseDown: event => {
        event.preventDefault();
        viewState.toggle();
      }
    }, attrs), core.jsx(ExpandIcon, {
      size: "small"
    }))));
  }, [viewState]));
}

/* UI Components */

const MarkButton = /*#__PURE__*/React.forwardRef(function MarkButton(props, ref) {
  const {
    editor,
    marks: {
      [props.type]: {
        isDisabled,
        isSelected
      }
    }
  } = useToolbarState();
  return React.useMemo(() => {
    const restProps = _objectWithoutProperties(props, _excluded$1);
    return core.jsx(toolbar.ToolbarButton, _extends({
      ref: ref,
      isDisabled: isDisabled,
      isSelected: isSelected,
      onMouseDown: event => {
        event.preventDefault();
        if (isSelected) {
          slate.Editor.removeMark(editor, props.type);
        } else {
          slate.Editor.addMark(editor, props.type, true);
        }
      }
    }, restProps));
  }, [editor, isDisabled, isSelected, props, ref]);
});
const ToolbarContainer = _ref2 => {
  let {
    children
  } = _ref2;
  const {
    colors,
    spacing
  } = core.useTheme();
  return core.jsx("div", {
    css: {
      borderBottom: `1px solid ${colors.border}`,
      background: colors.background,
      position: 'sticky',
      top: 0,
      zIndex: 2,
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit'
    }
  }, core.jsx("div", {
    css: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      paddingLeft: spacing.xsmall,
      paddingRight: spacing.xsmall
    }
  }, children));
};
const downIcon = core.jsx(ChevronDownIcon.ChevronDownIcon, {
  size: "small"
});
function HeadingButton(_ref3) {
  let {
    trigger,
    onToggleShowMenu,
    showMenu
  } = _ref3;
  const {
    textStyles
  } = useToolbarState();
  let buttonLabel = textStyles.selected === 'normal' ? 'Normal text' : 'Heading ' + textStyles.selected;
  const isDisabled = textStyles.allowedHeadingLevels.length === 0;
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    ref: trigger.ref,
    isPressed: showMenu,
    isDisabled: isDisabled,
    onMouseDown: event => {
      event.preventDefault();
      onToggleShowMenu();
    },
    style: {
      textAlign: 'left',
      width: 116
    }
  }, trigger.props), core.jsx("span", {
    css: {
      flex: 1
    }
  }, buttonLabel), downIcon), [buttonLabel, trigger, showMenu, onToggleShowMenu, isDisabled]);
}
const HeadingMenu = _ref4 => {
  let {
    headingLevels
  } = _ref4;
  const [showMenu, setShowMenu] = React.useState(false);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: showMenu,
    onClose: () => setShowMenu(false)
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx("div", {
    css: {
      display: 'inline-block',
      position: 'relative'
    }
  }, core.jsx(HeadingButton, {
    showMenu: showMenu,
    trigger: trigger,
    onToggleShowMenu: () => {
      setShowMenu(x => !x);
    }
  }), showMenu ? core.jsx(toolbar.InlineDialog, _extends({
    ref: dialog.ref
  }, dialog.props), core.jsx(HeadingDialog, {
    headingLevels: headingLevels,
    onCloseMenu: () => {
      setShowMenu(false);
    }
  })) : null);
};
function HeadingDialog(_ref5) {
  let {
    headingLevels,
    onCloseMenu
  } = _ref5;
  const {
    editor,
    textStyles
  } = useToolbarState();
  return core.jsx(toolbar.ToolbarGroup, {
    direction: "column"
  }, headingLevels.map(hNum => {
    let Tag = `h${hNum}`;
    const isSelected = textStyles.selected === hNum;
    return core.jsx(toolbar.ToolbarButton, {
      key: hNum,
      isSelected: isSelected,
      onMouseDown: event => {
        event.preventDefault();
        if (isSelected) {
          slate.Transforms.unwrapNodes(editor, {
            match: n => n.type === 'heading'
          });
        } else {
          slate.Transforms.setNodes(editor, {
            type: 'heading',
            level: hNum
          }, {
            match: node => node.type === 'paragraph' || node.type === 'heading'
          });
        }
        onCloseMenu();
      }
    }, core.jsx(Tag, null, "Heading ", hNum));
  }));
}
function InsertBlockMenu() {
  const [showMenu, setShowMenu] = React.useState(false);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: showMenu,
    onClose: () => setShowMenu(false)
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx("div", {
    css: {
      display: 'inline-block',
      position: 'relative'
    }
  }, core.jsx(tooltip.Tooltip, {
    content: core.jsx(React.Fragment, null, "Insert ", core.jsx(toolbar.KeyboardInTooltip, null, "/")),
    weight: "subtle"
  }, _ref6 => {
    let {
        ref
      } = _ref6,
      attrs = _objectWithoutProperties(_ref6, _excluded2);
    return core.jsx(toolbar.ToolbarButton, _extends({
      ref: applyRef.applyRefs(ref, trigger.ref),
      isPressed: showMenu,
      onMouseDown: event => {
        event.preventDefault();
        setShowMenu(v => !v);
      }
    }, trigger.props, attrs), core.jsx(PlusIcon.PlusIcon, {
      size: "small",
      style: {
        strokeWidth: 3
      }
    }), core.jsx(ChevronDownIcon.ChevronDownIcon, {
      size: "small"
    }));
  }), showMenu ? core.jsx(toolbar.InlineDialog, _extends({
    ref: dialog.ref
  }, dialog.props), core.jsx(toolbar.ToolbarGroup, {
    direction: "column"
  }, core.jsx(RelationshipButton, {
    onClose: () => setShowMenu(false)
  }), core.jsx(BlockComponentsButtons, {
    onClose: () => setShowMenu(false)
  }))) : null);
}
function InlineMarks(_ref7) {
  let {
    marks
  } = _ref7;
  const [showMenu, setShowMenu] = React.useState(false);
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: showMenu,
    onClose: () => setShowMenu(false)
  }, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  });
  return core.jsx(React.Fragment, null, marks.bold && core.jsx(tooltip.Tooltip, {
    content: core.jsx(React.Fragment, null, "Bold", core.jsx(toolbar.KeyboardInTooltip, null, formFromPreview.modifierKeyText, "B")),
    weight: "subtle"
  }, attrs => core.jsx(MarkButton, _extends({
    type: "bold"
  }, attrs), core.jsx(BoldIcon.BoldIcon, {
    size: "small",
    style: {
      strokeWidth: 3
    }
  }))), marks.italic && core.jsx(tooltip.Tooltip, {
    content: core.jsx(React.Fragment, null, "Italic", core.jsx(toolbar.KeyboardInTooltip, null, formFromPreview.modifierKeyText, "I")),
    weight: "subtle"
  }, attrs => core.jsx(MarkButton, _extends({
    type: "italic"
  }, attrs), core.jsx(ItalicIcon.ItalicIcon, {
    size: "small"
  }))), core.jsx(tooltip.Tooltip, {
    content: "More formatting",
    weight: "subtle"
  }, attrs => core.jsx(MoreFormattingButton, {
    isOpen: showMenu,
    onToggle: () => {
      setShowMenu(v => !v);
    },
    trigger: trigger,
    attrs: attrs
  })), showMenu && core.jsx(MoreFormattingDialog, {
    onCloseMenu: () => {
      setShowMenu(false);
    },
    dialog: dialog,
    marks: marks
  }));
}
function MoreFormattingDialog(_ref8) {
  let {
    dialog,
    marks,
    onCloseMenu
  } = _ref8;
  // not doing optimisations in here because this will only render when it's open
  // which will be rare and you won't be typing while it's open
  const {
    editor,
    clearFormatting: {
      isDisabled
    }
  } = useToolbarState();
  return core.jsx(toolbar.InlineDialog, _extends({
    onMouseDown: event => {
      if (event.target instanceof HTMLElement && event.target.closest('button')) {
        onCloseMenu();
      }
    },
    ref: dialog.ref
  }, dialog.props), core.jsx(toolbar.ToolbarGroup, {
    direction: "column"
  }, marks.underline && core.jsx(MarkButton, {
    type: "underline"
  }, core.jsx(ContentInButtonWithShortcut, {
    content: "Underline",
    shortcut: `${formFromPreview.modifierKeyText}U`
  })), marks.strikethrough && core.jsx(MarkButton, {
    type: "strikethrough"
  }, "Strikethrough"), marks.code && core.jsx(MarkButton, {
    type: "code"
  }, "Code"), marks.keyboard && core.jsx(MarkButton, {
    type: "keyboard"
  }, "Keyboard"), marks.subscript && core.jsx(MarkButton, {
    type: "subscript"
  }, "Subscript"), marks.superscript && core.jsx(MarkButton, {
    type: "superscript"
  }, "Superscript"), core.jsx(toolbar.ToolbarButton, {
    isDisabled: isDisabled,
    onMouseDown: event => {
      event.preventDefault();
      formFromPreview.clearFormatting(editor);
    }
  }, core.jsx(ContentInButtonWithShortcut, {
    content: "Clear Formatting",
    shortcut: `${formFromPreview.modifierKeyText}\\`
  }))));
}
function ContentInButtonWithShortcut(_ref9) {
  let {
    content,
    shortcut
  } = _ref9;
  const theme = core.useTheme();
  return core.jsx("span", {
    css: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }
  }, core.jsx("span", null, content), core.jsx("kbd", {
    css: {
      fontFamily: 'inherit',
      marginLeft: theme.spacing.small,
      padding: theme.spacing.xxsmall,
      paddingLeft: theme.spacing.xsmall,
      paddingRight: theme.spacing.xsmall,
      backgroundColor: theme.palette.neutral400,
      borderRadius: theme.radii.xsmall,
      color: theme.colors.foregroundDim,
      whiteSpace: 'pre'
    }
  }, shortcut));
}
function MoreFormattingButton(_ref10) {
  let {
    onToggle,
    isOpen,
    trigger,
    attrs
  } = _ref10;
  const {
    marks
  } = useToolbarState();
  const isActive = marks.strikethrough.isSelected || marks.underline.isSelected || marks.code.isSelected || marks.keyboard.isSelected || marks.subscript.isSelected || marks.superscript.isSelected;
  return React.useMemo(() => core.jsx(toolbar.ToolbarButton, _extends({
    isPressed: isOpen,
    isSelected: isActive,
    onMouseDown: event => {
      event.preventDefault();
      onToggle();
    }
  }, trigger.props, attrs, {
    ref: applyRef.applyRefs(attrs.ref, trigger.ref)
  }), core.jsx(MoreHorizontalIcon.MoreHorizontalIcon, {
    size: "small"
  })), [isActive, onToggle, isOpen, trigger, attrs]);
}

// Custom (non-feather) Icons
// ------------------------------

const IconBase = props => core.jsx("svg", _extends({
  "aria-hidden": "true",
  fill: "currentColor",
  focusable: "false",
  height: "16",
  role: "presentation",
  viewBox: "0 0 16 16",
  width: "16"
}, props));
const BulletListIcon = () => core.jsx(IconBase, null, core.jsx("path", {
  d: "M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z"
}));
const NumberedListIcon = () => core.jsx(IconBase, null, core.jsx("path", {
  d: "M2.003 2.5a.5.5 0 00-.723-.447l-1.003.5a.5.5 0 00.446.895l.28-.14V6H.5a.5.5 0 000 1h2.006a.5.5 0 100-1h-.503V2.5zM5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32l.003-.004a.851.851 0 01.144-.153A.66.66 0 011.5 10c.195 0 .306.068.374.146a.57.57 0 01.128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 00.5.5h2.003a.5.5 0 000-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845 0-.365-.118-.744-.377-1.038-.268-.303-.658-.484-1.126-.484-.48 0-.84.202-1.068.392a1.858 1.858 0 00-.348.384l-.007.011-.002.004-.001.002-.001.001a.5.5 0 00.851.525zM.5 10.055l-.427-.26.427.26z"
}));

const headingStylesMap = {
  h1: {
    fontSize: '2.2rem'
  },
  h2: {
    fontSize: '1.8rem'
  },
  h3: {
    fontSize: '1.5rem'
  },
  h4: {
    fontSize: '1.2rem'
  },
  h5: {
    fontSize: '0.83rem'
  },
  h6: {
    fontSize: '0.67rem'
  }
};
const HeadingElement = _ref => {
  let {
    attributes,
    children,
    element
  } = _ref;
  const Tag = `h${element.level}`;
  const headingStyle = headingStylesMap[Tag];
  return core.jsx(Tag, _extends({}, attributes, {
    css: _objectSpread(_objectSpread({}, headingStyle), {}, {
      textAlign: element.textAlign
    })
  }), children);
};
function withHeading(editor) {
  const {
    insertBreak
  } = editor;
  editor.insertBreak = () => {
    insertBreak();
    const entry = slate.Editor.above(editor, {
      match: n => n.type === 'heading'
    });
    if (!entry || !editor.selection || !slate.Range.isCollapsed(editor.selection)) return;
    const path = entry[1];
    if (
    // we want to unwrap the heading when the user inserted a break at the end of the heading
    // when the user inserts a break at the end of a heading, the new heading
    // that we want to unwrap will be empty so the end will be equal to the selection
    slate.Point.equals(slate.Editor.end(editor, path), editor.selection.anchor)) {
      slate.Transforms.unwrapNodes(editor, {
        at: path
      });
      return;
    }
    // we also want to unwrap the _previous_ heading when the user inserted a break
    // at the start of the heading, essentially just inserting an empty paragraph above the heading
    if (!slate.Path.hasPrevious(path)) return;
    const previousPath = slate.Path.previous(path);
    const previousNode = slate.Node.get(editor, previousPath);
    if (previousNode.type === 'heading' && previousNode.children.length === 1 && slate.Text.isText(previousNode.children[0]) && previousNode.children[0].text === '') {
      slate.Transforms.unwrapNodes(editor, {
        at: previousPath
      });
    }
  };
  return editor;
}

// some of the renderers read properties of the element
// and TS doesn't understand the type narrowing when doing a spread for some reason
// so that's why things aren't being spread in some cases
const renderElement = props => {
  switch (props.element.type) {
    case 'layout':
      return core.jsx(LayoutContainer, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'layout-area':
      return core.jsx(LayoutArea, props);
    case 'code':
      return core.jsx(CodeElement, props);
    case 'component-block':
      {
        return core.jsx(ComponentBlocksElement, {
          attributes: props.attributes,
          children: props.children,
          element: props.element
        });
      }
    case 'component-inline-prop':
    case 'component-block-prop':
      return core.jsx(ComponentInlineProp, props);
    case 'heading':
      return core.jsx(HeadingElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'link':
      return core.jsx(LinkElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'ordered-list':
      return core.jsx("ol", props.attributes, props.children);
    case 'unordered-list':
      return core.jsx("ul", props.attributes, props.children);
    case 'list-item':
      return core.jsx("li", props.attributes, props.children);
    case 'list-item-content':
      return core.jsx("span", props.attributes, props.children);
    case 'blockquote':
      return core.jsx(BlockquoteElement, props);
    case 'relationship':
      return core.jsx(RelationshipElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'divider':
      return core.jsx(DividerElement, props);
    default:
      return core.jsx("p", _extends({
        css: {
          textAlign: props.element.textAlign
        }
      }, props.attributes), props.children);
  }
};

/* Block Elements */

const CodeElement = _ref => {
  let {
    attributes,
    children
  } = _ref;
  const {
    colors,
    radii,
    spacing,
    typography
  } = core.useTheme();
  return core.jsx("pre", _extends({
    spellCheck: "false",
    css: {
      backgroundColor: colors.backgroundDim,
      border: `1px solid ${colors.border}`,
      borderRadius: radii.xsmall,
      fontFamily: typography.fontFamily.monospace,
      fontSize: typography.fontSize.small,
      padding: `${spacing.small}px ${spacing.medium}px`,
      overflowX: 'auto'
    }
  }, attributes), core.jsx("code", {
    css: {
      fontFamily: 'inherit'
    }
  }, children));
};
const DividerElement = _ref2 => {
  let {
    attributes,
    children
  } = _ref2;
  const {
    colors,
    spacing
  } = core.useTheme();
  const selected = slateReact.useSelected();
  return core.jsx("div", _extends({}, attributes, {
    css: {
      paddingBottom: spacing.medium,
      paddingTop: spacing.medium,
      marginBottom: spacing.medium,
      marginTop: spacing.medium,
      caretColor: 'transparent'
    }
  }), core.jsx("hr", {
    css: {
      backgroundColor: selected ? colors.linkColor : colors.border,
      border: 0,
      height: 2
    }
  }), children);
};

const allMarkdownShortcuts = {
  bold: ['**', '__'],
  italic: ['*', '_'],
  strikethrough: ['~~'],
  code: ['`']
};
function applyMark(editor, mark, shortcutText, startOfStartPoint) {
  // so that this starts a new undo group
  editor.history.undos.push([]);
  const startPointRef = slate.Editor.pointRef(editor, startOfStartPoint);
  slate.Transforms.delete(editor, {
    at: editor.selection.anchor,
    distance: shortcutText.length,
    reverse: true
  });
  slate.Transforms.delete(editor, {
    at: startOfStartPoint,
    distance: shortcutText.length
  });
  slate.Transforms.setNodes(editor, {
    [mark]: true
  }, {
    match: slate.Text.isText,
    split: true,
    at: {
      anchor: startPointRef.unref(),
      focus: editor.selection.anchor
    }
  });
  // once you've ended the shortcut, you're done with the mark
  // so we need to remove it so the text you insert after doesn't have it
  editor.removeMark(mark);
}
function withMarks(editorDocumentFeatures, componentBlocks, editor) {
  const {
    insertText,
    insertBreak
  } = editor;
  editor.insertBreak = () => {
    insertBreak();
    const marksAfterInsertBreak = slate.Editor.marks(editor);
    if (!marksAfterInsertBreak || !editor.selection) return;
    const parentBlock = slate.Editor.above(editor, {
      match: node => slate.Editor.isBlock(editor, node)
    });
    if (!parentBlock) return;
    const point = formFromPreview.EditorAfterButIgnoringingPointsWithNoContent(editor, editor.selection.anchor);
    const marksAfterInsertBreakArr = Object.keys(marksAfterInsertBreak);
    if (!point || !slate.Path.isDescendant(point.path, parentBlock[1])) {
      for (const mark of marksAfterInsertBreakArr) {
        editor.removeMark(mark);
      }
      return;
    }
    const textNode = slate.Node.get(editor, point.path);
    for (const mark of marksAfterInsertBreakArr) {
      if (!textNode[mark]) {
        editor.removeMark(mark);
      }
    }
  };
  const selectedMarkdownShortcuts = {};
  const enabledMarks = editorDocumentFeatures.formatting.inlineMarks;
  Object.keys(allMarkdownShortcuts).forEach(mark => {
    if (enabledMarks[mark]) {
      selectedMarkdownShortcuts[mark] = allMarkdownShortcuts[mark];
    }
  });
  if (Object.keys(selectedMarkdownShortcuts).length === 0) return editor;
  editor.insertText = text => {
    insertText(text);
    if (editor.selection && slate.Range.isCollapsed(editor.selection)) {
      for (const [mark, shortcuts] of Object.entries(selectedMarkdownShortcuts)) {
        for (const shortcutText of shortcuts) {
          if (text === shortcutText[shortcutText.length - 1]) {
            // this function is not inlined because
            // https://github.com/swc-project/swc/issues/2622
            const startOfBlock = getStartOfBlock(editor);
            let startOfBlockToEndOfShortcutString = slate.Editor.string(editor, {
              anchor: editor.selection.anchor,
              focus: startOfBlock
            });
            const hasWhitespaceBeforeEndOfShortcut = /\s/.test(startOfBlockToEndOfShortcutString.slice(-shortcutText.length - 1, -shortcutText.length));
            const endOfShortcutContainsExpectedContent = shortcutText === startOfBlockToEndOfShortcutString.slice(-shortcutText.length);
            if (hasWhitespaceBeforeEndOfShortcut || !endOfShortcutContainsExpectedContent) {
              continue;
            }
            const strToMatchOn = startOfBlockToEndOfShortcutString.slice(0, -shortcutText.length - 1);
            // TODO: use regex probs
            for (const [offsetFromStartOfBlock] of [...strToMatchOn].reverse().entries()) {
              const expectedShortcutText = strToMatchOn.slice(offsetFromStartOfBlock, offsetFromStartOfBlock + shortcutText.length);
              if (expectedShortcutText !== shortcutText) {
                continue;
              }
              const startOfStartOfShortcut = offsetFromStartOfBlock === 0 ? startOfBlock : formFromPreview.EditorAfterButIgnoringingPointsWithNoContent(editor, startOfBlock, {
                distance: offsetFromStartOfBlock
              });
              const endOfStartOfShortcut = slate.Editor.after(editor, startOfStartOfShortcut, {
                distance: shortcutText.length
              });
              if (offsetFromStartOfBlock !== 0 && !/\s/.test(slate.Editor.string(editor, {
                anchor: slate.Editor.before(editor, startOfStartOfShortcut, {
                  unit: 'character'
                }),
                focus: startOfStartOfShortcut
              }))) {
                continue;
              }
              const contentBetweenShortcuts = slate.Editor.string(editor, {
                anchor: endOfStartOfShortcut,
                focus: editor.selection.anchor
              }).slice(0, -shortcutText.length);
              if (contentBetweenShortcuts === '' || /\s/.test(contentBetweenShortcuts[0])) {
                continue;
              }

              // this is a bit of a weird one
              // let's say you had <text>__thing _<cursor /></text> and you insert `_`.
              // without the below, that would turn into <text italic>_thing _<cursor /></text>
              // but it's probably meant to be bold but it's not because of the space before the ending _
              // there's probably a better way to do this but meh, this works
              if (mark === 'italic' && (contentBetweenShortcuts[0] === '_' || contentBetweenShortcuts[0] === '*')) {
                continue;
              }
              const ancestorComponentChildFieldDocumentFeatures = getAncestorComponentChildFieldDocumentFeatures(editor, editorDocumentFeatures, componentBlocks);
              if (ancestorComponentChildFieldDocumentFeatures && ancestorComponentChildFieldDocumentFeatures.inlineMarks !== 'inherit' && ancestorComponentChildFieldDocumentFeatures.inlineMarks[mark] === false) {
                continue;
              }
              applyMark(editor, mark, shortcutText, startOfStartOfShortcut);
              return;
            }
          }
        }
      }
    }
  };
  return editor;
}
function getStartOfBlock(editor) {
  return slate.Editor.start(editor, slate.Editor.above(editor, {
    match: node => slate.Editor.isBlock(editor, node)
  })[1]);
}

let noop = () => {};
function getOptions(toolbarState, componentBlocks, relationships) {
  const options = [...Object.entries(relationships).map(_ref => {
    let [relationship, {
      label
    }] = _ref;
    return {
      label,
      insert: editor => {
        slate.Transforms.insertNodes(editor, {
          type: 'relationship',
          relationship,
          data: null,
          children: [{
            text: ''
          }]
        });
      }
    };
  }), ...Object.keys(componentBlocks).map(key => ({
    label: componentBlocks[key].label,
    insert: editor => {
      insertComponentBlock(editor, componentBlocks, key);
    }
  })), ...toolbarState.textStyles.allowedHeadingLevels.filter(a => toolbarState.editorDocumentFeatures.formatting.headingLevels.includes(a)).map(level => ({
    label: `Heading ${level}`,
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'heading',
        level,
        children: [{
          text: ''
        }]
      });
    }
  })), !toolbarState.blockquote.isDisabled && toolbarState.editorDocumentFeatures.formatting.blockTypes.blockquote && {
    label: 'Blockquote',
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'blockquote',
        children: [{
          text: ''
        }]
      });
    }
  }, !toolbarState.code.isDisabled && toolbarState.editorDocumentFeatures.formatting.blockTypes.code && {
    label: 'Code block',
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'code',
        children: [{
          text: ''
        }]
      });
    }
  }, !toolbarState.dividers.isDisabled && toolbarState.editorDocumentFeatures.dividers && {
    label: 'Divider',
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'divider',
        children: [{
          text: ''
        }]
      });
    }
  }, !!toolbarState.editorDocumentFeatures.layouts.length && {
    label: 'Layout',
    insert(editor) {
      insertLayout(editor, toolbarState.editorDocumentFeatures.layouts[0]);
    }
  }, !toolbarState.lists.ordered.isDisabled && toolbarState.editorDocumentFeatures.formatting.listTypes.ordered && {
    label: 'Numbered List',
    keywords: ['ordered list'],
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'ordered-list',
        children: [{
          text: ''
        }]
      });
    }
  }, !toolbarState.lists.unordered.isDisabled && toolbarState.editorDocumentFeatures.formatting.listTypes.unordered && {
    label: 'Bullet List',
    keywords: ['unordered list'],
    insert(editor) {
      formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, {
        type: 'unordered-list',
        children: [{
          text: ''
        }]
      });
    }
  }];
  return options.filter(x => typeof x !== 'boolean');
}
function insertOption(editor, text, option) {
  const path = slateReact.ReactEditor.findPath(editor, text);
  slate.Transforms.delete(editor, {
    at: {
      focus: slate.Editor.start(editor, path),
      anchor: slate.Editor.end(editor, path)
    }
  });
  option.insert(editor);
}

// TODO: the changing width of the menu when searching isn't great
function InsertMenu(_ref2) {
  let {
    children,
    text
  } = _ref2;
  const toolbarState = useToolbarState();
  const {
    editor,
    relationships: {
      isDisabled: relationshipsDisabled
    }
  } = toolbarState;
  const {
    dialog,
    trigger
  } = popover.useControlledPopover({
    isOpen: true,
    onClose: noop
  }, {
    placement: 'bottom-start'
  });
  const componentBlocks = React.useContext(ComponentBlockContext);
  const relationships = useDocumentFieldRelationships();
  const options = matchSorter.matchSorter(getOptions(toolbarState, componentBlocks, relationshipsDisabled ? {} : relationships), text.text.slice(1), {
    keys: ['label', 'keywords']
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  if (options.length && selectedIndex >= options.length) {
    setSelectedIndex(0);
  }
  const stateRef = React.useRef({
    selectedIndex,
    options,
    text
  });
  React.useEffect(() => {
    stateRef.current = {
      selectedIndex,
      options,
      text
    };
  });
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    var _dialogRef$current, _dialogRef$current$ch;
    const element = (_dialogRef$current = dialogRef.current) === null || _dialogRef$current === void 0 ? void 0 : (_dialogRef$current$ch = _dialogRef$current.children) === null || _dialogRef$current$ch === void 0 ? void 0 : _dialogRef$current$ch[selectedIndex];
    if (dialogRef.current && element) {
      scrollIntoView__default["default"](element, {
        scrollMode: 'if-needed',
        boundary: dialogRef.current,
        block: 'nearest'
      });
    }
  }, [selectedIndex]);
  React.useEffect(() => {
    const domNode = slateReact.ReactEditor.toDOMNode(editor, editor);
    let listener = event => {
      if (event.defaultPrevented) return;
      switch (event.key) {
        case 'ArrowDown':
          {
            if (stateRef.current.options.length) {
              event.preventDefault();
              setSelectedIndex(stateRef.current.selectedIndex === stateRef.current.options.length - 1 ? 0 : stateRef.current.selectedIndex + 1);
            }
            return;
          }
        case 'ArrowUp':
          {
            if (stateRef.current.options.length) {
              event.preventDefault();
              setSelectedIndex(stateRef.current.selectedIndex === 0 ? stateRef.current.options.length - 1 : stateRef.current.selectedIndex - 1);
            }
            return;
          }
        case 'Enter':
          {
            const option = stateRef.current.options[stateRef.current.selectedIndex];
            if (option) {
              insertOption(editor, stateRef.current.text, option);
              event.preventDefault();
            }
            return;
          }
        case 'Escape':
          {
            const path = slateReact.ReactEditor.findPath(editor, stateRef.current.text);
            slate.Transforms.unsetNodes(editor, 'insertMenu', {
              at: path
            });
            event.preventDefault();
            return;
          }
      }
    };
    domNode.addEventListener('keydown', listener);
    return () => {
      domNode.removeEventListener('keydown', listener);
    };
  }, [editor]);
  const DIALOG_HEIGHT = 300;
  return core.jsx(React.Fragment, null, core.jsx("span", _extends({}, trigger.props, {
    css: {
      color: 'blue'
    },
    ref: trigger.ref
  }), children), core.jsx(core.Portal, null, core.jsx(toolbar.InlineDialog, _extends({
    contentEditable: false
  }, dialog.props, {
    css: {
      display: options.length ? undefined : 'none',
      userSelect: 'none',
      maxHeight: DIALOG_HEIGHT,
      zIndex: 3
    },
    ref: dialog.ref
  }), core.jsx("div", {
    ref: dialogRef,
    css: {
      overflowY: 'auto',
      maxHeight: DIALOG_HEIGHT - 8 * 2
    }
  }, options.map((option, index) => core.jsx(toolbar.ToolbarButton, {
    key: option.label,
    isPressed: index === selectedIndex,
    onMouseEnter: () => {
      setSelectedIndex(index);
    },
    onMouseDown: event => {
      event.preventDefault();
      insertOption(editor, text, option);
    }
  }, option.label))))));
}
const nodeListsWithoutInsertMenu = new WeakSet();
const nodesWithoutInsertMenu = new WeakSet();
function findPathWithInsertMenu(node, path) {
  if (slate.Text.isText(node)) {
    return node.insertMenu ? path : undefined;
  }
  if (nodeListsWithoutInsertMenu.has(node.children)) {
    return;
  }
  for (const [index, child] of node.children.entries()) {
    if (nodesWithoutInsertMenu.has(child)) continue;
    let maybePath = findPathWithInsertMenu(child, [...path, index]);
    if (maybePath) {
      return maybePath;
    }
    nodesWithoutInsertMenu.add(child);
  }
  nodeListsWithoutInsertMenu.add(node.children);
}
function removeInsertMenuMarkWhenOutsideOfSelection(editor) {
  var _Editor$marks;
  const path = findPathWithInsertMenu(editor, []);
  if (path && !((_Editor$marks = slate.Editor.marks(editor)) !== null && _Editor$marks !== void 0 && _Editor$marks.insertMenu) && (!editor.selection || !slate.Path.equals(editor.selection.anchor.path, path) || !slate.Path.equals(editor.selection.focus.path, path))) {
    slate.Transforms.unsetNodes(editor, 'insertMenu', {
      at: path
    });
    return true;
  }
  return false;
}
function withInsertMenu(editor) {
  const {
    normalizeNode,
    apply,
    insertText
  } = editor;
  editor.normalizeNode = _ref3 => {
    let [node, path] = _ref3;
    if (slate.Text.isText(node) && node.insertMenu) {
      if (node.text[0] !== '/') {
        slate.Transforms.unsetNodes(editor, 'insertMenu', {
          at: path
        });
        return;
      }
      const whitespaceMatch = /\s/.exec(node.text);
      if (whitespaceMatch) {
        slate.Transforms.unsetNodes(editor, 'insertMenu', {
          at: {
            anchor: {
              path,
              offset: whitespaceMatch.index
            },
            focus: slate.Editor.end(editor, path)
          },
          match: slate.Text.isText,
          split: true
        });
        return;
      }
    }
    if (slate.Editor.isEditor(editor) && removeInsertMenuMarkWhenOutsideOfSelection(editor)) {
      return;
    }
    normalizeNode([node, path]);
  };
  editor.apply = op => {
    apply(op);
    // we're calling this here AND in normalizeNode
    // because normalizeNode won't be called on selection changes
    // but apply will
    // we're still calling this from normalizeNode though because we want it to happen
    // when normalization happens
    if (op.type === 'set_selection') {
      removeInsertMenuMarkWhenOutsideOfSelection(editor);
    }
  };
  editor.insertText = text => {
    insertText(text);
    if (editor.selection && text === '/') {
      const startOfBlock = slate.Editor.start(editor, slate.Editor.above(editor, {
        match: node => slate.Editor.isBlock(editor, node)
      })[1]);
      const before = slate.Editor.before(editor, editor.selection.anchor, {
        unit: 'character'
      });
      if (before && (slate.Point.equals(startOfBlock, before) || before.offset !== 0 && /\s/.test(slate.Node.get(editor, before.path).text[before.offset - 1]))) {
        slate.Transforms.setNodes(editor, {
          insertMenu: true
        }, {
          at: {
            anchor: before,
            focus: editor.selection.anchor
          },
          match: slate.Text.isText,
          split: true
        });
      }
    }
  };
  return editor;
}

/** @jsxRuntime classic */
function Placeholder(_ref) {
  let {
    placeholder,
    children
  } = _ref;
  const [width, setWidth] = React.useState(0);
  return core.jsx("span", {
    css: {
      position: 'relative',
      display: 'inline-block',
      width
    }
  }, core.jsx("span", {
    contentEditable: false,
    style: {
      position: 'absolute',
      pointerEvents: 'none',
      display: 'inline-block',
      left: 0,
      top: 0,
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      opacity: '0.5',
      userSelect: 'none',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: 'none',
      textAlign: 'left'
    }
  }, core.jsx("span", {
    ref: node => {
      if (node) {
        const offsetWidth = node.offsetWidth;
        if (offsetWidth !== width) {
          setWidth(offsetWidth);
        }
      }
    }
  }, placeholder)), children);
}
const Leaf = _ref2 => {
  let {
    leaf,
    text,
    children,
    attributes
  } = _ref2;
  const {
    colors,
    radii,
    spacing,
    typography
  } = core.useTheme();
  const {
    underline,
    strikethrough,
    bold,
    italic,
    code,
    keyboard,
    superscript,
    subscript,
    placeholder,
    insertMenu
  } = leaf;
  if (placeholder !== undefined) {
    children = core.jsx(Placeholder, {
      placeholder: placeholder
    }, children);
  }
  if (insertMenu) {
    children = core.jsx(InsertMenu, {
      text: text
    }, children);
  }
  if (code) {
    children = core.jsx("code", {
      css: {
        backgroundColor: colors.backgroundDim,
        borderRadius: radii.xsmall,
        display: 'inline-block',
        fontFamily: typography.fontFamily.monospace,
        fontSize: typography.fontSize.small,
        padding: `0 ${spacing.xxsmall}px`
      }
    }, children);
  }
  if (bold) {
    children = core.jsx("strong", null, children);
  }
  if (strikethrough) {
    children = core.jsx("s", null, children);
  }
  if (italic) {
    children = core.jsx("em", null, children);
  }
  if (keyboard) {
    children = core.jsx("kbd", null, children);
  }
  if (superscript) {
    children = core.jsx("sup", null, children);
  }
  if (subscript) {
    children = core.jsx("sub", null, children);
  }
  if (underline) {
    children = core.jsx("u", null, children);
  }
  return core.jsx("span", attributes, children);
};
const renderLeaf = props => {
  return core.jsx(Leaf, props);
};

function withSoftBreaks(editor) {
  // TODO: should soft breaks only work in particular places
  editor.insertSoftBreak = () => {
    slate.Transforms.insertText(editor, '\n');
  };
  return editor;
}

const shortcuts = {
  '...': '…',
  '-->': '→',
  '->': '→',
  '<-': '←',
  '<--': '←',
  '--': '–'
};
function withShortcuts(editor) {
  const {
    insertText
  } = editor;
  editor.insertText = text => {
    insertText(text);
    if (text === ' ' && editor.selection && slate.Range.isCollapsed(editor.selection)) {
      const selectionPoint = editor.selection.anchor;
      const ancestorBlock = slate.Editor.above(editor, {
        match: node => slate.Editor.isBlock(editor, node)
      });
      if (ancestorBlock) {
        Object.keys(shortcuts).forEach(shortcut => {
          const pointBefore = slate.Editor.before(editor, selectionPoint, {
            unit: 'character',
            distance: shortcut.length + 1
          });
          if (pointBefore && slate.Path.isDescendant(pointBefore.path, ancestorBlock[1])) {
            const range = {
              anchor: selectionPoint,
              focus: pointBefore
            };
            const str = slate.Editor.string(editor, range);
            if (str.slice(0, shortcut.length) === shortcut) {
              editor.history.undos.push([]);
              slate.Transforms.select(editor, range);
              editor.insertText(shortcuts[shortcut] + ' ');
            }
          }
        });
      }
    }
  };
  return editor;
}

function withBlockMarkdownShortcuts(documentFeatures, componentBlocks, editor) {
  const {
    insertText
  } = editor;
  const shortcuts = Object.create(null);
  const editorDocumentFeaturesForNormalizationToCheck = _objectSpread(_objectSpread({}, documentFeatures), {}, {
    relationships: true
  });
  let addShortcut = function (text, insert, shouldBeEnabledInComponentBlock) {
    let type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'paragraph';
    if (!shouldBeEnabledInComponentBlock(editorDocumentFeaturesForNormalizationToCheck)) return;
    const trigger = text[text.length - 1];
    if (!shortcuts[trigger]) {
      shortcuts[trigger] = Object.create(null);
    }
    shortcuts[trigger][text] = {
      insert,
      type,
      shouldBeEnabledInComponentBlock
    };
  };
  addShortcut('1. ', () => {
    slate.Transforms.wrapNodes(editor, {
      type: 'ordered-list',
      children: []
    }, {
      match: n => slate.Editor.isBlock(editor, n)
    });
  }, features => features.formatting.listTypes.ordered);
  addShortcut('- ', () => {
    slate.Transforms.wrapNodes(editor, {
      type: 'unordered-list',
      children: []
    }, {
      match: n => slate.Editor.isBlock(editor, n)
    });
  }, features => features.formatting.listTypes.unordered);
  addShortcut('* ', () => {
    slate.Transforms.wrapNodes(editor, {
      type: 'unordered-list',
      children: []
    }, {
      match: n => slate.Editor.isBlock(editor, n)
    });
  }, features => features.formatting.listTypes.unordered);
  documentFeatures.formatting.headingLevels.forEach(level => {
    addShortcut('#'.repeat(level) + ' ', () => {
      slate.Transforms.setNodes(editor, {
        type: 'heading',
        level
      }, {
        match: node => node.type === 'paragraph' || node.type === 'heading'
      });
    }, features => features.formatting.headingLevels.includes(level), 'heading-or-paragraph');
  });
  addShortcut('> ', () => {
    slate.Transforms.wrapNodes(editor, {
      type: 'blockquote',
      children: []
    }, {
      match: node => node.type === 'paragraph'
    });
  }, features => features.formatting.blockTypes.blockquote);
  addShortcut('```', () => {
    slate.Transforms.wrapNodes(editor, {
      type: 'code',
      children: []
    }, {
      match: node => node.type === 'paragraph'
    });
  }, features => features.formatting.blockTypes.code);
  addShortcut('---', () => {
    insertDivider(editor);
  }, features => features.dividers);
  editor.insertText = text => {
    insertText(text);
    const shortcutsForTrigger = shortcuts[text];
    if (shortcutsForTrigger && editor.selection && slate.Range.isCollapsed(editor.selection)) {
      const {
        anchor
      } = editor.selection;
      const block = slate.Editor.above(editor, {
        match: node => slate.Editor.isBlock(editor, node)
      });
      if (!block || block[0].type !== 'paragraph' && block[0].type !== 'heading') return;
      const start = slate.Editor.start(editor, block[1]);
      const range = {
        anchor,
        focus: start
      };
      const shortcutText = slate.Editor.string(editor, range);
      const shortcut = shortcutsForTrigger[shortcutText];
      if (!shortcut || shortcut.type === 'paragraph' && block[0].type !== 'paragraph') {
        return;
      }
      const locationDocumentFeatures = getAncestorComponentChildFieldDocumentFeatures(editor, documentFeatures, componentBlocks);
      if (locationDocumentFeatures && (locationDocumentFeatures.kind === 'inline' || !shortcut.shouldBeEnabledInComponentBlock(locationDocumentFeatures.documentFeatures))) {
        return;
      }
      // so that this starts a new undo group
      editor.history.undos.push([]);
      slate.Transforms.select(editor, range);
      slate.Transforms.delete(editor);
      shortcut.insert();
    }
  };
  return editor;
}

// a v important note
// marks in the markdown ast/html are represented quite differently to how they are in slate
// if you had the markdown **something https://keystonejs.com something**
// the bold node is the parent of the link node
// but in slate, marks are only represented on text nodes

const currentlyActiveMarks = new Set();
const currentlyDisabledMarks = new Set();
let currentLink = null;
function addMarkToChildren(mark, cb) {
  const wasPreviouslyActive = currentlyActiveMarks.has(mark);
  currentlyActiveMarks.add(mark);
  try {
    return cb();
  } finally {
    if (!wasPreviouslyActive) {
      currentlyActiveMarks.delete(mark);
    }
  }
}
function setLinkForChildren(href, cb) {
  // we'll only use the outer link
  if (currentLink !== null) {
    return cb();
  }
  currentLink = href;
  try {
    return cb();
  } finally {
    currentLink = null;
  }
}
function addMarksToChildren(marks, cb) {
  const marksToRemove = new Set();
  for (const mark of marks) {
    if (!currentlyActiveMarks.has(mark)) {
      marksToRemove.add(mark);
    }
    currentlyActiveMarks.add(mark);
  }
  try {
    return cb();
  } finally {
    for (const mark of marksToRemove) {
      currentlyActiveMarks.delete(mark);
    }
  }
}
function forceDisableMarkForChildren(mark, cb) {
  const wasPreviouslyDisabled = currentlyDisabledMarks.has(mark);
  currentlyDisabledMarks.add(mark);
  try {
    return cb();
  } finally {
    if (!wasPreviouslyDisabled) {
      currentlyDisabledMarks.delete(mark);
    }
  }
}

/**
 * This type is more strict than `Element & { type: 'link'; }` because `children`
 * is constrained to only contain Text nodes. This can't be assumed generally around the editor
 * (because of inline relationships or nested links(which are normalized away but the editor needs to not break if it happens))
 * but where this type is used, we're only going to allow links to contain Text and that's important
 * so that we know a block will never be inside an inline because Slate gets unhappy when that happens
 * (really the link inline should probably be a mark rather than an inline,
 * non-void inlines are probably always bad but that would imply changing the document
 * structure which would be such unnecessary breakage)
 */

function getInlineNodes(text) {
  const node = {
    text
  };
  for (const mark of currentlyActiveMarks) {
    if (!currentlyDisabledMarks.has(mark)) {
      node[mark] = true;
    }
  }
  if (currentLink !== null) {
    return [{
      text: ''
    }, {
      type: 'link',
      href: currentLink,
      children: [node]
    }, {
      text: ''
    }];
  }
  return [node];
}

// very loosely based on https://github.com/ianstormtaylor/slate/blob/d22c76ae1313fe82111317417912a2670e73f5c9/site/examples/paste-html.tsx
function getAlignmentFromElement(element) {
  const parent = element.parentElement;
  // confluence
  const attribute = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-align');
  // note: we don't show html that confluence would parse as alignment
  // we could change that but meh
  // (they match on div.fabric-editor-block-mark with data-align)
  if (attribute === 'center' || attribute === 'end') {
    return attribute;
  }
  if (element instanceof HTMLElement) {
    // Google docs
    const textAlign = element.style.textAlign;
    if (textAlign === 'center') {
      return 'center';
    }
    // TODO: RTL things?
    if (textAlign === 'right' || textAlign === 'end') {
      return 'end';
    }
  }
}
const headings = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6
};
const TEXT_TAGS = {
  CODE: 'code',
  DEL: 'strikethrough',
  S: 'strikethrough',
  STRIKE: 'strikethrough',
  EM: 'italic',
  I: 'italic',
  STRONG: 'bold',
  U: 'underline',
  SUP: 'superscript',
  SUB: 'subscript',
  KBD: 'keyboard'
};
function marksFromElementAttributes(element) {
  const marks = new Set();
  const style = element.style;
  const {
    nodeName
  } = element;
  const markFromNodeName = TEXT_TAGS[nodeName];
  if (markFromNodeName) {
    marks.add(markFromNodeName);
  }
  const {
    fontWeight,
    textDecoration,
    verticalAlign
  } = style;
  if (textDecoration === 'underline') {
    marks.add('underline');
  } else if (textDecoration === 'line-through') {
    marks.add('strikethrough');
  }
  // confluence
  if (nodeName === 'SPAN' && element.classList.contains('code')) {
    marks.add('code');
  }
  // Google Docs does weird things with <b>
  if (nodeName === 'B' && fontWeight !== 'normal') {
    marks.add('bold');
  } else if (typeof fontWeight === 'string' && (fontWeight === 'bold' || fontWeight === 'bolder' || fontWeight === '1000' || /^[5-9]\d{2}$/.test(fontWeight))) {
    marks.add('bold');
  }
  if (style.fontStyle === 'italic') {
    marks.add('italic');
  }
  // Google Docs uses vertical align for subscript and superscript instead of <sup> and <sub>
  if (verticalAlign === 'super') {
    marks.add('superscript');
  } else if (verticalAlign === 'sub') {
    marks.add('subscript');
  }
  return marks;
}
function deserializeHTML(html) {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  return fixNodesForBlockChildren(deserializeNodes(parsed.body.childNodes));
}
function deserializeHTMLNode(el) {
  if (!(el instanceof globalThis.HTMLElement)) {
    const text = el.textContent;
    if (!text) {
      return [];
    }
    return getInlineNodes(text);
  }
  if (el.nodeName === 'BR') {
    return getInlineNodes('\n');
  }
  if (el.nodeName === 'IMG') {
    const alt = el.getAttribute('alt');
    return getInlineNodes(alt !== null && alt !== void 0 ? alt : '');
  }
  if (el.nodeName === 'HR') {
    return [{
      type: 'divider',
      children: [{
        text: ''
      }]
    }];
  }
  const marks = marksFromElementAttributes(el);

  // Dropbox Paper displays blockquotes as lists for some reason
  if (el.classList.contains('listtype-quote')) {
    marks.delete('italic');
    return addMarksToChildren(marks, () => [{
      type: 'blockquote',
      children: fixNodesForBlockChildren(deserializeNodes(el.childNodes))
    }]);
  }
  return addMarksToChildren(marks, () => {
    const {
      nodeName
    } = el;
    if (nodeName === 'A') {
      const href = el.getAttribute('href');
      if (href) {
        return setLinkForChildren(href, () => forceDisableMarkForChildren('underline', () => deserializeNodes(el.childNodes)));
      }
    }
    if (nodeName === 'PRE' && el.textContent) {
      return [{
        type: 'code',
        children: [{
          text: el.textContent || ''
        }]
      }];
    }
    const deserialized = deserializeNodes(el.childNodes);
    const children = fixNodesForBlockChildren(deserialized);
    if (nodeName === 'LI') {
      let nestedList;
      const listItemContent = {
        type: 'list-item-content',
        children: children.filter(node => {
          if (nestedList === undefined && (node.type === 'ordered-list' || node.type === 'unordered-list')) {
            nestedList = node;
            return false;
          }
          return true;
        })
      };
      const listItemChildren = nestedList ? [listItemContent, nestedList] : [listItemContent];
      return [{
        type: 'list-item',
        children: listItemChildren
      }];
    }
    if (nodeName === 'P') {
      return [{
        type: 'paragraph',
        textAlign: getAlignmentFromElement(el),
        children
      }];
    }
    const headingLevel = headings[nodeName];
    if (typeof headingLevel === 'number') {
      return [{
        type: 'heading',
        level: headingLevel,
        textAlign: getAlignmentFromElement(el),
        children
      }];
    }
    if (nodeName === 'BLOCKQUOTE') {
      return [{
        type: 'blockquote',
        children
      }];
    }
    if (nodeName === 'OL') {
      return [{
        type: 'ordered-list',
        children
      }];
    }
    if (nodeName === 'UL') {
      return [{
        type: 'unordered-list',
        children
      }];
    }
    if (nodeName === 'DIV' && !isBlock(children[0])) {
      return [{
        type: 'paragraph',
        children
      }];
    }
    return deserialized;
  });
}
function deserializeNodes(nodes) {
  const outputNodes = [];
  for (const node of nodes) {
    outputNodes.push(...deserializeHTMLNode(node));
  }
  return outputNodes;
}
function fixNodesForBlockChildren(deserializedNodes) {
  if (!deserializedNodes.length) {
    // Slate also gets unhappy if an element has no children
    // the empty text nodes will get normalized away if they're not needed
    return [{
      text: ''
    }];
  }
  if (deserializedNodes.some(isBlock)) {
    const result = [];
    let queuedInlines = [];
    const flushInlines = () => {
      if (queuedInlines.length) {
        result.push({
          type: 'paragraph',
          children: queuedInlines
        });
        queuedInlines = [];
      }
    };
    for (const node of deserializedNodes) {
      if (isBlock(node)) {
        flushInlines();
        result.push(node);
        continue;
      }
      // we want to ignore whitespace between block level elements
      // useful info about whitespace in html:
      // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
      if (slate.Node.string(node).trim() !== '') {
        queuedInlines.push(node);
      }
    }
    flushInlines();
    return result;
  }
  return deserializedNodes;
}

const markdownConfig = {
  mdastExtensions: [autoLinkLiteralFromMarkdownExtension__default["default"], gfmStrikethroughFromMarkdownExtension__default["default"]],
  extensions: [autoLinkLiteralMarkdownSyntax__default["default"], gfmStrikethroughMarkdownSyntax__default["default"]()]
};
function deserializeMarkdown(markdown) {
  const root = mdASTUtilFromMarkdown__default["default"](markdown, markdownConfig);
  let nodes = root.children;
  if (nodes.length === 1 && nodes[0].type === 'paragraph') {
    nodes = nodes[0].children;
  }
  return deserializeChildren(nodes, markdown);
}
function deserializeChildren(nodes, input) {
  const outputNodes = [];
  for (const node of nodes) {
    const result = deserializeMarkdownNode(node, input);
    if (result.length) {
      outputNodes.push(...result);
    }
  }
  if (!outputNodes.length) {
    outputNodes.push({
      text: ''
    });
  }
  return outputNodes;
}
function deserializeMarkdownNode(node, input) {
  switch (node.type) {
    case 'blockquote':
      {
        return [{
          type: 'blockquote',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'link':
      {
        // arguably this could just return a link node rather than use setLinkForChildren since the children _should_ only be inlines
        // but rather than relying on the markdown parser we use being correct in this way since it isn't nicely codified in types
        // let's be safe since we already have the code to do it the safer way because of html pasting
        return setLinkForChildren(node.url, () => deserializeChildren(node.children, input));
      }
    case 'code':
      {
        return [{
          type: 'code',
          children: [{
            text: node.value
          }]
        }];
      }
    case 'paragraph':
      {
        return [{
          type: 'paragraph',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'heading':
      {
        return [{
          type: 'heading',
          level: node.depth,
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'list':
      {
        return [{
          type: node.ordered ? 'ordered-list' : 'unordered-list',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'listItem':
      {
        return [{
          type: 'list-item',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'thematicBreak':
      {
        return [{
          type: 'divider',
          children: [{
            text: ''
          }]
        }];
      }
    case 'break':
      {
        return getInlineNodes('\n');
      }
    case 'delete':
      {
        return addMarkToChildren('strikethrough', () => deserializeChildren(node.children, input));
      }
    case 'strong':
      {
        return addMarkToChildren('bold', () => deserializeChildren(node.children, input));
      }
    case 'emphasis':
      {
        return addMarkToChildren('italic', () => deserializeChildren(node.children, input));
      }
    case 'inlineCode':
      {
        return addMarkToChildren('code', () => getInlineNodes(node.value));
      }
    case 'text':
      {
        return getInlineNodes(node.value);
      }
  }
  return getInlineNodes(input.slice(node.position.start.offset, node.position.end.offset));
}

const urlPattern = /https?:\/\//;
function insertFragmentButDifferent(editor, nodes) {
  if (slate.Editor.isBlock(editor, nodes[0])) {
    formFromPreview.insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes);
  } else {
    slate.Transforms.insertFragment(editor, nodes);
  }
}
function withPasting(editor) {
  const {
    insertData,
    setFragmentData
  } = editor;
  editor.setFragmentData = data => {
    if (editor.selection) {
      data.setData('application/x-keystone-document-editor', 'true');
    }
    setFragmentData(data);
  };
  editor.insertData = data => {
    // this exists because behind the scenes, Slate sets the slate document
    // on the data transfer, this is great because it means when you copy and paste
    // something in the editor or between editors, it'll use the actual Slate data
    // rather than the serialized html so component blocks and etc. will work fine
    // we're setting application/x-keystone-document-editor
    // though so that we only accept slate data from Keystone's editor
    // because other editors will likely have a different structure
    // so we'll rely on the html deserialization instead
    // (note that yes, we do call insertData at the end of this function
    // which is where Slate's logic will run, it'll never do anything there though
    // since anything that will have slate data will also have text/html which we handle
    // before we call insertData)
    // TODO: handle the case of copying between editors with different components blocks
    // (right now, things will blow up in most cases)
    if (data.getData('application/x-keystone-document-editor') === 'true') {
      insertData(data);
      return;
    }
    const blockAbove = slate.Editor.above(editor, {
      match: node => slate.Editor.isBlock(editor, node)
    });
    if ((blockAbove === null || blockAbove === void 0 ? void 0 : blockAbove[0].type) === 'code') {
      const plain = data.getData('text/plain');
      editor.insertText(plain);
      return;
    }
    let vsCodeEditorData = data.getData('vscode-editor-data');
    if (vsCodeEditorData) {
      try {
        const vsCodeData = JSON.parse(vsCodeEditorData);
        if ((vsCodeData === null || vsCodeData === void 0 ? void 0 : vsCodeData.mode) === 'markdown' || (vsCodeData === null || vsCodeData === void 0 ? void 0 : vsCodeData.mode) === 'mdx') {
          const plain = data.getData('text/plain');
          if (plain) {
            const fragment = deserializeMarkdown(plain);
            insertFragmentButDifferent(editor, fragment);
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    const plain = data.getData('text/plain');
    if (
    // isValidURL is a bit more permissive than a user might expect
    // so for pasting, we'll constrain it to starting with https:// or http://
    urlPattern.test(plain) && api.isValidURL(plain) && editor.selection && !slate.Range.isCollapsed(editor.selection) &&
    // we only want to turn the selected text into a link if the selection is within the same block
    slate.Editor.above(editor, {
      match: node => slate.Editor.isBlock(editor, node) && !slate.Editor.isBlock(editor, node.children[0])
    }) &&
    // and there is only text(potentially with marks) in the selection
    // no other links or inline relationships
    slate.Editor.nodes(editor, {
      match: node => slate.Editor.isInline(editor, node)
    }).next().done) {
      slate.Transforms.wrapNodes(editor, {
        type: 'link',
        href: plain,
        children: []
      }, {
        split: true
      });
      return;
    }
    const html = data.getData('text/html');
    if (html) {
      const fragment = deserializeHTML(html);
      insertFragmentButDifferent(editor, fragment);
      return;
    }
    if (plain) {
      const fragment = deserializeMarkdown(plain);
      insertFragmentButDifferent(editor, fragment);
      return;
    }
    insertData(data);
  };
  return editor;
}

const _excluded = ["onChange", "value", "componentBlocks", "relationships", "documentFeatures", "initialExpanded"];
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline'
};
function isMarkActive(editor, mark) {
  const marks = slate.Editor.marks(editor);
  if (marks !== null && marks !== void 0 && marks[mark]) {
    return true;
  }
  // see the stuff about marks in toolbar-state for why this is here
  for (const entry of slate.Editor.nodes(editor, {
    match: slate.Text.isText
  })) {
    if (entry[0][mark]) {
      return true;
    }
  }
  return false;
}
const getKeyDownHandler = editor => event => {
  if (event.defaultPrevented) return;
  for (const hotkey in HOTKEYS) {
    if (isHotkey__default["default"](hotkey, event.nativeEvent)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      const isActive = isMarkActive(editor, mark);
      if (isActive) {
        slate.Editor.removeMark(editor, mark);
      } else {
        slate.Editor.addMark(editor, mark, true);
      }
      return;
    }
  }
  if (isHotkey__default["default"]('mod+\\', event.nativeEvent)) {
    formFromPreview.clearFormatting(editor);
    return;
  }
  if (isHotkey__default["default"]('mod+k', event.nativeEvent)) {
    event.preventDefault();
    wrapLink(editor, '');
    return;
  }
  if (event.key === 'Tab') {
    const didAction = event.shiftKey ? unnestList(editor) : nestList(editor);
    if (didAction) {
      event.preventDefault();
      return;
    }
  }
  if (event.key === 'Tab' && editor.selection) {
    const layoutArea = slate.Editor.above(editor, {
      match: node => node.type === 'layout-area'
    });
    if (layoutArea) {
      const layoutAreaToEnter = event.shiftKey ? slate.Editor.before(editor, layoutArea[1], {
        unit: 'block'
      }) : slate.Editor.after(editor, layoutArea[1], {
        unit: 'block'
      });
      slate.Transforms.setSelection(editor, {
        anchor: layoutAreaToEnter,
        focus: layoutAreaToEnter
      });
      event.preventDefault();
    }
  }
};
function createDocumentEditor(documentFeatures, componentBlocks, relationships) {
  return withPasting(withSoftBreaks(withBlocksSchema(withLink(documentFeatures, componentBlocks, withList(withHeading(withRelationship(withInsertMenu(withComponentBlocks(componentBlocks, documentFeatures, relationships, withParagraphs(withShortcuts(withDivider(withLayouts(withMarks(documentFeatures, componentBlocks, withCodeBlock(withBlockMarkdownShortcuts(documentFeatures, componentBlocks, withBlockquote(withDocumentFeaturesNormalization(documentFeatures, relationships, slateHistory.withHistory(slateReact.withReact(slate.createEditor()))))))))))))))))))));
}
function DocumentEditor(_ref) {
  let {
      onChange,
      value,
      componentBlocks,
      relationships,
      documentFeatures,
      initialExpanded = false
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    radii,
    colors,
    spacing,
    fields
  } = core.useTheme();
  const [expanded, setExpanded] = React.useState(initialExpanded);
  const editor = React.useMemo(() => createDocumentEditor(documentFeatures, componentBlocks, relationships), [documentFeatures, componentBlocks, relationships]);
  return core.jsx("div", {
    css: {
      border: `1px solid ${colors.border}`,
      borderRadius: radii.small
    }
  }, core.jsx(DocumentEditorProvider, {
    componentBlocks: componentBlocks,
    documentFeatures: documentFeatures,
    relationships: relationships,
    editor: editor,
    value: value,
    onChange: value => {
      onChange === null || onChange === void 0 ? void 0 : onChange(value);
      // this fixes a strange issue in Safari where the selection stays inside of the editor
      // after a blur event happens but the selection is still in the editor
      // so the cursor is visually in the wrong place and it inserts text backwards
      const selection = window.getSelection();
      if (selection && !slateReact.ReactEditor.isFocused(editor)) {
        const editorNode = slateReact.ReactEditor.toDOMNode(editor, editor);
        if (selection.anchorNode === editorNode) {
          slateReact.ReactEditor.focus(editor);
        }
      }
    }
  }, React.useMemo(() => onChange !== undefined && core.jsx(Toolbar, {
    documentFeatures: documentFeatures,
    viewState: {
      expanded,
      toggle: () => {
        setExpanded(v => !v);
      }
    }
  }), [expanded, documentFeatures, onChange]), core.jsx(DocumentEditorEditable, _extends({
    css: [{
      borderRadius: 'inherit',
      background: fields.focus.inputBackground,
      borderColor: fields.inputBorderColor,
      paddingLeft: spacing.medium,
      paddingRight: spacing.medium,
      minHeight: 120,
      scrollbarGutter: 'stable',
      // the !important is necessary to override the width set by resizing as an inline style
      height: expanded ? 'auto !important' : 224,
      resize: expanded ? undefined : 'vertical',
      overflowY: 'auto'
    }]
  }, props, {
    readOnly: onChange === undefined
  })),
  // for debugging
  false ));
}
function DocumentEditorProvider(_ref2) {
  let {
    children,
    editor,
    onChange,
    value,
    componentBlocks,
    documentFeatures,
    relationships
  } = _ref2;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const identity = React.useMemo(() => Math.random().toString(36), [editor]);
  return core.jsx(slateReact.Slate
  // this fixes issues with Slate crashing when a fast refresh occcurs
  , {
    key: identity,
    editor: editor,
    value: value,
    onChange: value => {
      onChange(value);
      // this fixes a strange issue in Safari where the selection stays inside of the editor
      // after a blur event happens but the selection is still in the editor
      // so the cursor is visually in the wrong place and it inserts text backwards
      const selection = window.getSelection();
      if (selection && !slateReact.ReactEditor.isFocused(editor)) {
        const editorNode = slateReact.ReactEditor.toDOMNode(editor, editor);
        if (selection.anchorNode === editorNode) {
          slateReact.ReactEditor.focus(editor);
        }
      }
    }
  }, core.jsx(ToolbarStateProvider, {
    componentBlocks: componentBlocks,
    editorDocumentFeatures: documentFeatures,
    relationships: relationships
  }, children));
}
function DocumentEditorEditable(props) {
  const editor = slateReact.useSlate();
  const componentBlocks = React.useContext(ComponentBlockContext);
  const onKeyDown = React.useMemo(() => getKeyDownHandler(editor), [editor]);
  return core.jsx(slateReact.Editable, _extends({
    decorate: React.useCallback(_ref3 => {
      let [node, path] = _ref3;
      let decorations = [];
      if (node.type === 'component-block') {
        if (node.children.length === 1 && slate.Element.isElement(node.children[0]) && node.children[0].type === 'component-inline-prop' && node.children[0].propPath === undefined) {
          return decorations;
        }
        node.children.forEach((child, index) => {
          if (slate.Node.string(child) === '' && slate.Element.isElement(child) && (child.type === 'component-block-prop' || child.type === 'component-inline-prop') && child.propPath !== undefined) {
            const start = slate.Editor.start(editor, [...path, index]);
            const placeholder = formFromPreview.getPlaceholderTextForPropPath(child.propPath, componentBlocks[node.component].schema, node.props);
            if (placeholder) {
              decorations.push({
                placeholder,
                anchor: start,
                focus: start
              });
            }
          }
        });
      }
      return decorations;
    }, [editor, componentBlocks]),
    css: styles,
    onKeyDown: onKeyDown,
    renderElement: renderElement,
    renderLeaf: renderLeaf
  }, props));
}
const orderedListStyles = ['lower-roman', 'decimal', 'lower-alpha'];
const unorderedListStyles = ['square', 'disc', 'circle'];
let styles = {
  flex: 1
};
let listDepth = 10;
while (listDepth--) {
  let arr = Array.from({
    length: listDepth
  });
  if (arr.length) {
    styles[arr.map(() => `ol`).join(' ')] = {
      listStyle: orderedListStyles[listDepth % 3]
    };
    styles[arr.map(() => `ul`).join(' ')] = {
      listStyle: unorderedListStyles[listDepth % 3]
    };
  }
}
const blockquoteChildren = ['paragraph', 'code', 'heading', 'ordered-list', 'unordered-list', 'divider'];
const paragraphLike = [...blockquoteChildren, 'blockquote'];
const insideOfLayouts = [...paragraphLike, 'component-block'];
function blockContainer(args) {
  return {
    kind: 'blocks',
    allowedChildren: new Set(args.allowedChildren),
    blockToWrapInlinesIn: args.allowedChildren[0],
    invalidPositionHandleMode: args.invalidPositionHandleMode
  };
}
function inlineContainer(args) {
  return {
    kind: 'inlines',
    invalidPositionHandleMode: args.invalidPositionHandleMode
  };
}

// a user land version of https://github.com/microsoft/TypeScript/issues/47920
function satisfies() {
  return function (value) {
    return value;
  };
}
const editorSchema = satisfies()({
  editor: blockContainer({
    allowedChildren: [...insideOfLayouts, 'layout'],
    invalidPositionHandleMode: 'move'
  }),
  layout: blockContainer({
    allowedChildren: ['layout-area'],
    invalidPositionHandleMode: 'move'
  }),
  'layout-area': blockContainer({
    allowedChildren: insideOfLayouts,
    invalidPositionHandleMode: 'unwrap'
  }),
  blockquote: blockContainer({
    allowedChildren: blockquoteChildren,
    invalidPositionHandleMode: 'move'
  }),
  paragraph: inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  code: inlineContainer({
    invalidPositionHandleMode: 'move'
  }),
  divider: inlineContainer({
    invalidPositionHandleMode: 'move'
  }),
  heading: inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  'component-block': blockContainer({
    allowedChildren: ['component-block-prop', 'component-inline-prop'],
    invalidPositionHandleMode: 'move'
  }),
  'component-inline-prop': inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  'component-block-prop': blockContainer({
    allowedChildren: paragraphLike,
    invalidPositionHandleMode: 'unwrap'
  }),
  'ordered-list': blockContainer({
    allowedChildren: ['list-item'],
    invalidPositionHandleMode: 'move'
  }),
  'unordered-list': blockContainer({
    allowedChildren: ['list-item'],
    invalidPositionHandleMode: 'move'
  }),
  'list-item': blockContainer({
    allowedChildren: ['list-item-content', 'ordered-list', 'unordered-list'],
    invalidPositionHandleMode: 'unwrap'
  }),
  'list-item-content': inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  })
});
const inlineContainerTypes = new Set(Object.entries(editorSchema).filter(_ref4 => {
  let [, value] = _ref4;
  return value.kind === 'inlines';
}).map(_ref5 => {
  let [type] = _ref5;
  return type;
}));
function isInlineContainer(node) {
  return node.type !== undefined && inlineContainerTypes.has(node.type);
}
const blockTypes = new Set(Object.keys(editorSchema).filter(x => x !== 'editor'));
function isBlock(node) {
  return blockTypes.has(node.type);
}
function withBlocksSchema(editor) {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = _ref6 => {
    let [node, path] = _ref6;
    if (!slate.Text.isText(node) && node.type !== 'link' && node.type !== 'relationship') {
      const nodeType = slate.Editor.isEditor(node) ? 'editor' : node.type;
      if (typeof nodeType !== 'string' || editorSchema[nodeType] === undefined) {
        slate.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      const info = editorSchema[nodeType];
      if (info.kind === 'blocks' && node.children.length !== 0 && node.children.every(child => !slate.Editor.isBlock(editor, child))) {
        slate.Transforms.wrapNodes(editor, {
          type: info.blockToWrapInlinesIn,
          children: []
        }, {
          at: path,
          match: node => !slate.Editor.isBlock(editor, node)
        });
        return;
      }
      for (const [index, childNode] of node.children.entries()) {
        const childPath = [...path, index];
        if (info.kind === 'inlines') {
          if (!slate.Text.isText(childNode) && !slate.Editor.isInline(editor, childNode)) {
            handleNodeInInvalidPosition(editor, [childNode, childPath], path);
            return;
          }
        } else {
          if (!slate.Editor.isBlock(editor, childNode) ||
          // these checks are implicit in Editor.isBlock
          // but that isn't encoded in types so these will make TS happy
          childNode.type === 'link' || childNode.type === 'relationship') {
            slate.Transforms.wrapNodes(editor, {
              type: info.blockToWrapInlinesIn,
              children: []
            }, {
              at: childPath
            });
            return;
          }
          if (!info.allowedChildren.has(childNode.type)) {
            handleNodeInInvalidPosition(editor, [childNode, childPath], path);
            return;
          }
        }
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}
function handleNodeInInvalidPosition(editor, _ref7, parentPath) {
  let [node, path] = _ref7;
  const nodeType = node.type;
  const childNodeInfo = editorSchema[nodeType];
  // the parent of a block will never be an inline so this casting is okay
  const parentNode = slate.Node.get(editor, parentPath);
  const parentNodeType = slate.Editor.isEditor(parentNode) ? 'editor' : parentNode.type;
  const parentNodeInfo = editorSchema[parentNodeType];
  if (!childNodeInfo || childNodeInfo.invalidPositionHandleMode === 'unwrap') {
    if (parentNodeInfo.kind === 'blocks' && parentNodeInfo.blockToWrapInlinesIn) {
      slate.Transforms.setNodes(editor, _objectSpread({
        type: parentNodeInfo.blockToWrapInlinesIn
      }, Object.fromEntries(Object.keys(node).filter(key => key !== 'type' && key !== 'children').map(key => [key, null]))), {
        at: path
      });
      return;
    }
    slate.Transforms.unwrapNodes(editor, {
      at: path
    });
    return;
  }
  const info = editorSchema[parentNode.type || 'editor'];
  if ((info === null || info === void 0 ? void 0 : info.kind) === 'blocks' && info.allowedChildren.has(nodeType)) {
    if (parentPath.length === 0) {
      slate.Transforms.moveNodes(editor, {
        at: path,
        to: [path[0] + 1]
      });
    } else {
      slate.Transforms.moveNodes(editor, {
        at: path,
        to: slate.Path.next(parentPath)
      });
    }
    return;
  }
  if (slate.Editor.isEditor(parentNode)) {
    slate.Transforms.moveNodes(editor, {
      at: path,
      to: [path[0] + 1]
    });
    slate.Transforms.unwrapNodes(editor, {
      at: [path[0] + 1]
    });
    return;
  }
  handleNodeInInvalidPosition(editor, [node, path], parentPath.slice(0, -1));
}

// to print the editor schema in Graphviz if you want to visualize it
// function printEditorSchema(editorSchema: EditorSchema) {
//   return `digraph G {
//   concentrate=true;
//   ${Object.keys(editorSchema)
//     .map(key => {
//       let val = editorSchema[key];
//       if (val.kind === 'inlines') {
//         return `"${key}" -> inlines`;
//       }
//       if (val.kind === 'blocks') {
//         return `"${key}" -> {${[...val.allowedChildren].map(x => JSON.stringify(x)).join(' ')}}`;
//       }
//     })
//     .join('\n  ')}
// }`;
// }

exports.DocumentEditor = DocumentEditor;
exports.createDocumentEditor = createDocumentEditor;
