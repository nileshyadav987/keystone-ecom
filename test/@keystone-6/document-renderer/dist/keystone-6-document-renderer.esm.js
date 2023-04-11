import React, { Fragment } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

const defaultRenderers = {
  inline: {
    bold: 'strong',
    code: 'code',
    keyboard: 'kbd',
    strikethrough: 's',
    italic: 'em',
    link: 'a',
    subscript: 'sub',
    superscript: 'sup',
    underline: 'u',
    relationship: _ref => {
      let {
        data
      } = _ref;
      return /*#__PURE__*/React.createElement("span", null, (data === null || data === void 0 ? void 0 : data.label) || (data === null || data === void 0 ? void 0 : data.id));
    }
  },
  block: {
    block: 'div',
    blockquote: 'blockquote',
    paragraph: _ref2 => {
      let {
        children,
        textAlign
      } = _ref2;
      return /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign
        }
      }, children);
    },
    divider: 'hr',
    heading: _ref3 => {
      let {
        level,
        children,
        textAlign
      } = _ref3;
      let Heading = `h${level}`;
      return /*#__PURE__*/React.createElement(Heading, {
        style: {
          textAlign
        },
        children: children
      });
    },
    code: 'pre',
    list: _ref4 => {
      let {
        children,
        type
      } = _ref4;
      const List = type === 'ordered' ? 'ol' : 'ul';
      return /*#__PURE__*/React.createElement(List, null, children.map((x, i) => /*#__PURE__*/React.createElement("li", {
        key: i
      }, x)));
    },
    layout: _ref5 => {
      let {
        children,
        layout
      } = _ref5;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: layout.map(x => `${x}fr`).join(' ')
        }
      }, children.map((element, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, element)));
    }
  }
};
function DocumentNode(_ref6) {
  let {
    node: _node,
    componentBlocks,
    renderers
  } = _ref6;
  if (typeof _node.text === 'string') {
    let child = /*#__PURE__*/React.createElement(Fragment, null, _node.text);
    Object.keys(renderers.inline).forEach(markName => {
      if (markName !== 'link' && markName !== 'relationship' && _node[markName]) {
        const Mark = renderers.inline[markName];
        child = /*#__PURE__*/React.createElement(Mark, null, child);
      }
    });
    return child;
  }
  const node = _node;
  const children = node.children.map((x, i) => /*#__PURE__*/React.createElement(DocumentNode, {
    node: x,
    componentBlocks: componentBlocks,
    renderers: renderers,
    key: i
  }));
  switch (node.type) {
    case 'blockquote':
      {
        return /*#__PURE__*/React.createElement(renderers.block.blockquote, {
          children: children
        });
      }
    case 'paragraph':
      {
        return /*#__PURE__*/React.createElement(renderers.block.paragraph, {
          textAlign: node.textAlign,
          children: children
        });
      }
    case 'code':
      {
        if (node.children.length === 1 && node.children[0] && typeof node.children[0].text === 'string') {
          return /*#__PURE__*/React.createElement(renderers.block.code, null, node.children[0].text);
        }
        break;
      }
    case 'layout':
      {
        return /*#__PURE__*/React.createElement(renderers.block.layout, {
          layout: node.layout,
          children: children
        });
      }
    case 'divider':
      {
        return /*#__PURE__*/React.createElement(renderers.block.divider, null);
      }
    case 'heading':
      {
        return /*#__PURE__*/React.createElement(renderers.block.heading, {
          textAlign: node.textAlign,
          level: node.level,
          children: children
        });
      }
    case 'component-block':
      {
        const Comp = componentBlocks[node.component];
        if (Comp) {
          const props = createComponentBlockProps(node, children);
          return /*#__PURE__*/React.createElement(renderers.block.block, null, /*#__PURE__*/React.createElement(Comp, props));
        }
        break;
      }
    case 'ordered-list':
    case 'unordered-list':
      {
        return /*#__PURE__*/React.createElement(renderers.block.list, {
          children: children,
          type: node.type === 'ordered-list' ? 'ordered' : 'unordered'
        });
      }
    case 'relationship':
      {
        const data = node.data;
        return /*#__PURE__*/React.createElement(renderers.inline.relationship, {
          relationship: node.relationship,
          data: data ? {
            id: data.id,
            label: data.label,
            data: data.data
          } : null
        });
      }
    case 'link':
      {
        return /*#__PURE__*/React.createElement(renderers.inline.link, {
          href: node.href
        }, children);
      }
  }
  return /*#__PURE__*/React.createElement(Fragment, null, children);
}
function set(obj, propPath, value) {
  if (propPath.length === 1) {
    obj[propPath[0]] = value;
  } else {
    let firstElement = propPath.shift();
    set(obj[firstElement], propPath, value);
  }
}
function createComponentBlockProps(node, children) {
  const formProps = JSON.parse(JSON.stringify(node.props));
  node.children.forEach((child, i) => {
    if (child.propPath) {
      const propPath = [...child.propPath];
      set(formProps, propPath, children[i]);
    }
  });
  return formProps;
}
function DocumentRenderer(props) {
  var _props$renderers, _props$renderers2;
  const renderers = {
    inline: _objectSpread2(_objectSpread2({}, defaultRenderers.inline), (_props$renderers = props.renderers) === null || _props$renderers === void 0 ? void 0 : _props$renderers.inline),
    block: _objectSpread2(_objectSpread2({}, defaultRenderers.block), (_props$renderers2 = props.renderers) === null || _props$renderers2 === void 0 ? void 0 : _props$renderers2.block)
  };
  const componentBlocks = props.componentBlocks || {};
  return /*#__PURE__*/React.createElement(Fragment, null, props.document.map((x, i) => /*#__PURE__*/React.createElement(DocumentNode, {
    node: x,
    componentBlocks: componentBlocks,
    renderers: renderers,
    key: i
  })));
}

export { DocumentRenderer, defaultRenderers };
