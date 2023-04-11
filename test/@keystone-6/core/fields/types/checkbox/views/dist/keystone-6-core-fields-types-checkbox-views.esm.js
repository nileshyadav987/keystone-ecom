import { useTheme, jsx } from '@keystone-ui/core';
import { FieldContainer, Checkbox, FieldDescription, FieldLabel } from '@keystone-ui/fields';
import { C as CellContainer } from '../../../../../dist/CellContainer-fb648cf6.esm.js';
import '@babel/runtime/helpers/extends';
import 'next/router';
import 'next/link';
import '@babel/runtime/helpers/defineProperty';
import 'react';
import '@keystone-ui/button';
import '@keystone-ui/icons/icons/AlertTriangleIcon';
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
import '@keystone-ui/popover';
import '@keystone-ui/icons/icons/MoreHorizontalIcon';
import '@keystone-ui/icons/icons/ChevronRightIcon';
import '../../../../../dist/SignoutButton-ef277bf5.esm.js';
import '../../../../../dist/Fields-70a0115d.esm.js';
import 'fast-deep-equal';
import '@keystone-ui/notice';
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
  const {
    fields,
    typography,
    spacing
  } = useTheme();
  return jsx(FieldContainer, null, jsx(Checkbox, {
    autoFocus: autoFocus,
    disabled: onChange === undefined,
    onChange: event => {
      onChange === null || onChange === void 0 ? void 0 : onChange(event.target.checked);
    },
    checked: value,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`
  }, jsx("span", {
    css: {
      color: fields.labelColor,
      display: 'block',
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.xsmall,
      minWidth: 120
    }
  }, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description)));
};
const Cell = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  const value = !!item[field.path];
  return jsx(CellContainer, null, jsx(Checkbox, {
    disabled: true,
    checked: value,
    size: "small"
  }, jsx("span", {
    css: {}
  }, value ? 'True' : 'False')));
};
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), item[field.path] + '');
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

export { CardValue, Cell, Field, controller };
