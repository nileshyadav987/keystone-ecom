'use strict';

var weakMemoize = require('@emotion/weak-memoize');
var graphql = require('graphql');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);

function extractRootFields(selectedFields, selectionSet) {
  selectionSet.selections.forEach(selection => {
    if (selection.kind === 'Field') {
      selectedFields.add(selection.alias ? selection.alias.value : selection.name.value);
    }
    if (selection.kind === 'InlineFragment') {
      extractRootFields(selectedFields, selection.selectionSet);
    }
    // FragmentSpread will never happen for the use cases of getRootFieldsFromSelection
  });
}

const getRootGraphQLFieldsFromFieldController = weakMemoize__default["default"](controller => {
  const ast = graphql.parse(`fragment X on Y {
  id
  ${controller.graphqlSelection}
  }`);
  const selectedFields = new Set();
  const fragmentNode = ast.definitions[0];
  extractRootFields(selectedFields, fragmentNode.selectionSet);
  return [...selectedFields];
});

exports.getRootGraphQLFieldsFromFieldController = getRootGraphQLFieldsFromFieldController;
