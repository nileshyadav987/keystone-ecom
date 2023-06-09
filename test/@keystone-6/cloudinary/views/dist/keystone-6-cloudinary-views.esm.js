import { jsx, Stack, useTheme } from '@keystone-ui/core';
import { FieldContainer, FieldLabel, FieldDescription } from '@keystone-ui/fields';
import _extends from '@babel/runtime/helpers/esm/extends';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Pill } from '@keystone-ui/pill';
import { Button } from '@keystone-ui/button';

function useObjectURL(fileData) {
  let [objectURL, setObjectURL] = useState(undefined);
  useEffect(() => {
    if (fileData) {
      let url = URL.createObjectURL(fileData);
      setObjectURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileData]);
  return objectURL;
}
function Field(_ref) {
  let {
    autoFocus,
    field,
    value,
    onChange
  } = _ref;
  const inputRef = useRef(null);
  const errorMessage = value.kind === 'upload' ? validateImage(value.data) : undefined;
  const imagePathFromUpload = useObjectURL(errorMessage === undefined && value.kind === 'upload' ? value.data.file : undefined);
  const imagePath = value.kind === 'from-server' ? value.data.publicUrlTransformed : imagePathFromUpload;

  // Generate a random input key when the value changes, to ensure the file input is unmounted and
  // remounted (this is the only way to reset its value and ensure onChange will fire again if
  // the user selects the same file again)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputKey = useMemo(() => Math.random(), [value]);
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), jsx(FieldDescription, {
    id: `${field.path}-description`
  }, field.description), value.kind === 'from-server' || value.kind === 'upload' ? jsx(Stack, {
    gap: "small"
  }, imagePath && errorMessage === undefined && jsx(Image, {
    src: imagePath,
    alt: field.path
  }), onChange && jsx(Stack, {
    across: true,
    gap: "small",
    align: "center"
  }, jsx(Button, {
    size: "small",
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    }
  }, "Change image"), value.kind === 'from-server' && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange({
        kind: 'remove',
        previous: value
      });
    }
  }, "Remove"), value.kind === 'upload' && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange(value.previous);
    }
  }, "Cancel"), errorMessage ? jsx(Pill, {
    tone: "negative",
    weight: "light"
  }, errorMessage) : value.kind === 'upload' && jsx(Pill, {
    weight: "light",
    tone: "positive"
  }, "Save to upload this image"))) : jsx(Stack, {
    css: {
      alignItems: 'center'
    },
    gap: "small",
    across: true
  }, jsx(Button, {
    size: "small",
    disabled: onChange === undefined,
    onClick: () => {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.click();
    }
  }, "Upload Image"), value.kind === 'remove' && jsx(Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange === null || onChange === void 0 ? void 0 : onChange(value.previous);
    }
  }, "Undo removal"), value.kind === 'remove' &&
  // NOTE -- UX decision is to not display this, I think it would only be relevant
  // for deleting uploaded images (and we don't support that yet)
  // <Pill weight="light" tone="warning">
  //   Save to remove this image
  // </Pill>
  null), jsx("input", {
    css: {
      display: 'none'
    },
    autoComplete: "off",
    autoFocus: autoFocus,
    ref: inputRef,
    key: inputKey,
    name: field.path,
    onChange: _ref2 => {
      let {
        target: {
          validity,
          files
        }
      } = _ref2;
      const file = files === null || files === void 0 ? void 0 : files[0];
      if (!file) return; // bail if the user cancels from the file browser
      onChange === null || onChange === void 0 ? void 0 : onChange({
        kind: 'upload',
        data: {
          file,
          validity
        },
        previous: value
      });
    },
    type: "file",
    disabled: onChange === undefined
  }));
}
function validateImage(_ref3) {
  let {
    file,
    validity
  } = _ref3;
  if (!validity.valid) {
    return 'Something went wrong, please reload and try again.';
  }
  // check if the file is actually an image
  if (!file.type.includes('image')) {
    return 'Only image files are allowed. Please try again.';
  }
}

// ==============================
// Styled Components
// ==============================

const Image = props => {
  const theme = useTheme();
  return jsx("div", {
    css: {
      backgroundColor: 'white',
      borderRadius: theme.radii.medium,
      border: `1px solid ${theme.colors.border}`,
      flexShrink: 0,
      lineHeight: 0,
      padding: 4,
      position: 'relative',
      textAlign: 'center',
      width: 130 // 120px image + chrome
    }
  }, jsx("img", _extends({
    css: {
      height: 'auto',
      maxWidth: '100%'
    }
  }, props)));
};

/** @jsxRuntime classic */
const Cell = _ref => {
  let {
    item,
    field
  } = _ref;
  const data = item[field.path];
  if (!data) return null;
  return jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      height: 24,
      lineHeight: 0,
      width: 24
    }
  }, jsx("img", {
    alt: data.filename,
    css: {
      maxHeight: '100%',
      maxWidth: '100%'
    },
    src: data.publicUrlTransformed
  }));
};
const CardValue = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  const data = item[field.path];
  return jsx(FieldContainer, null, jsx(FieldLabel, null, field.label), data && jsx("img", {
    alt: data.filename,
    src: data.publicUrlTransformed
  }));
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {
        id
        filename
        publicUrlTransformed(transformation: { width: "120" crop: "limit" })
      }`,
    defaultValue: {
      kind: 'empty'
    },
    deserialize(item) {
      const value = item[config.path];
      if (!value) return {
        kind: 'empty'
      };
      return {
        kind: 'from-server',
        data: value
      };
    },
    validate(value) {
      return value.kind !== 'upload' || validateImage(value.data) === undefined;
    },
    serialize(value) {
      if (value.kind === 'upload') {
        return {
          [config.path]: value.data.file
        };
      }
      if (value.kind === 'remove') {
        return {
          [config.path]: null
        };
      }
      return {};
    }
  };
};

export { CardValue, Cell, Field, controller };
