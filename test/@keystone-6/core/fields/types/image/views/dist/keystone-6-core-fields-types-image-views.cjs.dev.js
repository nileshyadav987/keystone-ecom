'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var fields = require('@keystone-ui/fields');
var bytes = require('bytes');
var React = require('react');
var button = require('@keystone-ui/button');
var fields_types_image_utils_dist_keystone6CoreFieldsTypesImageUtils = require('../../utils/dist/keystone-6-core-fields-types-image-utils.cjs.dev.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var bytes__default = /*#__PURE__*/_interopDefault(bytes);

/** @jsxRuntime classic */
function useObjectURL(fileData) {
  let [objectURL, setObjectURL] = React.useState(undefined);
  React.useEffect(() => {
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
  const inputRef = React.useRef(null);
  const errorMessage = createErrorMessage(value);
  const onUploadChange = _ref2 => {
    let {
      currentTarget: {
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
  };

  // Generate a random input key when the value changes, to ensure the file input is unmounted and
  // remounted (this is the only way to reset its value and ensure onChange will fire again if
  // the user selects the same file again)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputKey = React.useMemo(() => Math.random(), [value]);
  const accept = React.useMemo(() => fields_types_image_utils_dist_keystone6CoreFieldsTypesImageUtils.SUPPORTED_IMAGE_EXTENSIONS.map(ext => [`.${ext}`, `image/${ext}`].join(', ')).join(', '), []);
  return core.jsx(fields.FieldContainer, {
    as: "fieldset"
  }, core.jsx(fields.FieldLabel, {
    as: "legend"
  }, field.label), core.jsx(fields.FieldDescription, {
    id: `${field.path}-description`
  }, field.description), core.jsx(ImgView, {
    errorMessage: errorMessage,
    value: value,
    onChange: onChange,
    field: field,
    inputRef: inputRef
  }), core.jsx("input", {
    css: {
      display: 'none'
    },
    autoComplete: "off",
    autoFocus: autoFocus,
    ref: inputRef,
    key: inputKey,
    name: field.path,
    onChange: onUploadChange,
    type: "file",
    accept: accept,
    "aria-describedby": field.description === null ? undefined : `${field.path}-description`,
    disabled: onChange === undefined
  }), errorMessage && core.jsx("span", {
    css: {
      display: 'block',
      marginTop: '8px',
      color: 'red'
    }
  }, errorMessage));
}
function ImgView(_ref3) {
  let {
    errorMessage,
    value,
    onChange,
    field,
    inputRef
  } = _ref3;
  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0
  });
  const imagePathFromUpload = useObjectURL(errorMessage === undefined && value.kind === 'upload' ? value.data.file : undefined);
  const imageSrc = value.kind === 'from-server' ? value.data.src : imagePathFromUpload;
  return core.jsx(core.Stack, {
    gap: "small",
    across: true,
    align: "end"
  }, core.jsx(ImageWrapper, {
    url: value.kind === 'from-server' ? imageSrc : undefined
  }, errorMessage || value.kind !== 'from-server' && value.kind !== 'upload' ? core.jsx(Placeholder, null) : core.jsx(React.Fragment, null, value.kind === 'upload' && core.jsx("div", {
    css: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      color: 'white',
      textAlign: 'center',
      wordWrap: 'break-word',
      display: 'flex',
      alignItems: 'center',
      padding: '25px',
      backgroundColor: 'rgba(17, 24, 39, 0.65)',
      lineHeight: '1.15',
      fontWeight: 500
    }
  }, "Save to complete upload"), core.jsx("img", {
    onLoad: event => {
      if (value.kind === 'upload') {
        setImageDimensions({
          width: event.currentTarget.naturalWidth,
          height: event.currentTarget.naturalHeight
        });
      }
    },
    css: {
      objectFit: 'contain',
      width: '100%',
      height: '100%'
    },
    alt: `Image uploaded to ${field.path} field`,
    src: imageSrc
  }))), value.kind === 'from-server' || value.kind === 'upload' ? onChange && core.jsx(core.Stack, {
    gap: "small",
    css: {
      height: '120px',
      justifyContent: 'flex-end'
    }
  }, errorMessage === undefined ? core.jsx(ImageMeta, value.kind === 'from-server' ? {
    width: value.data.width,
    height: value.data.height,
    url: value.data.src,
    name: `${value.data.id}.${value.data.extension}`,
    size: value.data.filesize
  } : {
    width: imageDimensions.width,
    height: imageDimensions.height,
    size: value.data.file.size
  }) : null, core.jsx(core.Stack, {
    across: true,
    gap: "small",
    align: "center"
  }, core.jsx(button.Button, {
    size: "small",
    onClick: () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.click();
    }
  }, "Change"), value.kind === 'from-server' && core.jsx(button.Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange({
        kind: 'remove',
        previous: value
      });
    }
  }, "Remove"), value.kind === 'upload' && core.jsx(button.Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      onChange(value.previous);
    }
  }, "Cancel"))) : core.jsx(core.Stack, {
    across: true,
    gap: "small",
    align: "center"
  }, core.jsx(button.Button, {
    size: "small",
    disabled: onChange === undefined,
    onClick: () => {
      var _inputRef$current2;
      (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.click();
    }
  }, "Upload Image"), value.kind === 'remove' && value.previous && core.jsx(button.Button, {
    size: "small",
    tone: "negative",
    onClick: () => {
      if (value.previous !== undefined) {
        onChange === null || onChange === void 0 ? void 0 : onChange(value === null || value === void 0 ? void 0 : value.previous);
      }
    }
  }, "Undo removal")));
}
function createErrorMessage(value) {
  if (value.kind === 'upload') {
    return validateImage(value.data);
  }
}
function validateImage(_ref4) {
  let {
    file,
    validity
  } = _ref4;
  if (!validity.valid) {
    return 'Something went wrong, please reload and try again.';
  }
  // check if the file is actually an image
  if (!file.type.includes('image')) {
    return `Sorry, that file type isn't accepted. Please try ${fields_types_image_utils_dist_keystone6CoreFieldsTypesImageUtils.SUPPORTED_IMAGE_EXTENSIONS.reduce((acc, curr, currentIndex) => {
      if (currentIndex === fields_types_image_utils_dist_keystone6CoreFieldsTypesImageUtils.SUPPORTED_IMAGE_EXTENSIONS.length - 1) {
        acc += ` or .${curr}`;
      } else if (currentIndex > 0) {
        acc += `, .${curr}`;
      } else {
        acc += `.${curr}`;
      }
      return acc;
    }, '')}.`;
  }
}

