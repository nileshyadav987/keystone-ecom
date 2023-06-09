'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@keystone-ui/core');
var loading = require('@keystone-ui/loading');
var button = require('@keystone-ui/button');
var router = require('next/router');
var Fields = require('../../../../../dist/Fields-c00f0a54.cjs.prod.js');
require('../../../../../dist/getRootGraphQLFieldsFromFieldController-713db5a8.cjs.prod.js');
require('react');
require('fast-deep-equal');
var PageContainer = require('../../../../../dist/PageContainer-cd0f6acb.cjs.prod.js');
var adminUi_context_dist_keystone6CoreAdminUiContext = require('../../../../../admin-ui/context/dist/keystone-6-core-admin-ui-context.cjs.prod.js');
require('@babel/runtime/helpers/extends');
require('@babel/runtime/helpers/objectWithoutProperties');
require('next/link');
require('@babel/runtime/helpers/defineProperty');
require('@keystone-ui/icons/icons/AlertTriangleIcon');
require('@keystone-ui/popover');
require('@keystone-ui/icons/icons/MoreHorizontalIcon');
require('@keystone-ui/icons/icons/ChevronRightIcon');
require('../../../../../dist/SignoutButton-9832e663.cjs.prod.js');
require('@keystone-ui/modals');
var useCreateItem = require('../../../../../dist/useCreateItem-973bf96a.cjs.prod.js');
var GraphQLErrorNotice = require('../../../../../dist/GraphQLErrorNotice-e97eb3df.cjs.prod.js');
var common = require('../../../../../dist/common-08c57dcd.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@keystone-ui/fields');
require('@emotion/weak-memoize');
require('graphql');
require('../../../../../admin-ui/router/dist/keystone-6-core-admin-ui-router.cjs.prod.js');
require('@keystone-ui/toast');
require('apollo-upload-client');
require('@emotion/hash');
require('../../../../../dist/core-ee045966.cjs.prod.js');
require('../../../../../dist/next-fields-98c83ec4.cjs.prod.js');
require('decimal.js');
require('../../../../../dist/graphql-ts-schema-e1666bd5.cjs.prod.js');
require('@graphql-ts/schema');
require('graphql-upload/GraphQLUpload.js');
require('@graphql-ts/schema/api-without-context');
require('@graphql-ts/extend');
require('@graphql-ts/schema/api-with-context');
require('@apollo/client');
require('../../../../../dist/admin-meta-graphql-bbc9d632.cjs.prod.js');
require('../../../../../dist/dataGetter-f05cf841.cjs.prod.js');
require('@keystone-ui/notice');

/** @jsxRuntime classic */
function CreatePageForm(props) {
  var _createItem$error, _createItem$error2;
  const createItem = useCreateItem.useCreateItem(props.list);
  const router$1 = router.useRouter();
  return core.jsx(core.Box, {
    paddingTop: "xlarge"
  }, createItem.error && core.jsx(GraphQLErrorNotice.GraphQLErrorNotice, {
    networkError: (_createItem$error = createItem.error) === null || _createItem$error === void 0 ? void 0 : _createItem$error.networkError,
    errors: (_createItem$error2 = createItem.error) === null || _createItem$error2 === void 0 ? void 0 : _createItem$error2.graphQLErrors
  }), core.jsx("form", {
    onSubmit: async event => {
      event.preventDefault();
      const item = await createItem.create();
      if (item) {
        router$1.push(`/${props.list.path}/${item.id}`);
      }
    }
  }, core.jsx(Fields.Fields, createItem.props), core.jsx(common.BaseToolbar, null, core.jsx(button.Button, {
    isLoading: createItem.state === 'loading',
    type: "submit",
    weight: "bold",
    tone: "active"
  }, "Create ", props.list.singular))));
}
const getCreateItemPage = props => () => core.jsx(CreateItemPage, props);
function CreateItemPage(props) {
  const list = adminUi_context_dist_keystone6CoreAdminUiContext.useList(props.listKey);
  const {
    createViewFieldModes
  } = adminUi_context_dist_keystone6CoreAdminUiContext.useKeystone();
  return core.jsx(PageContainer.PageContainer, {
    title: `Create ${list.singular}`,
    header: core.jsx(common.ItemPageHeader, {
      list: list,
      label: "Create"
    })
  }, core.jsx(common.ColumnLayout, null, core.jsx(core.Box, null, createViewFieldModes.state === 'error' && core.jsx(GraphQLErrorNotice.GraphQLErrorNotice, {
    networkError: createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined,
    errors: createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
  }), createViewFieldModes.state === 'loading' && core.jsx(loading.LoadingDots, {
    label: "Loading create form"
  }), core.jsx(CreatePageForm, {
    list: list
  }))));
}

exports.getCreateItemPage = getCreateItemPage;
