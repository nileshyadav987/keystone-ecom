import _extends from '@babel/runtime/helpers/esm/extends';
import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { useRef, useEffect, useMemo } from 'react';
import { d as createGetPreviewProps, F as FormValueContentFromPreviewProps, g as getInitialPropsValue, e as clientSideValidateProp, a as assertNever } from '../../dist/form-from-preview-f68e552c.esm.js';
import '@babel/runtime/helpers/objectSpread2';
import '@keystone-6/core/admin-ui/context';
import '@keystone-6/core/fields/types/relationship/views/RelationshipSelect';
import '@keystone-ui/button';
import '@keystone-ui/icons/icons/PlusCircleIcon';
import '@keystone-ui/modals';
import '../../dist/orderable-ff385078.esm.js';
import '@dnd-kit/core';
import '@dnd-kit/sortable';
import '@dnd-kit/modifiers';
import '@keystone-ui/icons/icons/Trash2Icon';
import 'slate';
import 'slate-react';

const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  });
  const createPreviewProps = useMemo(() => {
    return createGetPreviewProps(field.schema, getNewVal => {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        kind: valueRef.current.kind,
        value: getNewVal(valueRef.current.value)
      });
    }, () => undefined);
  }, [field.schema, onChange]);
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), jsx(FormValueContentFromPreviewProps, _extends({
    forceValidation: forceValidation,
    autoFocus: autoFocus
  }, createPreviewProps(value.value))));
};
const Cell = _ref2 => {
  return null;
};
const CardValue = _ref3 => {
  return null;
};
const allowedExportsOnCustomViews = ['schema'];
const controller = config => {
  if (!config.customViews.schema) {
    throw new Error(`No schema in custom view. Did you forgot to set \`views\` to a file that exports a \`schema\` on ${config.listKey}.${config.path}`);
  }
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} { json(hydrateRelationships: true) }`,
    schema: config.customViews.schema,
    defaultValue: {
      kind: 'create',
      value: getInitialPropsValue(config.customViews.schema)
    },
    validate: value => clientSideValidateProp(config.customViews.schema, value.value),
    deserialize: data => {
      var _data$json, _data;
      return {
        kind: 'update',
        value: (_data$json = (_data = data[`${config.path}`]) === null || _data === void 0 ? void 0 : _data.json) !== null && _data$json !== void 0 ? _data$json : null
      };
    },
    serialize: value => {
      return {
        [config.path]: serializeValue(config.customViews.schema, value.value, value.kind)
      };
    }
  };
};
function serializeValue(schema, value, kind) {
  if (schema.kind === 'conditional') {
    return {
      [value.discriminant]: serializeValue(schema.values[value.discriminant], value.value, kind)
    };
  }
  if (schema.kind === 'array') {
    return value.map(a => serializeValue(schema.element, a, kind));
  }
  if (schema.kind === 'form') {
    return value;
  }
  if (schema.kind === 'object') {
    return Object.fromEntries(Object.entries(schema.fields).map(_ref4 => {
      let [key, val] = _ref4;
      return [key, serializeValue(val, value[key], kind)];
    }));
  }
  if (schema.kind === 'relationship') {
    if (Array.isArray(value)) {
      return {
        [kind === 'create' ? 'connect' : 'set']: value.map(x => ({
          id: x.id
        }))
      };
    }
    if (value === null) {
      if (kind === 'create') {
        return undefined;
      }
      return {
        disconnect: true
      };
    }
    return {
      connect: {
        id: value.id
      }
    };
  }
  assertNever(schema);
}

export { CardValue, Cell, Field, allowedExportsOnCustomViews, controller };
