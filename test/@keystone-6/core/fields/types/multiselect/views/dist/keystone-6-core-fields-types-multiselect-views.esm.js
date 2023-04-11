import { Fragment } from 'react';
import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription, MultiSelect } from '@keystone-ui/fields';
import { C as CellContainer } from '../../../../../dist/CellContainer-fb648cf6.esm.js';
import { C as CellLink } from '../../../../../dist/CellLink-47af0f3a.esm.js';
import '@babel/runtime/helpers/defineProperty';
import '@keystone-ui/button';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
import 'next/link';
import '@keystone-ui/toast';
import '@keystone-ui/loading';
import '@keystone-ui/modals';
import 'apollo-upload-client';
import '@babel/runtime/helpers/objectSpread2';
import '@emotion/hash';
import '../../../../../dist/next-fields-d3605624.esm.js';
import '../../../../../dist/graphql-ts-schema-9020a95a.esm.js';
import '@apollo/client';
import '../../../../../dist/admin-meta-graphql-81d6aaf0.esm.js';
import '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/extends';
import 'next/router';
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import '../../../../../dist/Fields-70a0115d.esm.js';
import 'fast-deep-equal';
import '@keystone-ui/notice';
import '../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.esm.js';
import 'decimal.js';
import '@graphql-ts/schema/api-without-context';
import '@graphql-ts/schema';
import 'graphql-upload/GraphQLUpload.js';
import 'graphql';
import '@graphql-ts/extend';
import '@graphql-ts/schema/api-with-context';

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value,
    onChange,
    autoFocus
  } = _ref;
  return jsx(FieldContainer, null, jsx(Fragment, null, jsx(FieldLabel, {
    htmlFor: field.path
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), jsx(MultiSelect, {
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
  return linkTo ? jsx(CellLink, linkTo, label) : jsx(CellContainer, null, label);
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
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), label);
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

export { CardValue, Cell, Field, controller };
