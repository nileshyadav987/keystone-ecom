import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import { useState } from 'react';
import { jsx, Stack, Inline, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription, DatePicker } from '@keystone-ui/fields';
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

const Field = _ref => {
  var _value$value;
  let {
    field,
    value,
    onChange,
    forceValidation
  } = _ref;
  const [touchedInput, setTouchedInput] = useState(false);
  const showValidation = touchedInput || forceValidation;
  const validationMessage = showValidation ? validate(value, field.fieldMeta, field.label) : undefined;
  return jsx(FieldContainer, null, jsx(Stack, null, jsx(FieldLabel, null, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), onChange ? jsx(Inline, {
    gap: "small"
  }, jsx(Stack, null, jsx(DatePicker, {
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
  }), validationMessage && jsx(Text, {
    color: "red600",
    size: "small"
  }, validationMessage))) : value.value !== null && jsx(Text, null, formatOutput(value.value))));
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
  return linkTo ? jsx(CellLink, linkTo, formatOutput(value)) : jsx(CellContainer, null, formatOutput(value));
};
Cell.supportsLinkTo = true;
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), formatOutput(item[field.path]));
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

export { CardValue, Cell, Field, controller };
