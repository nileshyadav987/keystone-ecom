'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var CellContainer = require('../../../../../dist/CellContainer-7e13b005.cjs.dev.js');
require('@babel/runtime/helpers/extends');
require('next/router');
require('next/link');
require('@babel/runtime/helpers/defineProperty');
require('react');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('@keystone-ui/toast');
require('@keystone-ui/loading');
require('@keystone-ui/modals');
require('apollo-upload-client');
require('@babel/runtime/helpers/objectSpread2');
require('@emotion/hash');
require('../../../../../dist/next-fields-112c1555.cjs.dev.js');
require('../../../../../dist/graphql-ts-schema-db7cad71.cjs.dev.js');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-d825f8e4.cjs.dev.js');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-94652c56.cjs.dev.js');
require('../../../../../dist/Fields-203e4e26.cjs.dev.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
require('decimal.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('graphql');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus
  } = _ref;
  const {
    fields: fields$1,
    typography,
    spacing
  } = core.useTheme();
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.Checkbox, {
    autoFocus: autoFocus,
    disabled: onChange === undefined,
    onChange: event => {
      onChange === null || onChange === void 0 ? void 0 : onChange(event.target.checked);
    },
    checked: value,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  }, core.jsx("span", {
    css: {
      color: fields$1.labelColor,
      display: 'block',
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.xsmall,
      minWidth: 120
    }
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description)));
};
const Cell = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  const value = !!item[field.path];
  return core.jsx(CellContainer.CellContainer, null, core.jsx(fields.Checkbox, {
    disabled: true,
    checked: value,
    size: "small"
  }, core.jsx("span", {
    css: {}
  }, value ? 'True' : 'False')));
};
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), item[field.path] + '');
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: config.fieldMeta.defaultValue,
    deserialize(item) {
      const value = item[config.path];
      return typeof value === 'boolean' ? value : false;
    },
    serialize(value) {
      return {
        [config.path]: value
      };
    },
    filter: {
      Filter() {
        return null;
      },
      graphql(_ref4) {
        let {
          type
        } = _ref4;
        return {
          [config.path]: {
            equals: type === 'is'
          }
        };
      },
      Label(_ref5) {
        let {
          label
        } = _ref5;
        return label.toLowerCase();
      },
      types: {
        is: {
          label: 'is',
          initialValue: true
        },
        not: {
          label: 'is not',
          initialValue: true
        }
      }
    }
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
