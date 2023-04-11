'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var React = require('react');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var CellContainer = require('../../../../../dist/CellContainer-b04c3489.cjs.prod.js');
var CellLink = require('../../../../../dist/CellLink-d6c129c8.cjs.prod.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('next/link');
require('@keystone-ui/toast');
require('@keystone-ui/loading');
require('@keystone-ui/modals');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/next-fields-98c83ec4.cjs.prod.js');
require('../../../../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-bbc9d632.cjs.prod.js');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/extends');
require('next/router');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('../../../../../dist/Fields-c00f0a54.cjs.prod.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

const Field = _ref => {
  var _value$value;
  let {
    field,
    value,
    onChange,
    forceValidation
  } = _ref;
  const [touchedInput, setTouchedInput] = React.useState(false);
  const showValidation = touchedInput || forceValidation;
  const validationMessage = showValidation ? validate(value, field.fieldMeta, field.label) : undefined;
  return core.jsx(fields.FieldContainer, null, core.jsx(core.Stack, null, core.jsx(fields.FieldLabel, null, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? core.jsx(core.Inline, {
    gap: "small"
  }, core.jsx(core.Stack, null, core.jsx(fields.DatePicker, {
    onUpdate: date => {
      onChange(_objectSpread(_objectSpread({}, value), {}, {
        value: date
      }));
    },
    onClear: () => {
      onChange(_objectSpread(_objectSpread({}, value), {}, {
        value: null
      }));
    },
    onBlur: () => setTouchedInput(true),
    value: (_value$value = value.value) !== null && _value$value !== void 0 ? _value$value : ''
  }), validationMessage && core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, validationMessage))) : value.value !== null && core.jsx(core.Text, null, formatOutput(value.value))));
};
function validate(value, fieldMeta, label) {
  // if we recieve null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (value.kind === 'update' && value.initial === null && value.value === null) {
    return undefined;
  }
  if (fieldMeta.isRequired && value.value === null) {
    return `${label} is required`;
  }
  return undefined;
}
const Cell = _ref2 => {
  let {
    item,
    field,
    linkTo
  } = _ref2;
  let value = item[field.path];
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, formatOutput(value)) : core.jsx(CellContainer.CellContainer, null, formatOutput(value));
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), formatOutput(item[field.path]));
};
function formatOutput(isoDateString) {
  if (!isoDateString) {
    return null;
  }
  const date = new Date(`${isoDateString}T00:00Z`);
  const dateInLocalTimezone = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return dateInLocalTimezone.toLocaleDateString();
}
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    fieldMeta: config.fieldMeta,
    defaultValue: {
      kind: 'create',
      value: null
    },
    deserialize: data => {
      const value = data[config.path];
      return {
        kind: 'update',
        initial: value,
        value
      };
    },
    serialize: _ref4 => {
      let {
        value
      } = _ref4;
      return {
        [config.path]: value
      };
    },
    validate: value => validate(value, config.fieldMeta, config.label) === undefined
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