// ==============================
// Styled Components
// ==============================

const ImageMeta = _ref5 => {
  let {
    width = 0,
    height = 0,
    size
  } = _ref5;
  return core.jsx(core.Stack, {
    padding: "xxsmall",
    gap: "xxsmall"
  }, core.jsx(core.Text, {
    size: "small"
  }, "Size: ", `${bytes__default["default"](size)}`), core.jsx(core.Text, {
    size: "small"
  }, "Dimensions: ", `${width} x ${height}`));
};
const ImageWrapper = _ref6 => {
  let {
    children,
    url
  } = _ref6;
  if (url) {
    return core.jsx("a", {
      css: {
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        flexShrink: 0,
        lineHeight: 0,
        backgroundColor: '#fafbfc',
        borderRadius: '6px',
        textAlign: 'center',
        width: '120px',
        // 120px image + chrome
        height: '120px',
        border: '1px solid #e1e5e9'
      },
      target: "_blank",
      href: url
    }, children);
  }
  return core.jsx("div", {
    css: {
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
      lineHeight: 0,
      backgroundColor: '#fafbfc',
      borderRadius: '6px',
      textAlign: 'center',
      width: '120px',
      // 120px image + chrome
      height: '120px',
      border: '1px solid #e1e5e9'
    }
  }, children);
};
const Placeholder = () => {
  return core.jsx("svg", {
    css: {
      width: '100%',
      height: '100%'
    },
    width: "120",
    height: "120",
    viewBox: "0 0 121 121",
    xmlns: "http://www.w3.org/2000/svg"
  }, core.jsx("path", {
    d: "M47.8604 45.6729H72.8604C73.5234 45.6729 74.1593 45.9362 74.6281 46.4051C75.097 46.8739 75.3604 47.5098 75.3604 48.1729V73.1729C75.3604 73.8359 75.097 74.4718 74.6281 74.9406C74.1593 75.4095 73.5234 75.6729 72.8604 75.6729H47.8604C47.1973 75.6729 46.5614 75.4095 46.0926 74.9406C45.6237 74.4718 45.3604 73.8359 45.3604 73.1729V48.1729C45.3604 47.5098 45.6237 46.8739 46.0926 46.4051C46.5614 45.9362 47.1973 45.6729 47.8604 45.6729ZM47.8604 65.6729V73.1729H72.8604V70.6729L66.6104 64.4229L64.6229 66.4104C64.1544 66.876 63.5208 67.1373 62.8604 67.1373C62.1999 67.1373 61.5663 66.876 61.0979 66.4104L54.1104 59.4229L47.8604 65.6729ZM68.3729 62.6479L72.8604 67.1354V48.1729H47.8604V62.1354L52.3479 57.6479C52.8163 57.1822 53.4499 56.9209 54.1104 56.9209C54.7708 56.9209 55.4044 57.1822 55.8729 57.6479L62.8604 64.6354L64.8479 62.6479C65.3163 62.1822 65.9499 61.9209 66.6104 61.9209C67.2708 61.9209 67.9044 62.1822 68.3729 62.6479ZM66.1937 57.5409C65.5771 57.9529 64.852 58.1729 64.1104 58.1729C63.1158 58.1729 62.162 57.7778 61.4587 57.0745C60.7554 56.3712 60.3604 55.4174 60.3604 54.4229C60.3604 53.6812 60.5803 52.9561 60.9923 52.3395C61.4044 51.7228 61.9901 51.2421 62.6753 50.9583C63.3605 50.6745 64.1145 50.6002 64.8419 50.7449C65.5694 50.8896 66.2376 51.2468 66.762 51.7712C67.2864 52.2956 67.6436 52.9638 67.7883 53.6913C67.933 54.4187 67.8587 55.1727 67.5749 55.8579C67.2911 56.5431 66.8104 57.1288 66.1937 57.5409ZM64.8048 53.3835C64.5993 53.2462 64.3576 53.1729 64.1104 53.1729C63.7788 53.1729 63.4609 53.3046 63.2265 53.539C62.992 53.7734 62.8604 54.0913 62.8604 54.4229C62.8604 54.6701 62.9337 54.9118 63.071 55.1173C63.2084 55.3229 63.4036 55.4831 63.632 55.5777C63.8604 55.6723 64.1117 55.6971 64.3542 55.6488C64.5967 55.6006 64.8194 55.4816 64.9942 55.3067C65.1691 55.1319 65.2881 54.9092 65.3363 54.6667C65.3846 54.4242 65.3598 54.1729 65.2652 53.9445C65.1706 53.7161 65.0104 53.5209 64.8048 53.3835Z",
    fill: "#b1b5b9"
  }));
};

