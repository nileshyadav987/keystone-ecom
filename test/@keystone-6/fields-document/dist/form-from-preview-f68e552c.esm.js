import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _extends from '@babel/runtime/helpers/esm/extends';
import { useKeystone } from '@keystone-6/core/admin-ui/context';
import { RelationshipSelect } from '@keystone-6/core/fields/types/relationship/views/RelationshipSelect';
import { Button } from '@keystone-ui/button';
import { jsx, Stack } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { PlusCircleIcon } from '@keystone-ui/icons/icons/PlusCircleIcon';
import { AlertDialog } from '@keystone-ui/modals';
import React, { useState, useRef, useEffect, useCallback, useContext, memo, useMemo } from 'react';
import { O as OrderableList, a as OrderableItem, D as DragHandle, R as RemoveButton } from './orderable-ff385078.esm.js';
import { Editor, Transforms, Text, Path, Node } from 'slate';
import { ReactEditor } from 'slate-react';

const allMarks = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript', 'keyboard'];
const isElementActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });
  return !!match;
};
function clearFormatting(editor) {
  Transforms.unwrapNodes(editor, {
    match: node => node.type === 'heading' || node.type === 'blockquote' || node.type === 'code'
  });
  Transforms.unsetNodes(editor, allMarks, {
    match: Text.isText
  });
}
function moveChildren(editor, parent, to) {
  let shouldMoveNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => true;
  const parentPath = Path.isPath(parent) ? parent : parent[1];
  const parentNode = Path.isPath(parent) ? Node.get(editor, parentPath) : parent[0];
  if (!Editor.isBlock(editor, parentNode)) return;
  for (let i = parentNode.children.length - 1; i >= 0; i--) {
    if (shouldMoveNode(parentNode.children[i])) {
      const childPath = [...parentPath, i];
      Transforms.moveNodes(editor, {
        at: childPath,
        to
      });
    }
  }
}

// this ensures that when changes happen, they are immediately shown
// this stops the problem of a cursor resetting to the end when a change is made
// because the changes are applied asynchronously
function useElementWithSetNodes(editor, element) {
  const [state, setState] = useState({
    element,
    elementWithChanges: element
  });
  if (state.element !== element) {
    setState({
      element,
      elementWithChanges: element
    });
  }
  const elementRef = useRef(element);
  useEffect(() => {
    elementRef.current = element;
  });
  const setNodes = useCallback(changesOrCallback => {
    const currentElement = elementRef.current;
    const changes = typeof changesOrCallback === 'function' ? changesOrCallback(currentElement) : changesOrCallback;
    Transforms.setNodes(editor, changes, {
      at: ReactEditor.findPath(editor, currentElement)
    });
    setState({
      element: currentElement,
      elementWithChanges: _objectSpread(_objectSpread({}, currentElement), changes)
    });
  }, [editor]);
  return [state.elementWithChanges, setNodes];
}
function useEventCallback(callback) {
  const callbackRef = useRef(callback);
  const cb = useCallback(function () {
    return callbackRef.current(...arguments);
  }, []);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return cb;
}
const IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const modifierKeyText = IS_MAC ? '⌘' : 'Ctrl';
const ForceValidationContext = /*#__PURE__*/React.createContext(false);
const ForceValidationProvider = ForceValidationContext.Provider;
function useForceValidation() {
  return useContext(ForceValidationContext);
}
function insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes) {
  var _pathRefForEmptyNodeA;
  let pathRefForEmptyNodeAtCursor;
  const entry = Editor.above(editor, {
    match: node => node.type === 'heading' || node.type === 'paragraph'
  });
  if (entry && Node.string(entry[0]) === '') {
    pathRefForEmptyNodeAtCursor = Editor.pathRef(editor, entry[1]);
  }
  Transforms.insertNodes(editor, nodes);
  let path = (_pathRefForEmptyNodeA = pathRefForEmptyNodeAtCursor) === null || _pathRefForEmptyNodeA === void 0 ? void 0 : _pathRefForEmptyNodeA.unref();
  if (path) {
    Transforms.removeNodes(editor, {
      at: path
    });
    // even though the selection is in the right place after the removeNodes
    // for some reason the editor blurs so we need to focus it again
    ReactEditor.focus(editor);
  }
}

/**
 * This is equivalent to Editor.after except that it ignores points that have no content
 * like the point in a void text node, an empty text node and the last point in a text node
 */
