import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { graphql } from '@keystone-6/core';
import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, TextInput, Select, MultiSelect, Checkbox } from '@keystone-ui/fields';
import { useState } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';

function isValidURL(url) {
  return url === sanitizeUrl(url);
}

const _excluded = ["children"];
const fields = {
  text(_ref) {
    let {
      label,
      defaultValue = ''
    } = _ref;
    return {
      kind: 'form',
      Input(_ref2) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref2;
        return jsx(FieldContainer, null, jsx(FieldLabel, null, label), jsx(TextInput, {
          autoFocus: autoFocus,
          value: value,
          onChange: event => {
            onChange(event.target.value);
          }
        }));
      },
      options: undefined,
      defaultValue,
      validate(value) {
        return typeof value === 'string';
      },
      graphql: {
        input: graphql.String,
        output: graphql.field({
          type: graphql.String
        })
      }
    };
  },
  integer(_ref3) {
    let {
      label,
      defaultValue = 0
    } = _ref3;
    const validate = value => {
      return typeof value === 'number' && Number.isFinite(value);
    };
    return {
      kind: 'form',
      Input(_ref4) {
        let {
          value,
          onChange,
          autoFocus,
          forceValidation
        } = _ref4;
        const [blurred, setBlurred] = useState(false);
        const [inputValue, setInputValue] = useState(String(value));
        const showValidation = forceValidation || blurred && !validate(value);
        return jsx(FieldContainer, null, jsx(FieldLabel, null, label), jsx(TextInput, {
          onBlur: () => setBlurred(true),
          autoFocus: autoFocus,
          value: inputValue,
          onChange: event => {
            const raw = event.target.value;
            setInputValue(raw);
            if (/^[+-]?\d+$/.test(raw)) {
              onChange(Number(raw));
            } else {
              onChange(NaN);
            }
          }
        }), showValidation && jsx("span", {
          css: {
            color: 'red'
          }
        }, "Please specify an integer"));
      },
      options: undefined,
      defaultValue,
      validate,
      graphql: {
        input: graphql.Int,
        output: graphql.field({
          type: graphql.Int
        })
      }
    };
  },
  url(_ref5) {
    let {
      label,
      defaultValue = ''
    } = _ref5;
    const validate = value => {
      return typeof value === 'string' && (value === '' || isValidURL(value));
    };
    return {
      kind: 'form',
      Input(_ref6) {
        let {
          value,
          onChange,
          autoFocus,
          forceValidation
        } = _ref6;
        const [blurred, setBlurred] = useState(false);
        const showValidation = forceValidation || blurred && !validate(value);
        return jsx(FieldContainer, null, jsx(FieldLabel, null, label), jsx(TextInput, {
          onBlur: () => setBlurred(true),
          autoFocus: autoFocus,
          value: value,
          onChange: event => {
            onChange(event.target.value);
          }
        }), showValidation && jsx("span", {
          css: {
            color: 'red'
          }
        }, "Please provide a valid URL"));
      },
      options: undefined,
      defaultValue,
      validate,
      graphql: {
        input: graphql.String,
        output: graphql.field({
          type: graphql.String
        })
      }
    };
  },
  select(_ref7) {
    let {
      label,
      options,
      defaultValue
    } = _ref7;
    const optionValuesSet = new Set(options.map(x => x.value));
    if (!optionValuesSet.has(defaultValue)) {
      throw new Error(`A defaultValue of ${defaultValue} was provided to a select field but it does not match the value of one of the options provided`);
    }
    return {
      kind: 'form',
      Input(_ref8) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref8;
        return jsx(FieldContainer, null, jsx(FieldLabel, null, label), jsx(Select, {
          autoFocus: autoFocus,
          value: options.find(option => option.value === value) || null,
          onChange: option => {
            if (option) {
              onChange(option.value);
            }
          },
          options: options
        }));
      },
      options,
      defaultValue,
      validate(value) {
        return typeof value === 'string' && optionValuesSet.has(value);
      },
      graphql: {
        input: graphql.String,
        output: graphql.field({
          type: graphql.String,
          // TODO: investigate why this resolve is required here
          resolve(_ref9) {
            let {
              value
            } = _ref9;
            return value;
          }
        })
      }
    };
  },
  multiselect(_ref10) {
    let {
      label,
      options,
      defaultValue
    } = _ref10;
    const valuesToOption = new Map(options.map(x => [x.value, x]));
    return {
      kind: 'form',
      Input(_ref11) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref11;
        return jsx(FieldContainer, null, jsx(FieldLabel, null, label), jsx(MultiSelect, {
          autoFocus: autoFocus,
          value: value.map(x => valuesToOption.get(x)),
          options: options,
          onChange: options => {
            onChange(options.map(x => x.value));
          }
        }));
      },
      options,
      defaultValue,
      validate(value) {
        return Array.isArray(value) && value.every(value => typeof value === 'string' && valuesToOption.has(value));
      },
      graphql: {
        input: graphql.list(graphql.nonNull(graphql.String)),
        output: graphql.field({
          type: graphql.list(graphql.nonNull(graphql.String)),
          // TODO: investigate why this resolve is required here
          resolve(_ref12) {
            let {
              value
            } = _ref12;
            return value;
          }
        })
      }
    };
  },
  checkbox(_ref13) {
    let {
      label,
      defaultValue = false
    } = _ref13;
    return {
      kind: 'form',
      Input(_ref14) {
        let {
          value,
          onChange,
          autoFocus
        } = _ref14;
        return jsx(FieldContainer, null, jsx(Checkbox, {
          checked: value,
          autoFocus: autoFocus,
          onChange: event => {
            onChange(event.target.checked);
          }
        }, label));
      },
      options: undefined,
      defaultValue,
      validate(value) {
        return typeof value === 'boolean';
      },
      graphql: {
        input: graphql.Boolean,
        output: graphql.field({
          type: graphql.Boolean
        })
      }
    };
  },
  empty() {
    return {
      kind: 'form',
      Input() {
        return null;
      },
      options: undefined,
      defaultValue: null,
      validate(value) {
        return value === null || value === undefined;
      }
    };
  },
  child(options) {
    return {
      kind: 'child',
      options: options.kind === 'block' ? {
        kind: 'block',
        placeholder: options.placeholder,
        dividers: options.dividers,
        formatting: options.formatting === 'inherit' ? {
          blockTypes: 'inherit',
          headingLevels: 'inherit',
          inlineMarks: 'inherit',
          listTypes: 'inherit',
          alignment: 'inherit',
          softBreaks: 'inherit'
        } : options.formatting,
        links: options.links,
        relationships: options.relationships
      } : {
        kind: 'inline',
        placeholder: options.placeholder,
        formatting: options.formatting === 'inherit' ? {
          inlineMarks: 'inherit',
          softBreaks: 'inherit'
        } : options.formatting,
        links: options.links,
        relationships: options.relationships
      }
    };
  },
  object(fields) {
    return {
      kind: 'object',
      fields
    };
  },
  conditional(discriminant, values) {
    if ((discriminant.validate('true') || discriminant.validate('false')) && (discriminant.validate(true) || discriminant.validate(false))) {
      throw new Error('The discriminant of a conditional field only supports string values, or boolean values, not both.');
    }
    return {
      kind: 'conditional',
      discriminant,
      values: values
    };
  },
  relationship(_ref15) {
    let {
      listKey,
      selection,
      label,
      many
    } = _ref15;
    return {
      kind: 'relationship',
      listKey,
      selection,
      label,
      many: many ? true : false
    };
  },
  array(element, opts) {
    return {
      kind: 'array',
      element,
      label: opts === null || opts === void 0 ? void 0 : opts.label
    };
  }
};
function component(options) {
  return options;
}
const NotEditable = _ref16 => {
  let {
      children
    } = _ref16,
    props = _objectWithoutProperties(_ref16, _excluded);
  return jsx("span", _extends({
    css: {
      userSelect: 'none'
    },
    contentEditable: false
  }, props), children);
};

export { NotEditable as N, component as c, fields as f, isValidURL as i };
