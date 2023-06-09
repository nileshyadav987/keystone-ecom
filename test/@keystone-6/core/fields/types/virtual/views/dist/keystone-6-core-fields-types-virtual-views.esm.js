import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';
import React, { Fragment } from 'react';

// We don't know what type of data we're getting back from a Virtual-field
// but I'd like to present it as best as possible.
// ToDo: Better presentation for more types of data

const stringify = data => {
  const omitTypename = (key, value) => key === '__typename' ? undefined : value;
  const dataWithoutTypename = JSON.parse(JSON.stringify(data), omitTypename);
  return JSON.stringify(dataWithoutTypename, null, 2);
};
function PrettyData(_ref) {
  let {
    data
  } = _ref;
  if (data === undefined || data === null) return null;
  let prettyData = '';
  if (typeof data === 'string') prettyData = data;else if (typeof data === 'number') prettyData = data;else if (typeof data === 'object') {
    prettyData = /*#__PURE__*/React.createElement("pre", null, stringify(data));
  } else {
    prettyData = /*#__PURE__*/React.createElement("pre", null, stringify(data));
  }
  return /*#__PURE__*/React.createElement(Fragment, null, prettyData);
}

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value
  } = _ref;
  return value === createViewValue ? null : jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), jsx(PrettyData, {
    data: value
  }));
};
const Cell = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  return jsx(PrettyData, {
    data: item[field.path]
  });
};
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), jsx(PrettyData, {
    data: item[field.path]
  }));
};
const createViewValue = Symbol('create view virtual field value');
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path}${config.fieldMeta.query}`,
    defaultValue: createViewValue,
    deserialize: data => {
      return data[config.path];
    },
    serialize: () => ({})
  };
};

export { CardValue, Cell, Field, controller };