// TODO: this would probably break if you were trying to get the last point in the editor?
function EditorAfterButIgnoringingPointsWithNoContent(editor, at) {
  let {
    distance = 1
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const anchor = Editor.point(editor, at, {
    edge: 'end'
  });
  const focus = Editor.end(editor, []);
  const range = {
    anchor,
    focus
  };
  let d = 0;
  let target;
  for (const p of Editor.positions(editor, {
    at: range
  })) {
    if (d > distance) {
      break;
    }

    // this is the important change
    const node = Node.get(editor, p.path);
    if (node.text.length === p.offset) {
      continue;
    }
    if (d !== 0) {
      target = p;
    }
    d++;
  }
  return target;
}
function nodeTypeMatcher() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    const type = args[0];
    return node => node.type === type;
  }
  const set = new Set(args);
  return node => typeof node.type === 'string' && set.has(node.type);
}
function assert(condition) {
  if (!condition) {
    throw new Error('failed assert');
  }
}

const arrayValuesToElementKeys = new WeakMap();
let counter = 0;
function getKeysForArrayValue(value) {
  if (!arrayValuesToElementKeys.has(value)) {
    arrayValuesToElementKeys.set(value, Array.from({
      length: value.length
    }, getNewArrayElementKey));
  }
  return arrayValuesToElementKeys.get(value);
}
function setKeysForArrayValue(value, elementIds) {
  arrayValuesToElementKeys.set(value, elementIds);
}
function getNewArrayElementKey() {
  return (counter++).toString();
}
function castToMemoizedInfoForSchema(val) {
  return val;
}
function getOrInsert(map, key, val) {
  if (!map.has(key)) {
    map.set(key, val(key));
  }
  return map.get(key);
}
function createGetPreviewProps(rootSchema, rootOnChange, getChildFieldElement) {
  const memoizedInfoForSchema = castToMemoizedInfoForSchema({
    form(schema, onChange) {
      return newVal => onChange(() => newVal);
    },
    array(schema, onChange) {
      return {
        rawOnChange: onChange,
        inner: new Map(),
        onChange(updater) {
          onChange(value => updateValue(schema, value, updater));
        }
      };
    },
    child() {},
    conditional(schema, onChange) {
      return {
        onChange: (discriminant, value) => onChange(val => updateValue(schema, val, {
          discriminant,
          value
        })),
        onChangeForValue: cb => onChange(val => ({
          discriminant: val.discriminant,
          value: cb(val.value)
        }))
      };
    },
    object(schema, onChange) {
      return {
        onChange: updater => {
          onChange(value => updateValue(schema, value, updater));
        },
        innerOnChanges: Object.fromEntries(Object.keys(schema.fields).map(key => {
          return [key, newVal => {
            onChange(val => _objectSpread(_objectSpread({}, val), {}, {
              [key]: newVal(val[key])
            }));
          }];
        }))
      };
    },
    relationship(schema, onChange) {
      return newVal => onChange(() => newVal);
    }
  });
  const previewPropsFactories = {
    form(schema, value, onChange) {
      return {
        value: value,
        onChange,
        options: schema.options,
        schema: schema
      };
    },
    child(schema, value, onChange, path) {
      return {
        element: getChildFieldElement(path),
        schema: schema
      };
    },
    object(schema, value, memoized, path, getInnerProp) {
      const fields = {};
      for (const key of Object.keys(schema.fields)) {
        fields[key] = getInnerProp(schema.fields[key], value[key], memoized.innerOnChanges[key], key);
      }
      const previewProps = {
        fields,
        onChange: memoized.onChange,
        schema: schema
      };
      return previewProps;
    },
    array(schema, value, memoized, path, getInnerProp) {
      const arrayValue = value;
      const keys = getKeysForArrayValue(arrayValue);
      const unusedKeys = new Set(getKeysForArrayValue(value));
      const props = {
        elements: arrayValue.map((val, i) => {
          const key = keys[i];
          unusedKeys.delete(key);
          const element = getOrInsert(memoized.inner, key, () => {
            const onChange = val => {
              memoized.rawOnChange(prev => {
                const keys = getKeysForArrayValue(prev);
                const index = keys.indexOf(key);
                const newValue = [...prev];
                newValue[index] = val(newValue[index]);
                setKeysForArrayValue(newValue, keys);
                return newValue;
              });
            };
            const element = getInnerProp(schema.element, val, onChange, key);
            return {
              element,
              elementWithKey: _objectSpread(_objectSpread({}, element), {}, {
                key
              }),
              onChange
            };
          });
          const currentInnerProp = getInnerProp(schema.element, val, element.onChange, key);
          if (element.element !== currentInnerProp) {
            element.element = currentInnerProp;
            element.elementWithKey = _objectSpread(_objectSpread({}, currentInnerProp), {}, {
              key
            });
          }
          return element.elementWithKey;
        }),
        schema: schema,
        onChange: memoized.onChange
      };
      for (const key of unusedKeys) {
        memoized.inner.delete(key);
      }
      return props;
    },
    relationship(schema, value, onChange) {
      const props = {
        value: value,
        onChange,
        schema: schema
      };
      return props;
    },
    conditional(schema, value, memoized, path, getInnerProp) {
      const props = {
        discriminant: value.discriminant,
        onChange: memoized.onChange,
        options: schema.discriminant.options,
        value: getInnerProp(schema.values[value.discriminant.toString()], value.value, memoized.onChangeForValue, 'value'),
        schema: schema
      };
      return props;
    }
  };
  function getPreviewPropsForProp(schema, value, memoedThing, path, getInnerProp) {
    return previewPropsFactories[schema.kind](schema, value, memoedThing, path, getInnerProp);
  }
  function getInitialMemoState(schema, value, onChange, path) {
    const innerState = new Map();
    const memoizedInfo = memoizedInfoForSchema[schema.kind](schema, onChange);
    const state = {
      value,
      inner: innerState,
      props: getPreviewPropsForProp(schema, value, memoizedInfo, path, (schema, value, onChange, key) => {
        const state = getInitialMemoState(schema, value, onChange, path.concat(key));
        innerState.set(key, state);
        return state.props;
      }),
      schema: schema,
      cached: memoizedInfo
    };
    return state;
  }
  function getUpToDateProps(schema, value, onChange, memoState, path) {
    if (memoState.schema !== schema) {
      Object.assign(memoState, getInitialMemoState(schema, value, onChange, path));
      return memoState.props;
    }
    if (memoState.value === value) {
      return memoState.props;
    }
    memoState.value = value;
    const unusedKeys = new Set(memoState.inner.keys());
    memoState.props = getPreviewPropsForProp(schema, value, memoState.cached, path, (schema, value, onChange, innerMemoStateKey) => {
      unusedKeys.delete(innerMemoStateKey);
      if (!memoState.inner.has(innerMemoStateKey)) {
        const innerState = getInitialMemoState(schema, value, onChange, path.concat(innerMemoStateKey));
        memoState.inner.set(innerMemoStateKey, innerState);
        return innerState.props;
      }
      return getUpToDateProps(schema, value, onChange, memoState.inner.get(innerMemoStateKey), path.concat(innerMemoStateKey));
    });
    for (const key of unusedKeys) {
      memoState.inner.delete(key);
    }
    return memoState.props;
  }
  let memoState;
  return value => {
    if (memoState === undefined) {
      memoState = getInitialMemoState(rootSchema, value, rootOnChange, []);
      return memoState.props;
    }
    return getUpToDateProps(rootSchema, value, rootOnChange, memoState, []);
  };
}

