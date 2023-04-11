'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var CellContainer = require('../../../../../dist/CellContainer-7e13b005.cjs.dev.js');
var CellLink = require('../../../../../dist/CellLink-ab2a15f1.cjs.dev.js');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/button');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('next/link');
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
require('@babel/runtime/helpers/extends');
require('next/router');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-94652c56.cjs.dev.js');
require('../../../../../dist/Fields-203e4e26.cjs.dev.js');
require('fast-deep-equal');
require('@keystone-ui/notice');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.dev.js');
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
  return core.jsx(fields.FieldContainer, null, core.jsx(React.Fragment, null, core.jsx(fields.FieldLabel, {
    htmlFor: field.path
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(fields.MultiSelect, {
    id: field.path,
    isClearable: true,
    autoFocus: autoFocus,
    options: field.options,
    isDisabled: onChange === undefined,
    onChange: newVal => {
      onChange === null || onChange === void 0 ? void 0 : onChange(newVal);
    },
    value: value,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    portalMenu: true
  })));
};
const Cell = _ref2 => {
  var _item$field$path;
  let {
    item,
    field,
    linkTo
  } = _ref2;
  const value = (_item$field$path = item[field.path]) !== null && _item$field$path !== void 0 ? _item$field$path : [];
  const label = value.map(value => field.valuesToOptionsWithStringValues[value].label).join(', ');
  return linkTo ? core.jsx(CellLink.CellLink, linkTo, label) : core.jsx(CellContainer.CellContainer, null, label);
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  var _item$field$path2;
  let {
    item,
    field
  } = _ref3;
  const value = (_item$field$path2 = item[field.path]) !== null && _item$field$path2 !== void 0 ? _item$field$path2 : [];
  const label = value.map(value => field.valuesToOptionsWithStringValues[value].label).join(', ');
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), label);
};
const controller = config => {
  const optionsWithStringValues = config.fieldMeta.options.map(x => ({
    label: x.label,
    value: x.value.toString()
  }));
  const valuesToOptionsWithStringValues = Object.fromEntries(optionsWithStringValues.map(option => [option.value, option]));
  const parseValue = value => config.fieldMeta.type === 'integer' ? parseInt(value) : value;
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: config.fieldMeta.defaultValue.map(x => valuesToOptionsWithStringValues[x]),
    type: config.fieldMeta.type,
    options: optionsWithStringValues,
    valuesToOptionsWithStringValues,
    deserialize: data => {
      var _data$config$path;
      // if we get null from the GraphQL API (which will only happen if field read access control failed)
      // we'll just show it as nothing being selected for now.
      const values = (_data$config$path = data[config.path]) !== null && _data$config$path !== void 0 ? _data$config$path : [];
      const selectedOptions = values.map(x => valuesToOptionsWithStringValues[x]);
      return selectedOptions;
    },
    serialize: value => ({
      [config.path]: value.map(x => parseValue(x.value))
    })
  };
};

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
