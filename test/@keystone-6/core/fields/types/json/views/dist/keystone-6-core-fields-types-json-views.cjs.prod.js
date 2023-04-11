'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var CellContainer = require('../../../../../dist/CellContainer-b04c3489.cjs.prod.js');
var CellLink = require('../../../../../dist/CellLink-d6c129c8.cjs.prod.js');
require('@babel/runtime/helpers/defineProperty');
require('react');
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
  let {
    field,
    forceValidation,
    value,
    onChange,
    autoFocus
  } = _ref;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(core.Stack, null, core.jsx(fields.TextArea, {
    id: field.path,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    readOnly: onChange === undefined,
    css: _objectSpread({
      fontFamily: 'monospace'
    }, !onChange && {
      backgroundColor: '#eff3f6',
      border: '1px solid transparent',
      '&:focus-visible': {
        outline: 0,
        backgroundColor: '#eff3f6',
        boxShadow: '0 0 0 2px #e1e5e9',
        border: '1px solid #b1b5b9'
      }
    }),
    autoFocus: autoFocus,
    onChange: event => onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value),
    value: value
  }), forceValidation && core.jsx(core.Text, {
    color: "red600",
    size: "small"
  }, 'Invalid JSON')));
};
const Cell = _ref2 => {
  let {
    item,
    field,
    linkTo
  } = _ref2;
  let value = item[field.path] + '';
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, value) : core.jsx(CellContainer.CellContainer, null, value);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), item[field.path]);
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: config.fieldMeta.defaultValue === null ? '' : JSON.stringify(config.fieldMeta.defaultValue, null, 2),
    validate: value => {
      if (!value) return true;
      try {
        JSON.parse(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    deserialize: data => {
      const value = data[config.path];
      // null is equivalent to Prisma.DbNull, and we show that as an empty input
      if (value === null) return '';
      return JSON.stringify(value, null, 2);
    },
    serialize: value => {
      if (!value) return {
        [config.path]: null
      };
      try {
        return {
          [config.path]: JSON.parse(value)
        };
      } catch (e) {
        return {
          [config.path]: undefined
        };
      }
    }
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