function findChildPropPathsForProp(value, schema, path) {
  switch (schema.kind) {
    case 'form':
    case 'relationship':
      return [];
    case 'child':
      return [{
        path: path,
        options: schema.options
      }];
    case 'conditional':
      return findChildPropPathsForProp(value.value, schema.values[value.discriminant], path.concat('value'));
    case 'object':
      {
        const paths = [];
        Object.keys(schema.fields).forEach(key => {
          paths.push(...findChildPropPathsForProp(value[key], schema.fields[key], path.concat(key)));
        });
        return paths;
      }
    case 'array':
      {
        const paths = [];
        value.forEach((val, i) => {
          paths.push(...findChildPropPathsForProp(val, schema.element, path.concat(i)));
        });
        return paths;
      }
  }
}
function findChildPropPaths(value, props) {
  const propPaths = findChildPropPathsForProp(value, {
    kind: 'object',
    fields: props
  }, []);
  if (!propPaths.length) {
    return [{
      path: undefined,
      options: {
        kind: 'inline',
        placeholder: ''
      }
    }];
  }
  return propPaths;
}
function assertNever(arg) {
  throw new Error('expected to never be called but received: ' + JSON.stringify(arg));
}
function getDocumentFeaturesForChildField(editorDocumentFeatures, options) {
  var _options$formatting, _options$formatting3, _options$formatting4, _options$formatting5, _options$formatting6, _options$formatting7, _options$formatting8;
  // an important note for this: normalization based on document features
  // is done based on the document features returned here
  // and the editor document features
  // so the result for any given child prop will be the things that are
  // allowed by both these document features
  // AND the editor document features
  const inlineMarksFromOptions = (_options$formatting = options.formatting) === null || _options$formatting === void 0 ? void 0 : _options$formatting.inlineMarks;
  const inlineMarks = inlineMarksFromOptions === 'inherit' ? 'inherit' : Object.fromEntries(Object.keys(editorDocumentFeatures.formatting.inlineMarks).map(mark => {
    return [mark, !!(inlineMarksFromOptions || {})[mark]];
  }));
  if (options.kind === 'inline') {
    var _options$formatting2;
    return {
      kind: 'inline',
      inlineMarks,
      documentFeatures: {
        links: options.links === 'inherit',
        relationships: options.relationships === 'inherit'
      },
      softBreaks: ((_options$formatting2 = options.formatting) === null || _options$formatting2 === void 0 ? void 0 : _options$formatting2.softBreaks) === 'inherit'
    };
  }
  return {
    kind: 'block',
    inlineMarks,
    softBreaks: ((_options$formatting3 = options.formatting) === null || _options$formatting3 === void 0 ? void 0 : _options$formatting3.softBreaks) === 'inherit',
    documentFeatures: {
      layouts: [],
      dividers: options.dividers === 'inherit' ? editorDocumentFeatures.dividers : false,
      formatting: {
        alignment: ((_options$formatting4 = options.formatting) === null || _options$formatting4 === void 0 ? void 0 : _options$formatting4.alignment) === 'inherit' ? editorDocumentFeatures.formatting.alignment : {
          center: false,
          end: false
        },
        blockTypes: ((_options$formatting5 = options.formatting) === null || _options$formatting5 === void 0 ? void 0 : _options$formatting5.blockTypes) === 'inherit' ? editorDocumentFeatures.formatting.blockTypes : {
          blockquote: false,
          code: false
        },
        headingLevels: ((_options$formatting6 = options.formatting) === null || _options$formatting6 === void 0 ? void 0 : _options$formatting6.headingLevels) === 'inherit' ? editorDocumentFeatures.formatting.headingLevels : ((_options$formatting7 = options.formatting) === null || _options$formatting7 === void 0 ? void 0 : _options$formatting7.headingLevels) || [],
        listTypes: ((_options$formatting8 = options.formatting) === null || _options$formatting8 === void 0 ? void 0 : _options$formatting8.listTypes) === 'inherit' ? editorDocumentFeatures.formatting.listTypes : {
          ordered: false,
          unordered: false
        }
      },
      links: options.links === 'inherit',
      relationships: options.relationships === 'inherit'
    }
  };
}
function getSchemaAtPropPathInner(path, value, schema) {
  // because we're checking the length here
  // the non-null asserts on shift below are fine
  if (path.length === 0) {
    return schema;
  }
  if (schema.kind === 'child' || schema.kind === 'form' || schema.kind === 'relationship') {
    return;
  }
  if (schema.kind === 'conditional') {
    const key = path.shift();
    if (key === 'discriminant') {
      return getSchemaAtPropPathInner(path, value.discriminant, schema.discriminant);
    }
    if (key === 'value') {
      const propVal = schema.values[value.discriminant];
      return getSchemaAtPropPathInner(path, value.value, propVal);
    }
    return;
  }
  if (schema.kind === 'object') {
    const key = path.shift();
    return getSchemaAtPropPathInner(path, value[key], schema.fields[key]);
  }
  if (schema.kind === 'array') {
    const index = path.shift();
    return getSchemaAtPropPathInner(path, value[index], schema.element);
  }
  assertNever(schema);
}
function getSchemaAtPropPath(path, value, props) {
  return getSchemaAtPropPathInner([...path], value, {
    kind: 'object',
    fields: props
  });
}
function clientSideValidateProp(schema, value) {
  switch (schema.kind) {
    case 'child':
    case 'relationship':
      {
        return true;
      }
    case 'form':
      {
        return schema.validate(value);
      }
    case 'conditional':
      {
        if (!schema.discriminant.validate(value.discriminant)) {
          return false;
        }
        return clientSideValidateProp(schema.values[value.discriminant], value.value);
      }
    case 'object':
      {
        for (const [key, childProp] of Object.entries(schema.fields)) {
          if (!clientSideValidateProp(childProp, value[key])) {
            return false;
          }
        }
        return true;
      }
    case 'array':
      {
        for (const innerVal of value) {
          if (!clientSideValidateProp(schema.element, innerVal)) {
            return false;
          }
        }
        return true;
      }
  }
}
function getAncestorSchemas(rootSchema, path, value) {
  const ancestors = [];
  const currentPath = [...path];
  let currentProp = rootSchema;
  let currentValue = value;
  while (currentPath.length) {
    ancestors.push(currentProp);
    const key = currentPath.shift(); // this code only runs when path.length is truthy so this non-null assertion is fine
    if (currentProp.kind === 'array') {
      currentProp = currentProp.element;
      currentValue = currentValue[key];
    } else if (currentProp.kind === 'conditional') {
      currentProp = currentProp.values[value.discriminant];
      currentValue = currentValue.value;
    } else if (currentProp.kind === 'object') {
      currentValue = currentValue[key];
      currentProp = currentProp.fields[key];
    } else if (currentProp.kind === 'child' || currentProp.kind === 'form' || currentProp.kind === 'relationship') {
      throw new Error(`unexpected prop "${key}"`);
    } else {
      assertNever(currentProp);
    }
  }
  return ancestors;
}
function getValueAtPropPath(value, inputPath) {
  const path = [...inputPath];
  while (path.length) {
    const key = path.shift();
    value = value[key];
  }
  return value;
}
function traverseProps(schema, value, visitor) {
  let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  if (schema.kind === 'form' || schema.kind === 'relationship' || schema.kind === 'child') {
    visitor(schema, value, path);
    return;
  }
  if (schema.kind === 'object') {
    for (const [key, childProp] of Object.entries(schema.fields)) {
      traverseProps(childProp, value[key], visitor, [...path, key]);
    }
    visitor(schema, value, path);
    return;
  }
  if (schema.kind === 'array') {
    for (const [idx, val] of value.entries()) {
      traverseProps(schema.element, val, visitor, path.concat(idx));
    }
    return visitor(schema, value, path);
  }
  if (schema.kind === 'conditional') {
    const discriminant = value.discriminant;
    visitor(schema, discriminant, path.concat('discriminant'));
    traverseProps(schema.values[discriminant.toString()], value.value, visitor, path.concat('value'));
    visitor(schema, value, path);
    return;
  }
  assertNever(schema);
}
function replaceValueAtPropPath(schema, value, newValue, path) {
  if (path.length === 0) {
    return newValue;
  }
  const [key, ...newPath] = path;
  if (schema.kind === 'object') {
    return _objectSpread(_objectSpread({}, value), {}, {
      [key]: replaceValueAtPropPath(schema.fields[key], value[key], newValue, newPath)
    });
  }
  if (schema.kind === 'conditional') {
    const conditionalValue = value;
    // replaceValueAtPropPath should not be used to only update the discriminant of a conditional field
    // if you want to update the discriminant of a conditional field, replace the value of the whole conditional field
    assert(key === 'value');
    return {
      discriminant: conditionalValue.discriminant,
      value: replaceValueAtPropPath(schema.values[key], conditionalValue.value, newValue, newPath)
    };
  }
  if (schema.kind === 'array') {
    const prevVal = value;
    const newVal = [...prevVal];
    setKeysForArrayValue(newVal, getKeysForArrayValue(prevVal));
    newVal[key] = replaceValueAtPropPath(schema.element, newVal[key], newValue, newPath);
    return newVal;
  }

  // we should never reach here since form, relationship or child fields don't contain other fields
  // so the only thing that can happen to them is to be replaced which happens at the start of this function when path.length === 0
  assert(schema.kind !== 'form' && schema.kind !== 'relationship' && schema.kind !== 'child');
  assertNever(schema);
}
function getPlaceholderTextForPropPath(propPath, fields, formProps) {
  const field = getSchemaAtPropPath(propPath, formProps, fields);
  if ((field === null || field === void 0 ? void 0 : field.kind) === 'child') {
    return field.options.placeholder;
  }
  return '';
}

