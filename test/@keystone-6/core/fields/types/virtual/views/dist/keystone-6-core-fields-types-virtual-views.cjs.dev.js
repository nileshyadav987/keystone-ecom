'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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
    prettyData = /*#__PURE__*/React__default["default"].createElement("pre", null, stringify(data));
  } else {
    prettyData = /*#__PURE__*/React__default["default"].createElement("pre", null, stringify(data));
  }
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, prettyData);
}

/** @jsxRuntime classic */
const Field = _ref => {
  let {
    field,
    value
  } = _ref;
  return value === createViewValue ? null : core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(PrettyData, {
    data: value
  }));
};
const Cell = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  return core.jsx(PrettyData, {
    data: item[field.path]
  });
};
const CardValue = _ref3 => {
  let {
    item,
    field
  } = _ref3;
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), core.jsx(PrettyData, {
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

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