/** @jsxRuntime classic */
const Cell = _ref => {
  let {
    item,
    field
  } = _ref;
  const data = item[field.path];
  if (!data) return null;
  return core.jsx("div", {
    css: {
      alignItems: 'center',
      display: 'flex',
      height: 24,
      lineHeight: 0,
      width: 24
    }
  }, core.jsx("img", {
    alt: data.filename,
    css: {
      maxHeight: '100%',
      maxWidth: '100%'
    },
    src: data.url
  }));
};
const CardValue = _ref2 => {
  let {
    item,
    field
  } = _ref2;
  const data = item[field.path];
  return core.jsx(fields.FieldContainer, null, core.jsx(fields.FieldLabel, null, field.label), data && core.jsx(ImageWrapper, null, core.jsx("img", {
    css: {
      width: '100%'
    },
    alt: data.filename,
    src: data.url
  })));
};
const controller = config => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: `${config.path} {
        url
        id
        extension
        width
        height
        filesize
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
        data: {
          src: value.url,
          id: value.id,
          extension: value.extension,
          ref: value.ref,
          width: value.width,
          height: value.height,
          filesize: value.filesize
        }
      };
    },
    validate(value) {
      return value.kind !== 'upload' || validateImage(value.data) === undefined;
    },
    serialize(value) {
      if (value.kind === 'upload') {
        return {
          [config.path]: {
            upload: value.data.file
          }
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

exports.CardValue = CardValue;
exports.Cell = Cell;
exports.Field = Field;
exports.controller = controller;