function getInitialValue(type, componentBlock) {
  const props = getInitialPropsValue({
    kind: 'object',
    fields: componentBlock.schema
  });
  return {
    type: 'component-block',
    component: type,
    props,
    children: findChildPropPaths(props, componentBlock.schema).map(x => ({
      type: `component-${x.options.kind}-prop`,
      propPath: x.path,
      children: [x.options.kind === 'block' ? {
        type: 'paragraph',
        children: [{
          text: ''
        }]
      } : {
        text: ''
      }]
    }))
  };
}
function getInitialPropsValue(schema) {
  switch (schema.kind) {
    case 'form':
      return schema.defaultValue;
    case 'child':
      return null;
    case 'relationship':
      return schema.many ? [] : null;
    case 'conditional':
      {
        const defaultValue = schema.discriminant.defaultValue;
        return {
          discriminant: defaultValue,
          value: getInitialPropsValue(schema.values[defaultValue.toString()])
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = getInitialPropsValue(schema.fields[key]);
        }
        return obj;
      }
    case 'array':
      {
        return [];
      }
  }
  assertNever(schema);
}
function getInitialPropsValueFromInitializer(schema, initializer) {
  switch (schema.kind) {
    case 'form':
      return initializer === undefined ? schema.defaultValue : initializer;
    case 'child':
      return null;
    case 'relationship':
      return initializer === undefined ? schema.many ? [] : null : initializer;
    case 'conditional':
      {
        const defaultValue = initializer === undefined ? schema.discriminant.defaultValue : initializer.discriminant;
        return {
          discriminant: defaultValue,
          value: getInitialPropsValueFromInitializer(schema.values[defaultValue.toString()], initializer === undefined ? undefined : initializer.value)
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = getInitialPropsValueFromInitializer(schema.fields[key], initializer === undefined ? undefined : initializer[key]);
        }
        return obj;
      }
    case 'array':
      {
        return (initializer !== null && initializer !== void 0 ? initializer : []).map(x => getInitialPropsValueFromInitializer(schema.element, x.value));
      }
  }
  assertNever(schema);
}
function updateValue(schema, currentValue, updater) {
  if (updater === undefined) return currentValue;
  switch (schema.kind) {
    case 'relationship':
      return updater;
    case 'form':
      return updater;
    case 'child':
      return null;
    case 'conditional':
      {
        return {
          discriminant: updater.discriminant,
          value: updater.discriminant === currentValue.discriminant ? updateValue(schema.values[updater.discriminant.toString()], currentValue.value, updater.value) : getInitialPropsValueFromInitializer(schema.values[updater.discriminant.toString()], updater.value)
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = updateValue(schema.fields[key], currentValue[key], updater[key]);
        }
        return obj;
      }
    case 'array':
      {
        const currentArrVal = currentValue;
        const newVal = updater;
        const uniqueKeys = new Set();
        for (const x of newVal) {
          if (x.key !== undefined) {
            if (uniqueKeys.has(x.key)) {
              throw new Error('Array elements must have unique keys');
            }
            uniqueKeys.add(x.key);
          }
        }
        const keys = newVal.map(x => {
          if (x.key !== undefined) return x.key;
          let elementKey = getNewArrayElementKey();
          // just in case someone gives a key that is above our counter
          while (uniqueKeys.has(elementKey)) {
            elementKey = getNewArrayElementKey();
          }
          uniqueKeys.add(elementKey);
          return elementKey;
        });
        const prevKeys = getKeysForArrayValue(currentArrVal);
        const prevValuesByKey = new Map(currentArrVal.map((value, i) => {
          return [prevKeys[i], value];
        }));
        const val = newVal.map((x, i) => {
          const id = keys[i];
          if (prevValuesByKey.has(id)) {
            return updateValue(schema.element, prevValuesByKey.get(id), x.value);
          }
          return getInitialPropsValueFromInitializer(schema.element, x.value);
        });
        setKeysForArrayValue(val, keys);
        return val;
      }
  }
  assertNever(schema);
}

