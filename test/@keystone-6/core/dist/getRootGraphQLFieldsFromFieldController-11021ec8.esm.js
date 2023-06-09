import weakMemoize from '@emotion/weak-memoize';
import { parse } from 'graphql';

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

const getRootGraphQLFieldsFromFieldController = weakMemoize(controller => {
  const ast = parse(`fragment X on Y {
  id
  ${controller.graphqlSelection}
  }`);
  const selectedFields = new Set();
  const fragmentNode = ast.definitions[0];
  extractRootFields(selectedFields, fragmentNode.selectionSet);
  return [...selectedFields];
});

export { getRootGraphQLFieldsFromFieldController as g };
