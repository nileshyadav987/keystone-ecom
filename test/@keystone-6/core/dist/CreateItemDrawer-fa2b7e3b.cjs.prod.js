'use strict';

var core = require('@keystone-ui/core');
var modals = require('@keystone-ui/modals');
var loading = require('@keystone-ui/loading');
var adminUi_context_dist_keystone6CoreAdminUiContext = require('../admin-ui/context/dist/keystone-6-core-admin-ui-context.cjs.prod.js');
var Fields = require('./Fields-c00f0a54.cjs.prod.js');
var useCreateItem = require('./useCreateItem-973bf96a.cjs.prod.js');
var GraphQLErrorNotice = require('./GraphQLErrorNotice-e97eb3df.cjs.prod.js');

/** @jsxRuntime classic */
function CreateItemDrawer(_ref) {
  var _createItemState$erro, _createItemState$erro2;
  let {
    listKey,
    onClose,
    onCreate
  } = _ref;
  const {
    createViewFieldModes
  } = adminUi_context_dist_keystone6CoreAdminUiContext.useKeystone();
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(listKey);
  const createItemState = useCreateItem.useCreateItem(list);
  return core.jsx(modals.Drawer, {
    title: `Create ${list.singular}`,
    width: "wide",
    actions: {
      confirm: {
        label: `Create ${list.singular}`,
        loading: createItemState.state === 'loading',
        action: async () => {
          const item = await createItemState.create();
          if (item) {
            onCreate({
              id: item.id,
              label: item.label || item.id
            });
          }
        }
      },
      cancel: {
        label: 'Cancel',
        action: () => {
          if (!createItemState.shouldPreventNavigation || window.confirm('There are unsaved changes, are you sure you want to exit?')) {
            onClose();
          }
        }
      }
    }
  }, createViewFieldModes.state === 'error' && core.jsx(GraphQLErrorNotice.GraphQLErrorNotice, {
    networkError: createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined,
    errors: createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
  }), createViewFieldModes.state === 'loading' && core.jsx(loading.LoadingDots, {
    label: "Loading create form"
  }), createItemState.error && core.jsx(GraphQLErrorNotice.GraphQLErrorNotice, {
    networkError: (_createItemState$erro = createItemState.error) === null || _createItemState$erro === void 0 ? void 0 : _createItemState$erro.networkError,
    errors: (_createItemState$erro2 = createItemState.error) === null || _createItemState$erro2 === void 0 ? void 0 : _createItemState$erro2.graphQLErrors
  }), core.jsx(core.Box, {
    paddingY: "xlarge"
  }, core.jsx(Fields.Fields, createItemState.props)));
}

exports.CreateItemDrawer = CreateItemDrawer;