const previewPropsToValueConverter = {
  child() {
    return null;
  },
  form(props) {
    return props.value;
  },
  array(props) {
    const values = props.elements.map(x => previewPropsToValue(x));
    setKeysForArrayValue(values, props.elements.map(x => x.key));
    return values;
  },
  conditional(props) {
    return {
      discriminant: props.discriminant,
      value: previewPropsToValue(props.value)
    };
  },
  object(props) {
    return Object.fromEntries(Object.entries(props.fields).map(_ref => {
      let [key, val] = _ref;
      return [key, previewPropsToValue(val)];
    }));
  },
  relationship(props) {
    return props.value;
  }
};
function previewPropsToValue(props) {
  return previewPropsToValueConverter[props.schema.kind](props);
}
const valueToUpdaters = {
  child() {
    return undefined;
  },
  form(value) {
    return value;
  },
  array(value, schema) {
    const keys = getKeysForArrayValue(value);
    return value.map((x, i) => ({
      key: keys[i],
      value: valueToUpdater(x, schema.element)
    }));
  },
  conditional(value, schema) {
    return {
      discriminant: value.discriminant,
      value: valueToUpdater(value.value, schema.values[value.discriminant.toString()])
    };
  },
  object(value, schema) {
    return Object.fromEntries(Object.entries(schema.fields).map(_ref2 => {
      let [key, schema] = _ref2;
      return [key, valueToUpdater(value[key], schema)];
    }));
  },
  relationship(value) {
    return value;
  }
};
function valueToUpdater(value, schema) {
  return valueToUpdaters[schema.kind](value, schema);
}
function setValueToPreviewProps(value, props) {
  if (isKind(props, 'child')) {
    // child fields can't be updated through preview props, so we don't do anything here
    return;
  }
  if (isKind(props, 'form') || isKind(props, 'relationship') || isKind(props, 'object') || isKind(props, 'array')) {
    props.onChange(valueToUpdater(value, props.schema));
    return;
  }
  if (isKind(props, 'conditional')) {
    const updater = valueToUpdater(value, props.schema);
    props.onChange(updater.discriminant, updater.value);
    return;
  }
  assertNever(props);
}

