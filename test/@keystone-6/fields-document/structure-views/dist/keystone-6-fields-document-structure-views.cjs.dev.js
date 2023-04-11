'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var React = require('react');
var formFromPreview = require('../../dist/form-from-preview-31c5b8ad.cjs.dev.js');
require('@babel/runtime/helpers/objectSpread2');
require('@keystone-6/core/admin-ui/context');
require('@keystone-6/core/fields/types/relationship/views/RelationshipSelect');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/PlusCircleIcon');
require('@keystone-ui/modals');
require('../../dist/orderable-eb77c396.cjs.dev.js');
require('@dnd-kit/core');
require('@dnd-kit/sortable');
require('@dnd-kit/modifiers');
require('@keystone-ui/icons/icons/Trash2Icon');
require('slate');
require('slate-react');

const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus,
    forceValidation
  } = _ref;
  const valueRef = React.useRef(value);
  React.useEffect(() => {
    valueRef.current = value;
  });
  const createPreviewProps = React.useMemo(() => {
    return formFromPreview.createGetPreviewProps(field.schema, getNewVal => {
      onChange === null || onChange === void 0 ? void 0 : onChange({
        kind: valueRef.current.kind,
        value: getNewVal(valueRef.current.value)
      });
    }, () => undefined);
  }, [field.schema, onChange]);
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), core.jsx(formFromPreview.FormValueContentFromPreviewProps, _extends({
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
      value: formFromPreview.getInitialPropsValue(config.customViews.schema)
    },
    validate: value => formFromPreview.clientSideValidateProp(config.customViews.schema, value.value),
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
  formFromPreview.assertNever(schema);
}

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.allowedExportsOnCustomViews = allowedExportsOnCustomViews;
exports.controller = controller;