// this exists because for props.schema.kind === 'form', ts doesn't narrow props, only props.schema
function isKind(props, kind) {
  return props.schema.kind === kind;
}

function ArrayFieldPreview(props) {
  return jsx(Stack, {
    gap: "medium"
  }, jsx(OrderableList, props, props.elements.map(val => {
    var _props$schema$label, _props$schema$label2, _props$schema;
    return jsx(OrderableItemInForm, _extends({
      elementKey: val.key,
      label: (_props$schema$label = (_props$schema$label2 = (_props$schema = props.schema).label) === null || _props$schema$label2 === void 0 ? void 0 : _props$schema$label2.call(_props$schema, val)) !== null && _props$schema$label !== void 0 ? _props$schema$label : 'Item'
    }, val));
  })), jsx(Button, {
    autoFocus: props.autoFocus,
    onClick: () => {
      props.onChange([...props.elements.map(x => ({
        key: x.key
      })), {
        key: undefined
      }]);
    },
    tone: "active"
  }, jsx(Stack, {
    gap: "small",
    across: true
  }, jsx(PlusCircleIcon, {
    size: "smallish"
  }), " ", jsx("span", null, "Add"))));
}
function RelationshipFieldPreview(_ref) {
  let {
    schema,
    autoFocus,
    onChange,
    value
  } = _ref;
  const keystone = useKeystone();
  const list = keystone.adminMeta.lists[schema.listKey];
  const searchFields = Object.keys(list.fields).filter(key => list.fields[key].search);
  return jsx(FieldContainer, null, jsx(FieldLabel, null, schema.label), jsx(RelationshipSelect, {
    autoFocus: autoFocus,
    controlShouldRenderValue: true,
    isDisabled: false,
    list: list,
    labelField: list.labelField,
    searchFields: searchFields,
    extraSelection: schema.selection || '',
    portalMenu: true,
    state: schema.many ? {
      kind: 'many',
      value: value.map(x => ({
        id: x.id,
        label: x.label || x.id,
        data: x.data
      })),
      onChange: onChange
    } : {
      kind: 'one',
      value: value ? _objectSpread(_objectSpread({}, value), {}, {
        label: value.label || value.id
      }) : null,
      onChange: onChange
    }
  }));
}
function FormFieldPreview(_ref2) {
  let {
    schema,
    autoFocus,
    forceValidation,
    onChange,
    value
  } = _ref2;
  return jsx(schema.Input, {
    autoFocus: !!autoFocus,
    value: value,
    onChange: onChange,
    forceValidation: !!forceValidation
  });
}
function ObjectFieldPreview(_ref3) {
  let {
    schema,
    autoFocus,
    fields
  } = _ref3;
  const firstFocusable = autoFocus ? findFocusableObjectFieldKey(schema) : undefined;
  return jsx(Stack, {
    gap: "xlarge"
  }, Object.entries(fields).map(_ref4 => {
    let [key, propVal] = _ref4;
    return isNonChildFieldPreviewProps(propVal) && jsx(FormValueContentFromPreviewProps, _extends({
      autoFocus: key === firstFocusable,
      key: key
    }, propVal));
  }));
}
function ConditionalFieldPreview(_ref5) {
  let {
    schema,
    autoFocus,
    discriminant,
    onChange,
    value
  } = _ref5;
  const schemaDiscriminant = schema.discriminant;
  return jsx(Stack, {
    gap: "xlarge"
  }, useMemo(() => jsx(schemaDiscriminant.Input, {
    autoFocus: !!autoFocus,
    value: discriminant,
    onChange: onChange,
    forceValidation: false
  }), [autoFocus, schemaDiscriminant, discriminant, onChange]), isNonChildFieldPreviewProps(value) && jsx(FormValueContentFromPreviewProps, value));
}
function isNonChildFieldPreviewProps(props) {
  return props.schema.kind !== 'child';
}
const fieldRenderers = {
  array: ArrayFieldPreview,
  relationship: RelationshipFieldPreview,
  child: () => null,
  form: FormFieldPreview,
  object: ObjectFieldPreview,
  conditional: ConditionalFieldPreview
};
const FormValueContentFromPreviewProps = /*#__PURE__*/memo(function FormValueContentFromPreview(props) {
  const Comp = fieldRenderers[props.schema.kind];
  return jsx(Comp, props);
});
const OrderableItemInForm = /*#__PURE__*/memo(function OrderableItemInForm(props) {
  const [modalState, setModalState] = useState({
    state: 'closed'
  });
  const onModalChange = useCallback(cb => {
    setModalState(state => {
      if (state.state === 'open') {
        return {
          state: 'open',
          forceValidation: state.forceValidation,
          value: cb(state.value)
        };
      }
      return state;
    });
  }, [setModalState]);
  return jsx(OrderableItem, {
    elementKey: props.elementKey
  }, jsx(Stack, {
    gap: "medium"
  }, jsx("div", {
    css: {
      display: 'flex',
      gap: 4
    }
  }, jsx(Stack, {
    across: true,
    gap: "xsmall",
    align: "center",
    css: {
      cursor: 'pointer'
    }
  }, jsx(DragHandle, null)), jsx(Button, {
    weight: "none",
    onClick: () => {
      setModalState({
        state: 'open',
        value: previewPropsToValue(props),
        forceValidation: false
      });
    },
    css: {
      flexGrow: 1,
      justifyContent: 'start'
    }
  }, jsx("span", {
    css: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'start'
    }
  }, props.label)), jsx(RemoveButton, null)), isNonChildFieldPreviewProps(props) && jsx(AlertDialog, {
    title: `Edit Item`,
    actions: {
      confirm: {
        action: () => {
          if (modalState.state !== 'open') return;
          if (!clientSideValidateProp(props.schema, modalState.value)) {
            setModalState(state => _objectSpread(_objectSpread({}, state), {}, {
              forceValidation: true
            }));
            return;
          }
          setValueToPreviewProps(modalState.value, props);
          setModalState({
            state: 'closed'
          });
        },
        label: 'Done'
      },
      cancel: {
        action: () => {
          setModalState({
            state: 'closed'
          });
        },
        label: 'Cancel'
      }
    },
    isOpen: modalState.state === 'open'
  }, modalState.state === 'open' && jsx(ArrayFieldItemModalContent, {
    onChange: onModalChange,
    schema: props.schema,
    value: modalState.value
  }))));
});
function ArrayFieldItemModalContent(props) {
  const previewProps = useMemo(() => createGetPreviewProps(props.schema, props.onChange, () => undefined), [props.schema, props.onChange])(props.value);
  return jsx(FormValueContentFromPreviewProps, previewProps);
}
function findFocusableObjectFieldKey(schema) {
  for (const [key, innerProp] of Object.entries(schema.fields)) {
    const childFocusable = canFieldBeFocused(innerProp);
    if (childFocusable) {
      return key;
    }
  }
  return undefined;
}
function canFieldBeFocused(schema) {
  if (schema.kind === 'array' || schema.kind === 'conditional' || schema.kind === 'form' || schema.kind === 'relationship') {
    return true;
  }
  if (schema.kind === 'child') {
    return false;
  }
  if (schema.kind === 'object') {
    for (const innerProp of Object.values(schema.fields)) {
      if (canFieldBeFocused(innerProp)) {
        return true;
      }
    }
    return false;
  }
  assertNever(schema);
}

export { getPlaceholderTextForPropPath as A, ForceValidationProvider as B, EditorAfterButIgnoringingPointsWithNoContent as E, FormValueContentFromPreviewProps as F, assertNever as a, assert as b, getKeysForArrayValue as c, createGetPreviewProps as d, clientSideValidateProp as e, getDocumentFeaturesForChildField as f, getInitialPropsValue as g, getAncestorSchemas as h, getValueAtPropPath as i, findChildPropPaths as j, getNewArrayElementKey as k, useEventCallback as l, moveChildren as m, getInitialValue as n, insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading as o, isElementActive as p, nodeTypeMatcher as q, replaceValueAtPropPath as r, setKeysForArrayValue as s, traverseProps as t, useElementWithSetNodes as u, getSchemaAtPropPath as v, allMarks as w, useForceValidation as x, modifierKeyText as y, clearFormatting as z };
