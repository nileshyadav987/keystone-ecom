'use strict';

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var pLimit = require('p-limit');
var core = require('./core-3a9d46a1.cjs.dev.js');
var nextFields = require('./next-fields-112c1555.cjs.dev.js');
var graphqlTsSchema = require('./graphql-ts-schema-db7cad71.cjs.dev.js');
var createAdminMeta = require('./createAdminMeta-1cd6fe5b.cjs.dev.js');
var graphqlTsSchema$1 = require('@graphql-ts/schema');
var graphql$1 = require('graphql');
var _classPrivateFieldInitSpec = require('@babel/runtime/helpers/classPrivateFieldInitSpec');
var _classPrivateFieldGet = require('@babel/runtime/helpers/classPrivateFieldGet');
var _classPrivateFieldSet = require('@babel/runtime/helpers/classPrivateFieldSet');
var typesForLists = require('./types-for-lists-e86af58f.cjs.dev.js');
var graphqlErrors = require('./graphql-errors-0bcd0ecf.cjs.dev.js');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var apiWithoutContext = require('@graphql-ts/schema/api-without-context');
var apiWithContext = require('@graphql-ts/schema/api-with-context');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var uuid = require('uuid');
var fromBuffer = require('image-type');
var imageSize = require('image-size');
var path = require('path');
var stream = require('stream');
var fs = require('fs-extra');
var s3RequestPresigner = require('@aws-sdk/s3-request-presigner');
var clientS3 = require('@aws-sdk/client-s3');
var libStorage = require('@aws-sdk/lib-storage');
var crypto = require('crypto');
var filenamify = require('filenamify');
var slugify = require('@sindresorhus/slugify');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var pLimit__default = /*#__PURE__*/_interopDefault(pLimit);
var fromBuffer__default = /*#__PURE__*/_interopDefault(fromBuffer);
var imageSize__default = /*#__PURE__*/_interopDefault(imageSize);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var crypto__default = /*#__PURE__*/_interopDefault(crypto);
var filenamify__default = /*#__PURE__*/_interopDefault(filenamify);
var slugify__default = /*#__PURE__*/_interopDefault(slugify);

const graphql = _objectSpread(_objectSpread({}, graphqlTsSchema.graphqlBoundToKeystoneContext), graphqlTsSchema$1.bindGraphQLSchemaAPIToContext());
const KeystoneAdminUIFieldMeta = graphql.object()({
  name: 'KeystoneAdminUIFieldMeta',
  fields: _objectSpread(_objectSpread(_objectSpread({
    path: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    label: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    description: graphql.field({
      type: graphql.String
    })
  }, contextFunctionField('isOrderable', graphql.Boolean)), contextFunctionField('isFilterable', graphql.Boolean)), {}, {
    fieldMeta: graphql.field({
      type: graphql.JSON
    }),
    viewsIndex: graphql.field({
      type: graphql.nonNull(graphql.Int)
    }),
    customViewsIndex: graphql.field({
      type: graphql.Int
    }),
    createView: graphql.field({
      type: graphql.nonNull(graphql.object()({
        name: 'KeystoneAdminUIFieldMetaCreateView',
        fields: contextFunctionField('fieldMode', graphql.enum({
          name: 'KeystoneAdminUIFieldMetaCreateViewFieldMode',
          values: graphql.enumValues(['edit', 'hidden'])
        }))
      }))
    }),
    listView: graphql.field({
      type: graphql.nonNull(graphql.object()({
        name: 'KeystoneAdminUIFieldMetaListView',
        fields: contextFunctionField('fieldMode', graphql.enum({
          name: 'KeystoneAdminUIFieldMetaListViewFieldMode',
          values: graphql.enumValues(['read', 'hidden'])
        }))
      }))
    }),
    itemView: graphql.field({
      args: {
        id: graphql.arg({
          type: graphql.ID
        })
      },
      resolve: (_ref, _ref2) => {
        let {
          itemView,
          listKey
        } = _ref;
        let {
          id
        } = _ref2;
        return {
          listKey,
          fieldMode: itemView.fieldMode,
          itemId: id !== null && id !== void 0 ? id : null,
          fieldPosition: itemView.fieldPosition
        };
      },
      type: graphql.object()({
        name: 'KeystoneAdminUIFieldMetaItemView',
        fields: {
          fieldMode: graphql.field({
            type: graphql.enum({
              name: 'KeystoneAdminUIFieldMetaItemViewFieldMode',
              values: graphql.enumValues(['edit', 'read', 'hidden'])
            }),
            resolve(_ref3, args, context, info) {
              let {
                fieldMode,
                itemId,
                listKey
              } = _ref3;
              if (itemId !== null) {
                assertInRuntimeContext(context, info);
              }
              if (typeof fieldMode === 'string') {
                return fieldMode;
              }
              if (itemId === null) {
                return null;
              }

              // we need to re-assert this because typescript doesn't understand the relation between
              // rootVal.itemId !== null and the context being a runtime context
              assertInRuntimeContext(context, info);
              return fetchItemForItemViewFieldMode(context)(listKey, itemId).then(item => {
                if (item === null) {
                  return 'hidden';
                }
                return fieldMode({
                  session: context.session,
                  context,
                  item
                });
              });
            }
          }),
          fieldPosition: graphql.field({
            type: graphql.enum({
              name: 'KeystoneAdminUIFieldMetaItemViewFieldPosition',
              values: graphql.enumValues(['form', 'sidebar'])
            }),
            resolve(_ref4, args, context, info) {
              let {
                fieldPosition,
                itemId,
                listKey
              } = _ref4;
              if (itemId !== null) {
                assertInRuntimeContext(context, info);
              }
              if (typeof fieldPosition === 'string') {
                return fieldPosition;
              }
              if (itemId === null) {
                return null;
              }
              assertInRuntimeContext(context, info);
              return fetchItemForItemViewFieldMode(context)(listKey, itemId).then(item => {
                if (item === null) {
                  return 'form';
                }
                return fieldPosition({
                  session: context.session,
                  context,
                  item
                });
              });
            }
          })
        }
      })
    }),
    search: graphql.field({
      type: nextFields.QueryMode
    })
  })
});
const KeystoneAdminUIFieldGroupMeta = graphql.object()({
  name: 'KeystoneAdminUIFieldGroupMeta',
  fields: {
    label: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    description: graphql.field({
      type: graphql.String
    }),
    fields: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.nonNull(KeystoneAdminUIFieldMeta)))
    })
  }
});
const KeystoneAdminUISort = graphql.object()({
  name: 'KeystoneAdminUISort',
  fields: {
    field: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    direction: graphql.field({
      type: graphql.nonNull(graphql.enum({
        name: 'KeystoneAdminUISortDirection',
        values: graphql.enumValues(['ASC', 'DESC'])
      }))
    })
  }
});
const KeystoneAdminUIListMeta = graphql.object()({
  name: 'KeystoneAdminUIListMeta',
  fields: _objectSpread(_objectSpread(_objectSpread(_objectSpread({
    key: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    itemQueryName: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    listQueryName: graphql.field({
      type: graphql.nonNull(graphql.String)
    })
  }, contextFunctionField('hideCreate', graphql.Boolean)), contextFunctionField('hideDelete', graphql.Boolean)), {}, {
    path: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    label: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    singular: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    plural: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    description: graphql.field({
      type: graphql.String
    }),
    initialColumns: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.nonNull(graphql.String)))
    }),
    pageSize: graphql.field({
      type: graphql.nonNull(graphql.Int)
    }),
    labelField: graphql.field({
      type: graphql.nonNull(graphql.String)
    }),
    fields: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.nonNull(KeystoneAdminUIFieldMeta)))
    }),
    groups: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.nonNull(KeystoneAdminUIFieldGroupMeta)))
    }),
    initialSort: graphql.field({
      type: KeystoneAdminUISort
    })
  }, contextFunctionField('isHidden', graphql.Boolean)), {}, {
    isSingleton: graphql.field({
      type: graphql.nonNull(graphql.Boolean)
    })
  })
});
const adminMeta = graphql.object()({
  name: 'KeystoneAdminMeta',
  fields: {
    lists: graphql.field({
      type: graphql.nonNull(graphql.list(graphql.nonNull(KeystoneAdminUIListMeta)))
    }),
    list: graphql.field({
      type: KeystoneAdminUIListMeta,
      args: {
        key: graphql.arg({
          type: graphql.nonNull(graphql.String)
        })
      },
      resolve(rootVal, _ref5) {
        let {
          key
        } = _ref5;
        return rootVal.listsByKey[key];
      }
    })
  }
});
const KeystoneMeta = graphql.object()({
  name: 'KeystoneMeta',
  fields: {
    adminMeta: graphql.field({
      type: graphql.nonNull(adminMeta),
      resolve(_ref6, args, context) {
        let {
          adminMeta
        } = _ref6;
        if ('isAdminUIBuildProcess' in context || adminMeta.isAccessAllowed === undefined) {
          return adminMeta;
        }
        return Promise.resolve(adminMeta.isAccessAllowed(context)).then(isAllowed => {
          if (isAllowed) {
            return adminMeta;
          }
          // TODO: ughhhhhh, we really need to talk about errors.
          // mostly unrelated to above: error or return null here(+ make field nullable)?s
          throw new Error('Access denied');
        });
      }
    })
  }
});
const fetchItemForItemViewFieldMode = extendContext(context => {
  const lists = new Map();
  return (listKey, id) => {
    if (!lists.has(listKey)) {
      lists.set(listKey, new Map());
    }
    const items = lists.get(listKey);
    if (items.has(id)) {
      return items.get(id);
    }
    let promise = context.db[listKey].findOne({
      where: {
        id
      }
    });
    items.set(id, promise);
    return promise;
  };
});
function extendContext(cb) {
  const cache = new WeakMap();
  return context => {
    if (cache.has(context)) {
      return cache.get(context);
    }
    const result = cb(context);
    cache.set(context, result);
    return result;
  };
}
function assertInRuntimeContext(context, info) {
  if ('isAdminUIBuildProcess' in context) {
    throw new Error(`${info.parentType}.${info.fieldName} cannot be resolved during the build process`);
  }
}

// TypeScript doesn't infer a mapped type when using a computed property that's a type parameter
function objectFromKeyVal(key, val) {
  return {
    [key]: val
  };
}
function contextFunctionField(key, type) {
  return objectFromKeyVal(key, graphql.field({
    type: graphql.nonNull(type),
    resolve(source, args, context, info) {
      assertInRuntimeContext(context, info);
      return source[key](context);
    }
  }));
}

async function getFilteredItem(list, context, uniqueWhere, accessFilters, operation) {
  // early exit if they want to exclude everything
  if (accessFilters === false) {
    throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem(operation, list));
  }

  // merge the filter access control and try to get the item
  let where = typesForLists.mapUniqueWhereToWhere(uniqueWhere);
  if (typeof accessFilters === 'object') {
    where = {
      AND: [where, await typesForLists.resolveWhereInput(accessFilters, list, context)]
    };
  }
  const item = await typesForLists.runWithPrisma(context, list, model => model.findFirst({
    where
  }));
  if (item !== null) return item;
  throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem(operation, list));
}
async function checkUniqueItemExists(uniqueInput, foreignList, context, operation) {
  // Validate and resolve the input filter
  const uniqueWhere = await typesForLists.resolveUniqueWhereInput(uniqueInput, foreignList, context);

  // Check whether the item exists (from this users POV).
  try {
    const item = await context.db[foreignList.listKey].findOne({
      where: uniqueInput
    });
    if (item !== null) return uniqueWhere;
  } catch (err) {}
  throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem(operation, foreignList));
}
async function enforceListLevelAccessControl(_ref) {
  let {
    context,
    operation,
    list,
    item,
    inputData
  } = _ref;
  let accepted; // should be boolean, but dont trust, it might accidentally be a filter
  try {
    // apply access.item.* controls
    if (operation === 'create') {
      const itemAccessControl = list.access.item[operation];
      accepted = await itemAccessControl({
        operation,
        session: context.session,
        listKey: list.listKey,
        context,
        inputData
      });
    } else if (operation === 'update' && item !== undefined) {
      const itemAccessControl = list.access.item[operation];
      accepted = await itemAccessControl({
        operation,
        session: context.session,
        listKey: list.listKey,
        context,
        item,
        inputData
      });
    } else if (operation === 'delete' && item !== undefined) {
      const itemAccessControl = list.access.item[operation];
      accepted = await itemAccessControl({
        operation,
        session: context.session,
        listKey: list.listKey,
        context,
        item
      });
    }
  } catch (error) {
    throw graphqlErrors.extensionError('Access control', [{
      error,
      tag: `${list.listKey}.access.item.${operation}`
    }]);
  }

  // short circuit the safe path
  if (accepted === true) return;
  if (typeof accepted !== 'boolean') {
    throw graphqlErrors.accessReturnError([{
      tag: `${list.listKey}.access.item.${operation}`,
      returned: typeof accepted
    }]);
  }
  throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem(operation, list));
}
async function enforceFieldLevelAccessControl(_ref2) {
  let {
    context,
    operation,
    list,
    item,
    inputData
  } = _ref2;
  const nonBooleans = [];
  const fieldsDenied = [];
  const accessErrors = [];
  await Promise.allSettled(Object.keys(inputData).map(async fieldKey => {
    let accepted; // should be boolean, but dont trust
    try {
      // apply fields.[fieldKey].access.* controls
      if (operation === 'create') {
        const fieldAccessControl = list.fields[fieldKey].access[operation];
        accepted = await fieldAccessControl({
          operation,
          session: context.session,
          listKey: list.listKey,
          fieldKey,
          context,
          inputData: inputData // FIXME
        });
      } else if (operation === 'update' && item !== undefined) {
        const fieldAccessControl = list.fields[fieldKey].access[operation];
        accepted = await fieldAccessControl({
          operation,
          session: context.session,
          listKey: list.listKey,
          fieldKey,
          context,
          item,
          inputData
        });
      }
    } catch (error) {
      accessErrors.push({
        error,
        tag: `${list.listKey}.${fieldKey}.access.${operation}`
      });
      return;
    }

    // short circuit the safe path
    if (accepted === true) return;
    fieldsDenied.push(fieldKey);

    // wrong type?
    if (typeof accepted !== 'boolean') {
      nonBooleans.push({
        tag: `${list.listKey}.${fieldKey}.access.${operation}`,
        returned: typeof accepted
      });
    }
  }));
  if (nonBooleans.length) {
    throw graphqlErrors.accessReturnError(nonBooleans);
  }
  if (accessErrors.length) {
    throw graphqlErrors.extensionError('Access control', accessErrors);
  }
  if (fieldsDenied.length) {
    throw graphqlErrors.accessDeniedError(typesForLists.cannotForItemFields(operation, list, fieldsDenied));
  }
}
async function applyAccessControlForCreate(list, context, inputData) {
  await enforceListLevelAccessControl({
    context,
    operation: 'create',
    list,
    inputData,
    item: undefined
  });
  await enforceFieldLevelAccessControl({
    context,
    operation: 'create',
    list,
    inputData,
    item: undefined
  });
}
async function getAccessControlledItemForUpdate(list, context, uniqueWhere, accessFilters, inputData) {
  // apply access.filter.* controls
  const item = await getFilteredItem(list, context, uniqueWhere, accessFilters, 'update');
  await enforceListLevelAccessControl({
    context,
    operation: 'update',
    list,
    inputData,
    item
  });
  await enforceFieldLevelAccessControl({
    context,
    operation: 'update',
    list,
    inputData,
    item
  });
  return item;
}
async function getAccessControlledItemForDelete(list, context, uniqueWhere, accessFilters) {
  // apply access.filter.* controls
  const item = await getFilteredItem(list, context, uniqueWhere, accessFilters, 'delete');
  await enforceListLevelAccessControl({
    context,
    operation: 'delete',
    list,
    item,
    inputData: {}
  });

  // no field level access control for delete

  return item;
}

class RelationshipErrors extends Error {
  constructor(errors) {
    super('Multiple relationship errors');
    _defineProperty(this, "errors", void 0);
    this.errors = errors;
  }
}
function getResolvedUniqueWheres(uniqueInputs, context, foreignList, operation) {
  return uniqueInputs.map(uniqueInput => checkUniqueItemExists(uniqueInput, foreignList, context, operation));
}
function resolveRelateToManyForCreateInput(nestedMutationState, context, foreignList, tag) {
  return async value => {
    if (!Array.isArray(value.connect) && !Array.isArray(value.create)) {
      throw graphqlErrors.userInputError(`You must provide "connect" or "create" in to-many relationship inputs for "create" operations.`);
    }

    // Perform queries for the connections
    const connects = Promise.allSettled(getResolvedUniqueWheres(value.connect || [], context, foreignList, 'connect'));

    // Perform nested mutations for the creations
    const creates = Promise.allSettled((value.create || []).map(x => nestedMutationState.create(x, foreignList)));
    const [connectResult, createResult] = await Promise.all([connects, creates]);

    // Collect all the errors
    const errors = [...connectResult, ...createResult].filter(typesForLists.isRejected);
    if (errors.length) {
      throw new RelationshipErrors(errors.map(x => ({
        error: x.reason,
        tag
      })));
    }
    const result = {
      connect: [...connectResult, ...createResult].filter(typesForLists.isFulfilled).map(x => x.value)
    };

    // Perform queries for the connections
    return result;
  };
}
function resolveRelateToManyForUpdateInput(nestedMutationState, context, foreignList, tag) {
  return async value => {
    if (!Array.isArray(value.connect) && !Array.isArray(value.create) && !Array.isArray(value.disconnect) && !Array.isArray(value.set)) {
      throw graphqlErrors.userInputError(`You must provide at least one of "set", "connect", "create" or "disconnect" in to-many relationship inputs for "update" operations.`);
    }
    if (value.set && value.disconnect) {
      throw graphqlErrors.userInputError(`The "set" and "disconnect" fields cannot both be provided to to-many relationship inputs for "update" operations.`);
    }

    // Perform queries for the connections
    const connects = Promise.allSettled(getResolvedUniqueWheres(value.connect || [], context, foreignList, 'connect'));
    const disconnects = Promise.allSettled(getResolvedUniqueWheres(value.disconnect || [], context, foreignList, 'disconnect'));
    const sets = Promise.allSettled(getResolvedUniqueWheres(value.set || [], context, foreignList, 'set'));

    // Perform nested mutations for the creations
    const creates = Promise.allSettled((value.create || []).map(x => nestedMutationState.create(x, foreignList)));
    const [connectResult, createResult, disconnectResult, setResult] = await Promise.all([connects, creates, disconnects, sets]);

    // Collect all the errors
    const errors = [...connectResult, ...createResult, ...disconnectResult, ...setResult].filter(typesForLists.isRejected);
    if (errors.length) {
      throw new RelationshipErrors(errors.map(x => ({
        error: x.reason,
        tag
      })));
    }
    return {
      // unlike all the other operations, an empty array isn't a no-op for set
      set: value.set ? setResult.filter(typesForLists.isFulfilled).map(x => x.value) : undefined,
      disconnect: disconnectResult.filter(typesForLists.isFulfilled).map(x => x.value),
      connect: [...connectResult, ...createResult].filter(typesForLists.isFulfilled).map(x => x.value)
    };
  };
}

async function handleCreateAndUpdate(value, nestedMutationState, context, foreignList) {
  if (value.connect) {
    return {
      connect: await checkUniqueItemExists(value.connect, foreignList, context, 'connect')
    };
  } else if (value.create) {
    const {
      id
    } = await nestedMutationState.create(value.create, foreignList);
    return {
      connect: {
        id
      }
    };
  }
}
function resolveRelateToOneForCreateInput(nestedMutationState, context, foreignList) {
  return async value => {
    const numOfKeys = Object.keys(value).length;
    if (numOfKeys !== 1) {
      throw graphqlErrors.userInputError(`You must provide "connect" or "create" in to-one relationship inputs for "create" operations.`);
    }
    return handleCreateAndUpdate(value, nestedMutationState, context, foreignList);
  };
}
function resolveRelateToOneForUpdateInput(nestedMutationState, context, foreignList) {
  return async value => {
    if (Object.keys(value).length !== 1) {
      throw graphqlErrors.userInputError(`You must provide one of "connect", "create" or "disconnect" in to-one relationship inputs for "update" operations.`);
    }
    if (value.connect || value.create) {
      return handleCreateAndUpdate(value, nestedMutationState, context, foreignList);
    } else if (value.disconnect) {
      return {
        disconnect: true
      };
    }
  };
}

async function runSideEffectOnlyHook(list, hookName, args) {
  // Runs the before/after operation hooks

  let shouldRunFieldLevelHook;
  if (args.operation === 'delete') {
    // Always run field hooks for delete operations
    shouldRunFieldLevelHook = () => true;
  } else {
    // Only run field hooks on if the field was specified in the
    // original input for create and update operations.
    const inputDataKeys = new Set(Object.keys(args.inputData));
    shouldRunFieldLevelHook = fieldKey => inputDataKeys.has(fieldKey);
  }

  // Field hooks
  const fieldsErrors = [];
  await Promise.all(Object.entries(list.fields).map(async _ref => {
    let [fieldKey, field] = _ref;
    if (shouldRunFieldLevelHook(fieldKey)) {
      try {
        var _field$hooks$hookName, _field$hooks;
        await ((_field$hooks$hookName = (_field$hooks = field.hooks)[hookName]) === null || _field$hooks$hookName === void 0 ? void 0 : _field$hooks$hookName.call(_field$hooks, _objectSpread({
          fieldKey
        }, args)));
      } catch (error) {
        fieldsErrors.push({
          error,
          tag: `${list.listKey}.${fieldKey}.hooks.${hookName}`
        });
      }
    }
  }));
  if (fieldsErrors.length) {
    throw graphqlErrors.extensionError(hookName, fieldsErrors);
  }

  // List hooks
  try {
    var _list$hooks$hookName, _list$hooks;
    await ((_list$hooks$hookName = (_list$hooks = list.hooks)[hookName]) === null || _list$hooks$hookName === void 0 ? void 0 : _list$hooks$hookName.call(_list$hooks, args));
  } catch (error) {
    throw graphqlErrors.extensionError(hookName, [{
      error,
      tag: `${list.listKey}.hooks.${hookName}`
    }]);
  }
}

async function validateUpdateCreate(_ref) {
  let {
    list,
    hookArgs
  } = _ref;
  const messages = [];
  const fieldsErrors = [];
  // Field validation hooks
  await Promise.all(Object.entries(list.fields).map(async _ref2 => {
    let [fieldKey, field] = _ref2;
    const addValidationError = msg => messages.push(`${list.listKey}.${fieldKey}: ${msg}`);
    try {
      var _field$hooks$validate, _field$hooks;
      await ((_field$hooks$validate = (_field$hooks = field.hooks).validateInput) === null || _field$hooks$validate === void 0 ? void 0 : _field$hooks$validate.call(_field$hooks, _objectSpread(_objectSpread({}, hookArgs), {}, {
        addValidationError,
        fieldKey
      })));
    } catch (error) {
      fieldsErrors.push({
        error,
        tag: `${list.listKey}.${fieldKey}.hooks.validateInput`
      });
    }
  }));
  if (fieldsErrors.length) {
    throw graphqlErrors.extensionError('validateInput', fieldsErrors);
  }

  // List validation hooks
  const addValidationError = msg => messages.push(`${list.listKey}: ${msg}`);
  try {
    var _list$hooks$validateI, _list$hooks;
    await ((_list$hooks$validateI = (_list$hooks = list.hooks).validateInput) === null || _list$hooks$validateI === void 0 ? void 0 : _list$hooks$validateI.call(_list$hooks, _objectSpread(_objectSpread({}, hookArgs), {}, {
      addValidationError
    })));
  } catch (error) {
    throw graphqlErrors.extensionError('validateInput', [{
      error,
      tag: `${list.listKey}.hooks.validateInput`
    }]);
  }
  if (messages.length) {
    throw graphqlErrors.validationFailureError(messages);
  }
}
async function validateDelete(_ref3) {
  let {
    list,
    hookArgs
  } = _ref3;
  const messages = [];
  const fieldsErrors = [];
  // Field validation
  await Promise.all(Object.entries(list.fields).map(async _ref4 => {
    let [fieldKey, field] = _ref4;
    const addValidationError = msg => messages.push(`${list.listKey}.${fieldKey}: ${msg}`);
    try {
      var _field$hooks$validate2, _field$hooks2;
      await ((_field$hooks$validate2 = (_field$hooks2 = field.hooks).validateDelete) === null || _field$hooks$validate2 === void 0 ? void 0 : _field$hooks$validate2.call(_field$hooks2, _objectSpread(_objectSpread({}, hookArgs), {}, {
        addValidationError,
        fieldKey
      })));
    } catch (error) {
      fieldsErrors.push({
        error,
        tag: `${list.listKey}.${fieldKey}.hooks.validateDelete`
      });
    }
  }));
  if (fieldsErrors.length) {
    throw graphqlErrors.extensionError('validateDelete', fieldsErrors);
  }
  // List validation
  const addValidationError = msg => messages.push(`${list.listKey}: ${msg}`);
  try {
    var _list$hooks$validateD, _list$hooks2;
    await ((_list$hooks$validateD = (_list$hooks2 = list.hooks).validateDelete) === null || _list$hooks$validateD === void 0 ? void 0 : _list$hooks$validateD.call(_list$hooks2, _objectSpread(_objectSpread({}, hookArgs), {}, {
      addValidationError
    })));
  } catch (error) {
    throw graphqlErrors.extensionError('validateDelete', [{
      error,
      tag: `${list.listKey}.hooks.validateDelete`
    }]);
  }
  if (messages.length) {
    throw graphqlErrors.validationFailureError(messages);
  }
}

async function createSingle(_ref, list, context) {
  let {
    data: rawData
  } = _ref;
  //  Item access control. Will throw an accessDeniedError if not allowed.
  await applyAccessControlForCreate(list, context, rawData);
  const {
    afterOperation,
    data
  } = await resolveInputForCreateOrUpdate(list, context, rawData, undefined);
  const writeLimit = typesForLists.getWriteLimit(context);
  const item = await writeLimit(() => typesForLists.runWithPrisma(context, list, model => model.create({
    data: list.isSingleton ? _objectSpread(_objectSpread({}, data), {}, {
      id: 1
    }) : data
  })));
  return {
    item,
    afterOperation
  };
}
var _afterOperations = /*#__PURE__*/new WeakMap();
var _context = /*#__PURE__*/new WeakMap();
class NestedMutationState {
  constructor(context) {
    _classPrivateFieldInitSpec(this, _afterOperations, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _context, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _context, context);
  }
  async create(data, list) {
    const context = _classPrivateFieldGet(this, _context);
    const operationAccess = await typesForLists.getOperationAccess(list, context, 'create');
    if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('create', list));
    const {
      item,
      afterOperation
    } = await createSingle({
      data
    }, list, context);
    _classPrivateFieldGet(this, _afterOperations).push(() => afterOperation(item));
    return {
      id: item.id
    };
  }
  async afterOperation() {
    await typesForLists.promiseAllRejectWithAllErrors(_classPrivateFieldGet(this, _afterOperations).map(async x => x()));
  }
}
async function createOne(createInput, list, context) {
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'create');
  if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('create', list));
  const {
    item,
    afterOperation
  } = await createSingle(createInput, list, context);
  await afterOperation(item);
  return item;
}
async function createMany(createInputs, list, context) {
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'create');
  return createInputs.data.map(async data => {
    // throw for each attempt
    if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('create', list));
    const {
      item,
      afterOperation
    } = await createSingle({
      data
    }, list, context);
    await afterOperation(item);
    return item;
  });
}
async function updateSingle(updateInput, list, context, accessFilters) {
  const {
    where: uniqueInput,
    data: rawData
  } = updateInput;
  // Validate and resolve the input filter
  const uniqueWhere = await typesForLists.resolveUniqueWhereInput(uniqueInput, list, context);

  // Check filter access
  const fieldKey = Object.keys(uniqueWhere)[0];
  await typesForLists.checkFilterOrderAccess([{
    fieldKey,
    list
  }], context, 'filter');

  // Filter and Item access control. Will throw an accessDeniedError if not allowed.
  const item = await getAccessControlledItemForUpdate(list, context, uniqueWhere, accessFilters, rawData);
  const {
    afterOperation,
    data
  } = await resolveInputForCreateOrUpdate(list, context, rawData, item);
  const writeLimit = typesForLists.getWriteLimit(context);
  const updatedItem = await writeLimit(() => typesForLists.runWithPrisma(context, list, model => model.update({
    where: {
      id: item.id
    },
    data
  })));
  await afterOperation(updatedItem);
  return updatedItem;
}
async function updateOne(updateInput, list, context) {
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'update');
  if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('update', list));

  // Get list-level access control filters
  const accessFilters = await typesForLists.getAccessFilters(list, context, 'update');
  return updateSingle(updateInput, list, context, accessFilters);
}
async function updateMany(_ref2, list, context) {
  let {
    data
  } = _ref2;
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'update');

  // Get list-level access control filters
  const accessFilters = await typesForLists.getAccessFilters(list, context, 'update');
  return data.map(async updateInput => {
    // throw for each attempt
    if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('update', list));
    return updateSingle(updateInput, list, context, accessFilters);
  });
}
async function getResolvedData(list, hookArgs, nestedMutationState) {
  const {
    context,
    operation
  } = hookArgs;

  // Start with the original input
  let resolvedData = hookArgs.inputData;

  // Apply non-relationship field type input resolvers
  const resolverErrors = [];
  resolvedData = Object.fromEntries(await Promise.all(Object.entries(list.fields).map(async _ref3 => {
    var _field$input, _field$input$operatio;
    let [fieldKey, field] = _ref3;
    const inputResolver = (_field$input = field.input) === null || _field$input === void 0 ? void 0 : (_field$input$operatio = _field$input[operation]) === null || _field$input$operatio === void 0 ? void 0 : _field$input$operatio.resolve;
    let input = resolvedData[fieldKey];
    if (inputResolver && field.dbField.kind !== 'relation') {
      try {
        input = await inputResolver(input, context, undefined);
      } catch (error) {
        resolverErrors.push({
          error,
          tag: `${list.listKey}.${fieldKey}`
        });
      }
    }
    return [fieldKey, input];
  })));
  if (resolverErrors.length) {
    throw graphqlErrors.resolverError(resolverErrors);
  }

  // Apply relationship field type input resolvers
  const relationshipErrors = [];
  resolvedData = Object.fromEntries(await Promise.all(Object.entries(list.fields).map(async _ref4 => {
    var _field$input2, _field$input2$operati;
    let [fieldKey, field] = _ref4;
    const inputResolver = (_field$input2 = field.input) === null || _field$input2 === void 0 ? void 0 : (_field$input2$operati = _field$input2[operation]) === null || _field$input2$operati === void 0 ? void 0 : _field$input2$operati.resolve;
    let input = resolvedData[fieldKey];
    if (inputResolver && field.dbField.kind === 'relation') {
      const tag = `${list.listKey}.${fieldKey}`;
      try {
        input = await inputResolver(input, context,
        // This third argument only applies to relationship fields
        (() => {
          if (input === undefined) {
            // No-op: This is what we want
            return () => undefined;
          }
          if (input === null) {
            // No-op: Should this be UserInputError?
            return () => undefined;
          }
          const foreignList = list.lists[field.dbField.list];
          let resolver;
          if (field.dbField.mode === 'many') {
            if (operation === 'create') {
              resolver = resolveRelateToManyForCreateInput;
            } else {
              resolver = resolveRelateToManyForUpdateInput;
            }
          } else {
            if (operation === 'create') {
              resolver = resolveRelateToOneForCreateInput;
            } else {
              resolver = resolveRelateToOneForUpdateInput;
            }
          }
          return resolver(nestedMutationState, context, foreignList, tag);
        })());
      } catch (error) {
        if (error instanceof RelationshipErrors) {
          relationshipErrors.push(...error.errors);
        } else {
          relationshipErrors.push({
            error,
            tag
          });
        }
      }
    }
    return [fieldKey, input];
  })));
  if (relationshipErrors.length) {
    throw graphqlErrors.relationshipError(relationshipErrors);
  }

  // Resolve input hooks
  const hookName = 'resolveInput';
  // Field hooks
  const fieldsErrors = [];
  resolvedData = Object.fromEntries(await Promise.all(Object.entries(list.fields).map(async _ref5 => {
    let [fieldKey, field] = _ref5;
    if (field.hooks.resolveInput === undefined) {
      return [fieldKey, resolvedData[fieldKey]];
    } else {
      try {
        return [fieldKey, await field.hooks.resolveInput(_objectSpread(_objectSpread({}, hookArgs), {}, {
          resolvedData,
          fieldKey
        }))];
      } catch (error) {
        fieldsErrors.push({
          error,
          tag: `${list.listKey}.${fieldKey}.hooks.${hookName}`
        });
        return [fieldKey, undefined];
      }
    }
  })));
  if (fieldsErrors.length) {
    throw graphqlErrors.extensionError(hookName, fieldsErrors);
  }

  // List hooks
  if (list.hooks.resolveInput) {
    try {
      resolvedData = await list.hooks.resolveInput(_objectSpread(_objectSpread({}, hookArgs), {}, {
        resolvedData
      }));
    } catch (error) {
      throw graphqlErrors.extensionError(hookName, [{
        error,
        tag: `${list.listKey}.hooks.${hookName}`
      }]);
    }
  }
  return resolvedData;
}
async function resolveInputForCreateOrUpdate(list, context, inputData, item) {
  const nestedMutationState = new NestedMutationState(context);
  const baseHookArgs = {
    context,
    listKey: list.listKey,
    inputData,
    resolvedData: {}
  };
  const hookArgs = item === undefined ? _objectSpread(_objectSpread({}, baseHookArgs), {}, {
    operation: 'create',
    item
  }) : _objectSpread(_objectSpread({}, baseHookArgs), {}, {
    operation: 'update',
    item
  });

  // Take the original input and resolve all the fields down to what
  // will be saved into the database.
  hookArgs.resolvedData = await getResolvedData(list, hookArgs, nestedMutationState);

  // Apply all validation checks
  await validateUpdateCreate({
    list,
    hookArgs
  });

  // Run beforeOperation hooks
  await runSideEffectOnlyHook(list, 'beforeOperation', hookArgs);

  // Return the full resolved input (ready for prisma level operation),
  // and the afterOperation hook to be applied
  return {
    data: transformForPrismaClient(list.fields, hookArgs.resolvedData, context),
    afterOperation: async updatedItem => {
      await nestedMutationState.afterOperation();
      await runSideEffectOnlyHook(list, 'afterOperation',
      // at runtime this conditional is pointless
      // but TypeScript needs it because in each case, it will narrow
      // `hookArgs` based on the `operation` which will make `hookArgs.item`
      // be the right type for `originalItem` for the operation
      hookArgs.operation === 'create' ? _objectSpread(_objectSpread({}, hookArgs), {}, {
        item: updatedItem,
        originalItem: hookArgs.item
      }) : _objectSpread(_objectSpread({}, hookArgs), {}, {
        item: updatedItem,
        originalItem: hookArgs.item
      }));
    }
  };
}
function transformInnerDBField(dbField, context, value) {
  if (dbField.kind === 'scalar' && dbField.scalar === 'Json' && value === null) {
    const Prisma = typesForLists.getPrismaNamespace(context);
    return Prisma.DbNull;
  }
  return value;
}
function transformForPrismaClient(fields, data, context) {
  return Object.fromEntries(Object.entries(data).flatMap(_ref6 => {
    let [fieldKey, value] = _ref6;
    const {
      dbField
    } = fields[fieldKey];
    if (dbField.kind === 'multi') {
      return Object.entries(value).map(_ref7 => {
        let [innerFieldKey, fieldValue] = _ref7;
        return [typesForLists.getDBFieldKeyForFieldOnMultiField(fieldKey, innerFieldKey), transformInnerDBField(dbField.fields[innerFieldKey], context, fieldValue)];
      });
    }
    return [[fieldKey, transformInnerDBField(dbField, context, value)]];
  }));
}

async function deleteSingle(uniqueInput, list, context, accessFilters) {
  // Validate and resolve the input filter
  const uniqueWhere = await typesForLists.resolveUniqueWhereInput(uniqueInput, list, context);

  // Check filter access
  const fieldKey = Object.keys(uniqueWhere)[0];
  await typesForLists.checkFilterOrderAccess([{
    fieldKey,
    list
  }], context, 'filter');

  // Filter and Item access control. Will throw an accessDeniedError if not allowed.
  const item = await getAccessControlledItemForDelete(list, context, uniqueWhere, accessFilters);
  const hookArgs = {
    operation: 'delete',
    listKey: list.listKey,
    context,
    item,
    resolvedData: undefined,
    inputData: undefined
  };

  // Apply all validation checks
  await validateDelete({
    list,
    hookArgs
  });

  // Before operation
  await runSideEffectOnlyHook(list, 'beforeOperation', hookArgs);
  const writeLimit = typesForLists.getWriteLimit(context);
  const newItem = await writeLimit(() => typesForLists.runWithPrisma(context, list, model => model.delete({
    where: {
      id: item.id
    }
  })));
  await runSideEffectOnlyHook(list, 'afterOperation', _objectSpread(_objectSpread({}, hookArgs), {}, {
    item: undefined,
    originalItem: item
  }));
  return newItem;
}
async function deleteMany(uniqueInputs, list, context) {
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'delete');

  // Check filter permission to pass into single operation
  const accessFilters = await typesForLists.getAccessFilters(list, context, 'delete');
  return uniqueInputs.map(async uniqueInput => {
    // throw for each item
    if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('delete', list));
    return deleteSingle(uniqueInput, list, context, accessFilters);
  });
}
async function deleteOne(uniqueInput, list, context) {
  const operationAccess = await typesForLists.getOperationAccess(list, context, 'delete');
  if (!operationAccess) throw graphqlErrors.accessDeniedError(typesForLists.cannotForItem('delete', list));

  // Check filter permission to pass into single operation
  const accessFilters = await typesForLists.getAccessFilters(list, context, 'delete');
  return deleteSingle(uniqueInput, list, context, accessFilters);
}

// This is not a thing that I really agree with but it's to make the behaviour consistent with old keystone.
// Basically, old keystone uses Promise.allSettled and then after that maps that into promises that resolve and reject,
// whereas the new stuff is just like "here are some promises" with no guarantees about the order they will be settled in.
// That doesn't matter when they all resolve successfully because the order they resolve successfully in
// doesn't affect anything, If some reject though, the order that they reject in will be the order in the errors array
// and some of our tests rely on the order of the graphql errors array. They shouldn't, but they do.
function promisesButSettledWhenAllSettledAndInOrder(promises) {
  const resultsPromise = Promise.allSettled(promises);
  return promises.map(async (_, i) => {
    const result = (await resultsPromise)[i];
    return result.status === 'fulfilled' ? Promise.resolve(result.value) : Promise.reject(result.reason);
  });
}
function getMutationsForList(list) {
  const names = core.getGqlNames(list);
  const defaultUniqueWhereInput = list.isSingleton ? {
    id: '1'
  } : undefined;
  const createOne$1 = graphqlTsSchema.field({
    type: list.types.output,
    args: {
      data: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.create)
      })
    },
    resolve(_rootVal, _ref, context) {
      let {
        data
      } = _ref;
      return createOne({
        data
      }, list, context);
    }
  });
  const createMany$1 = graphqlTsSchema.field({
    type: apiWithoutContext.list(list.types.output),
    args: {
      data: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(apiWithoutContext.list(apiWithoutContext.nonNull(list.types.create)))
      })
    },
    async resolve(_rootVal, args, context) {
      return promisesButSettledWhenAllSettledAndInOrder(await createMany(args, list, context));
    }
  });
  const updateOne$1 = graphqlTsSchema.field({
    type: list.types.output,
    args: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.uniqueWhere),
        defaultValue: defaultUniqueWhereInput
      }),
      data: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.update)
      })
    },
    resolve(_rootVal, args, context) {
      return updateOne(args, list, context);
    }
  });
  const updateManyInput = apiWithoutContext.inputObject({
    name: names.updateManyInputName,
    fields: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.uniqueWhere),
        defaultValue: defaultUniqueWhereInput
      }),
      data: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.update)
      })
    }
  });
  const updateMany$1 = graphqlTsSchema.field({
    type: apiWithoutContext.list(list.types.output),
    args: {
      data: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(apiWithoutContext.list(apiWithoutContext.nonNull(updateManyInput)))
      })
    },
    async resolve(_rootVal, args, context) {
      return promisesButSettledWhenAllSettledAndInOrder(await updateMany(args, list, context));
    }
  });
  const deleteOne$1 = graphqlTsSchema.field({
    type: list.types.output,
    args: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.uniqueWhere),
        defaultValue: defaultUniqueWhereInput
      })
    },
    resolve(rootVal, _ref2, context) {
      let {
        where
      } = _ref2;
      return deleteOne(where, list, context);
    }
  });
  const deleteMany$1 = graphqlTsSchema.field({
    type: apiWithoutContext.list(list.types.output),
    args: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(apiWithoutContext.list(apiWithoutContext.nonNull(list.types.uniqueWhere)))
      })
    },
    async resolve(rootVal, _ref3, context) {
      let {
        where
      } = _ref3;
      return promisesButSettledWhenAllSettledAndInOrder(await deleteMany(where, list, context));
    }
  });
  return {
    mutations: _objectSpread(_objectSpread(_objectSpread({}, list.graphql.isEnabled.create && {
      [names.createMutationName]: createOne$1,
      [names.createManyMutationName]: createMany$1
    }), list.graphql.isEnabled.update && {
      [names.updateMutationName]: updateOne$1,
      [names.updateManyMutationName]: updateMany$1
    }), list.graphql.isEnabled.delete && {
      [names.deleteMutationName]: deleteOne$1,
      [names.deleteManyMutationName]: deleteMany$1
    }),
    updateManyInput
  };
}

function getQueriesForList(list) {
  if (!list.graphql.isEnabled.query) return {};
  const names = core.getGqlNames(list);
  const findOne = graphqlTsSchema.field({
    type: list.types.output,
    args: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.uniqueWhere),
        defaultValue: list.isSingleton ? {
          id: '1'
        } : undefined
      })
    },
    async resolve(_rootVal, args, context) {
      return typesForLists.findOne(args, list, context);
    }
  });
  const findMany = graphqlTsSchema.field({
    type: apiWithoutContext.list(apiWithoutContext.nonNull(list.types.output)),
    args: list.types.findManyArgs,
    async resolve(_rootVal, args, context, info) {
      return typesForLists.findMany(args, list, context, info);
    }
  });
  const countQuery = graphqlTsSchema.field({
    type: apiWithoutContext.Int,
    args: {
      where: apiWithoutContext.arg({
        type: apiWithoutContext.nonNull(list.types.where),
        defaultValue: list.isSingleton ? {
          id: {
            equals: '1'
          }
        } : {}
      })
    },
    async resolve(_rootVal, args, context, info) {
      return typesForLists.count(args, list, context, info);
    }
  });
  return {
    [names.listQueryName]: findMany,
    [names.itemQueryName]: findOne,
    [names.listQueryCountName]: countQuery
  };
}

function getGraphQLSchema(lists, extraFields) {
  const query = apiWithContext.object()({
    name: 'Query',
    fields: Object.assign({}, ...Object.values(lists).map(list => getQueriesForList(list)), extraFields.query)
  });
  const updateManyByList = {};
  const mutation = apiWithContext.object()({
    name: 'Mutation',
    fields: Object.assign({}, ...Object.values(lists).map(list => {
      const {
        mutations,
        updateManyInput
      } = getMutationsForList(list);
      updateManyByList[list.listKey] = updateManyInput;
      return mutations;
    }), extraFields.mutation)
  });
  const graphQLSchema = new graphql$1.GraphQLSchema({
    query: query.graphQLType,
    mutation: mutation.graphQLType,
    // not about behaviour, only ordering
    types: [...collectTypes(lists, updateManyByList), mutation.graphQLType]
  });
  return graphQLSchema;
}
function collectTypes(lists, updateManyByList) {
  const collectedTypes = [];
  for (const list of Object.values(lists)) {
    const {
      isEnabled
    } = list.graphql;
    if (!isEnabled.type) continue;
    // adding all of these types explicitly isn't strictly necessary but we do it to create a certain order in the schema
    collectedTypes.push(list.types.output.graphQLType);
    if (isEnabled.query || isEnabled.update || isEnabled.delete) {
      collectedTypes.push(list.types.uniqueWhere.graphQLType);
    }
    if (isEnabled.query) {
      for (const field of Object.values(list.fields)) {
        if (isEnabled.query && field.graphql.isEnabled.read && field.unreferencedConcreteInterfaceImplementations) {
          // this _IS_ actually necessary since they aren't implicitly referenced by other types, unlike the types above
          collectedTypes.push(...field.unreferencedConcreteInterfaceImplementations.map(x => x.graphQLType));
        }
      }
      collectedTypes.push(list.types.where.graphQLType);
      collectedTypes.push(list.types.orderBy.graphQLType);
    }
    if (isEnabled.update) {
      collectedTypes.push(list.types.update.graphQLType);
      collectedTypes.push(updateManyByList[list.listKey].graphQLType);
    }
    if (isEnabled.create) {
      collectedTypes.push(list.types.create.graphQLType);
    }
  }
  // this is not necessary, just about ordering
  collectedTypes.push(graphqlTsSchema.JSON.graphQLType);
  return collectedTypes;
}

function createGraphQLSchema(config, lists, adminMeta) {
  // Start with the core keystone graphQL schema
  let graphQLSchema = getGraphQLSchema(lists, {
    mutation: config.session ? {
      endSession: graphqlTsSchema.field({
        type: apiWithoutContext.nonNull(apiWithoutContext.Boolean),
        async resolve(rootVal, args, context) {
          if (context.sessionStrategy) {
            await context.sessionStrategy.end({
              context
            });
          }
          return true;
        }
      })
    } : {},
    query: {
      keystone: graphqlTsSchema.field({
        type: apiWithoutContext.nonNull(KeystoneMeta),
        resolve: () => ({
          adminMeta
        })
      })
    }
  });

  // Merge in the user defined graphQL API
  if (config.extendGraphqlSchema) {
    graphQLSchema = config.extendGraphqlSchema(graphQLSchema);
  }
  return graphQLSchema;
}

function localImageAssetsAPI(storageConfig) {
  return {
    async url(id, extension) {
      return storageConfig.generateUrl(`/${id}.${extension}`);
    },
    async upload(buffer, id, extension) {
      // const buffer = await streamToBuffer(stream);

      await fs__default["default"].writeFile(path__default["default"].join(storageConfig.storagePath, `${id}.${extension}`), buffer);
    },
    async delete(id, extension) {
      await fs__default["default"].unlink(path__default["default"].join(storageConfig.storagePath, `${id}.${extension}`));
    }
  };
}
function localFileAssetsAPI(storageConfig) {
  return {
    async url(filename) {
      return storageConfig.generateUrl(`/${filename}`);
    },
    async upload(stream$1, filename) {
      const writeStream = fs__default["default"].createWriteStream(path__default["default"].join(storageConfig.storagePath, filename));
      const pipeStreams = new Promise((resolve, reject) => {
        stream.pipeline(stream$1, writeStream, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      try {
        await pipeStreams;
        const {
          size: filesize
        } = await fs__default["default"].stat(path__default["default"].join(storageConfig.storagePath, filename));
        return {
          filesize,
          filename
        };
      } catch (e) {
        await fs__default["default"].remove(path__default["default"].join(storageConfig.storagePath, filename));
        throw e;
      }
    },
    async delete(filename) {
      await fs__default["default"].unlink(path__default["default"].join(storageConfig.storagePath, filename));
    }
  };
}

function s3ImageAssetsAPI(storageConfig) {
  const {
    generateUrl,
    s3,
    presign,
    s3Endpoint
  } = s3AssetsCommon(storageConfig);
  return {
    async url(id, extension) {
      if (!storageConfig.signed) {
        return generateUrl(`${s3Endpoint}${storageConfig.pathPrefix || ''}${id}.${extension}`);
      }
      return generateUrl(await presign(`${id}.${extension}`));
    },
    async upload(buffer, id, extension) {
      const upload = new libStorage.Upload({
        client: s3,
        params: {
          Bucket: storageConfig.bucketName,
          Key: `${storageConfig.pathPrefix || ''}${id}.${extension}`,
          Body: buffer,
          ContentType: {
            png: 'image/png',
            webp: 'image/webp',
            gif: 'image/gif',
            jpg: 'image/jpeg'
          }[extension]
        }
      });
      await upload.done();
    },
    async delete(id, extension) {
      await s3.deleteObject({
        Bucket: storageConfig.bucketName,
        Key: `${storageConfig.pathPrefix || ''}${id}.${extension}`
      });
    }
  };
}
function s3FileAssetsAPI(storageConfig) {
  const {
    generateUrl,
    s3,
    presign,
    s3Endpoint
  } = s3AssetsCommon(storageConfig);
  return {
    async url(filename) {
      if (!storageConfig.signed) {
        return generateUrl(`${s3Endpoint}${storageConfig.pathPrefix || ''}${filename}`);
      }
      return generateUrl(await presign(filename));
    },
    async upload(stream, filename) {
      let filesize = 0;
      stream.on('data', data => {
        filesize += data.length;
      });
      const upload = new libStorage.Upload({
        client: s3,
        params: {
          Bucket: storageConfig.bucketName,
          Key: (storageConfig.pathPrefix || '') + filename,
          Body: stream,
          ContentType: 'application/octet-stream'
        }
      });
      await upload.done();
      return {
        filename,
        filesize
      };
    },
    async delete(filename) {
      await s3.deleteObject({
        Bucket: storageConfig.bucketName,
        Key: (storageConfig.pathPrefix || '') + filename
      });
    }
  };
}
function getS3AssetsEndpoint(storageConfig) {
  let endpoint = storageConfig.endpoint ? new URL(storageConfig.endpoint) : new URL(`https://s3.${storageConfig.region}.amazonaws.com`);
  if (storageConfig.forcePathStyle) {
    endpoint = new URL(`/${storageConfig.bucketName}`, endpoint);
  } else {
    endpoint.hostname = `${storageConfig.bucketName}.${endpoint.hostname}`;
  }
  const endpointString = endpoint.toString();
  if (endpointString.endsWith('/')) return endpointString;
  return `${endpointString}/`;
}
function s3AssetsCommon(storageConfig) {
  var _storageConfig$genera;
  const s3 = new clientS3.S3({
    credentials: {
      accessKeyId: storageConfig.accessKeyId,
      secretAccessKey: storageConfig.secretAccessKey
    },
    region: storageConfig.region,
    endpoint: storageConfig.endpoint,
    forcePathStyle: storageConfig.forcePathStyle
  });
  const s3Endpoint = getS3AssetsEndpoint(storageConfig);
  const generateUrl = (_storageConfig$genera = storageConfig.generateUrl) !== null && _storageConfig$genera !== void 0 ? _storageConfig$genera : url => url;
  return {
    generateUrl,
    s3,
    s3Endpoint,
    presign: async filename => {
      var _storageConfig$signed;
      const command = new clientS3.GetObjectCommand({
        Bucket: storageConfig.bucketName,
        Key: (storageConfig.pathPrefix || '') + filename
      });
      return s3RequestPresigner.getSignedUrl(s3, command, {
        expiresIn: (_storageConfig$signed = storageConfig.signed) === null || _storageConfig$signed === void 0 ? void 0 : _storageConfig$signed.expiry
      });
    }
  };
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (let chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

const _excluded$1 = ["extension"];
function getImageMetadataFromBuffer(buffer) {
  const fileType = fromBuffer__default["default"](buffer);
  if (!fileType) {
    throw new Error('File type not found');
  }
  const extension = fileType.ext;
  if (extension !== 'jpg' && extension !== 'png' && extension !== 'webp' && extension !== 'gif') {
    throw new Error(`${extension} is not a supported image type`);
  }
  const {
    height,
    width
  } = imageSize__default["default"](buffer);
  if (width === undefined || height === undefined) {
    throw new Error('Height and width could not be found for image');
  }
  return {
    width,
    height,
    filesize: buffer.length,
    extension
  };
}
function createImagesContext(config) {
  console.log('hello----------->', config);
  const imageAssetsAPIs = new Map();
  for (const [storageKey, storageConfig] of Object.entries(config.storage || {})) {
    if (storageConfig.type === 'image') {
      imageAssetsAPIs.set(storageKey, storageConfig.kind === 'local' ? localImageAssetsAPI(storageConfig) : s3ImageAssetsAPI(storageConfig));
    }
  }
  return storageString => {
    const adapter = imageAssetsAPIs.get(storageString);
    if (adapter === undefined) {
      throw new Error(`No file assets API found for storage string "${storageString}"`);
    }
    return {
      getUrl: async (id, extension) => {
        return adapter.url(id, extension);
      },
      getDataFromStream: async (stream, originalFilename) => {
        const storageConfig = config.storage[storageString];
        const {
          transformName = () => uuid.v4()
        } = storageConfig;
        const buffer = await streamToBuffer(stream);
        const _getImageMetadataFrom = getImageMetadataFromBuffer(buffer),
          {
            extension
          } = _getImageMetadataFrom,
          rest = _objectWithoutProperties(_getImageMetadataFrom, _excluded$1);
        const id = await transformName(originalFilename, extension);
        await adapter.upload(buffer, id, extension);
        return _objectSpread({
          id,
          extension
        }, rest);
      },
      deleteAtSource: adapter.delete
    };
  };
}

const defaultTransformName = filename => {
  // Appends a UUID to the filename so that people can't brute-force guess stored filenames
  //
  // This regex lazily matches for any characters that aren't a new line
  // it then optionally matches the last instance of a "." symbol
  // followed by any alphanumerical character before the end of the string
  const [, name, ext] = filename.match(/^([^:\n].*?)(\.[A-Za-z0-9]{0,10})?$/);
  const id = crypto__default["default"].randomBytes(24).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(12);

  // console.log(id, id.length, id.slice(12).length);
  const urlSafeName = filenamify__default["default"](slugify__default["default"](name), {
    maxLength: 100 - id.length - (ext ? ext.length : 0),
    replacement: '-'
  });
  if (ext) {
    return `${urlSafeName}-${id}${ext}`;
  }
  return `${urlSafeName}-${id}`;
};
function createFilesContext(config) {
  const adaptersMap = new Map();
  for (const [storageKey, storageConfig] of Object.entries(config.storage || {})) {
    if (storageConfig.type === 'file') {
      adaptersMap.set(storageKey, storageConfig.kind === 'local' ? localFileAssetsAPI(storageConfig) : s3FileAssetsAPI(storageConfig));
    }
  }
  return storageString => {
    const adapter = adaptersMap.get(storageString);
    if (!adapter) {
      throw new Error(`No file assets API found for storage string "${storageString}"`);
    }
    return {
      getUrl: async filename => {
        return adapter.url(filename);
      },
      getDataFromStream: async (stream, originalFilename) => {
        const storageConfig = config.storage[storageString];
        const {
          transformName = defaultTransformName
        } = storageConfig;
        const filename = await transformName(originalFilename);
        const {
          filesize
        } = await adapter.upload(stream, filename);
        return {
          filename,
          filesize
        };
      },
      deleteAtSource: async filename => {
        await adapter.delete(filename);
      }
    };
  };
}

function getRootTypeName(type) {
  if (type instanceof graphql$1.GraphQLNonNull) {
    return getRootTypeName(type.ofType);
  }
  if (type instanceof graphql$1.GraphQLList) {
    return getRootTypeName(type.ofType);
  }
  return type.name;
}
function executeGraphQLFieldWithSelection(schema, operation, fieldName) {
  const rootType = operation === 'mutation' ? schema.getMutationType() : schema.getQueryType();
  const field = rootType.getFields()[fieldName];
  if (field === undefined) {
    return () => {
      // This will be triggered if the field is missing due to `omit` configuration.
      // The GraphQL equivalent would be a bad user input error.
      throw new Error(`This ${operation} is not supported by the GraphQL schema: ${fieldName}()`);
    };
  }
  const {
    argumentNodes,
    variableDefinitions
  } = typesForLists.getVariablesForGraphQLField(field);
  const rootName = getRootTypeName(field.type);
  return async (args, query, context) => {
    var _result$errors;
    const selectionSet = graphql$1.parse(`fragment x on ${rootName} {${query}}`).definitions[0].selectionSet;
    const document = {
      kind: graphql$1.Kind.DOCUMENT,
      definitions: [{
        kind: graphql$1.Kind.OPERATION_DEFINITION,
        // OperationTypeNode is an ts enum where the values are 'query' | 'mutation' | 'subscription'
        operation: operation,
        selectionSet: {
          kind: graphql$1.Kind.SELECTION_SET,
          selections: [{
            kind: graphql$1.Kind.FIELD,
            name: {
              kind: graphql$1.Kind.NAME,
              value: field.name
            },
            arguments: argumentNodes,
            selectionSet: selectionSet
          }]
        },
        variableDefinitions
      }]
    };
    const validationErrors = graphql$1.validate(schema, document);
    if (validationErrors.length > 0) {
      throw validationErrors[0];
    }
    const result = await graphql$1.execute({
      schema,
      document,
      contextValue: context,
      variableValues: Object.fromEntries(
      // GraphQL for some reason decides to make undefined values in args
      // skip defaulting for some reason
      // this ofc doesn't technically fully fix it (bc nested things)
      // but for the cases where we care, it does
      Object.entries(args).filter(_ref => {
        let [, val] = _ref;
        return val !== undefined;
      })),
      rootValue: {}
    });
    if ((_result$errors = result.errors) !== null && _result$errors !== void 0 && _result$errors.length) {
      throw result.errors[0];
    }
    return result.data[field.name];
  };
}

const _excluded = ["query"];

// this is generally incorrect because types are open in TS but is correct in the specific usage here.
// (i mean it's not really any more incorrect than TS is generally is but let's ignore that)
const objectEntriesButUsingKeyof = Object.entries;
function getDbAPIFactory(gqlNames, schema) {
  const f = (operation, fieldName) => {
    const rootType = operation === 'mutation' ? schema.getMutationType() : schema.getQueryType();
    const field = rootType.getFields()[fieldName];
    if (field === undefined) {
      return () => {
        // This will be triggered if the field is missing due to `omit` configuration.
        // The GraphQL equivalent would be a bad user input error.
        throw new Error(`This ${operation} is not supported by the GraphQL schema: ${fieldName}()`);
      };
    }
    return typesForLists.executeGraphQLFieldToRootVal(field);
  };
  const api = {
    findOne: f('query', gqlNames.itemQueryName),
    findMany: f('query', gqlNames.listQueryName),
    count: f('query', gqlNames.listQueryCountName),
    createOne: f('mutation', gqlNames.createMutationName),
    createMany: f('mutation', gqlNames.createManyMutationName),
    updateOne: f('mutation', gqlNames.updateMutationName),
    updateMany: f('mutation', gqlNames.updateManyMutationName),
    deleteOne: f('mutation', gqlNames.deleteMutationName),
    deleteMany: f('mutation', gqlNames.deleteManyMutationName)
  };
  return context => Object.fromEntries(objectEntriesButUsingKeyof(api).map(_ref => {
    let [key, impl] = _ref;
    return [key, args => impl(args, context)];
  }));
}
function itemAPIForList(listKey, context) {
  const f = (operation, field) => {
    const exec = executeGraphQLFieldWithSelection(context.graphql.schema, operation, field);
    return function () {
      let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let {
          query
        } = _ref2,
        args = _objectWithoutProperties(_ref2, _excluded);
      const returnFields = query !== null && query !== void 0 ? query : 'id';
      return exec(args, returnFields, context);
    };
  };
  const gqlNames = context.gqlNames(listKey);
  return {
    findOne: f('query', gqlNames.itemQueryName),
    findMany: f('query', gqlNames.listQueryName),
    async count() {
      let {
        where = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const {
        listQueryCountName,
        whereInputName
      } = context.gqlNames(listKey);
      const query = `query ($where: ${whereInputName}!) { count: ${listQueryCountName}(where: $where)  }`;
      const response = await context.graphql.run({
        query,
        variables: {
          where
        }
      });
      return response.count;
    },
    createOne: f('mutation', gqlNames.createMutationName),
    createMany: f('mutation', gqlNames.createManyMutationName),
    updateOne: f('mutation', gqlNames.updateMutationName),
    updateMany: f('mutation', gqlNames.updateManyMutationName),
    deleteOne: f('mutation', gqlNames.deleteMutationName),
    deleteMany: f('mutation', gqlNames.deleteManyMutationName)
  };
}

function makeCreateContext(_ref) {
  let {
    graphQLSchema,
    sudoGraphQLSchema,
    prismaClient,
    gqlNamesByList,
    config,
    lists
  } = _ref;
  const images = createImagesContext(config);
  const files = createFilesContext(config);
  // We precompute these helpers here rather than every time createContext is called
  // because they involve creating a new GraphQLSchema, creating a GraphQL document AST(programmatically, not by parsing) and validating the
  // note this isn't as big of an optimisation as you would imagine(at least in comparison with the rest of the system),
  // the regular non-db lists api does more expensive things on every call
  // like parsing the generated GraphQL document, and validating it against the schema on _every_ call
  // is that really that bad? no not really. this has just been more optimised because the cost of what it's
  // doing is more obvious(even though in reality it's much smaller than the alternative)

  const publicDbApiFactories = {};
  for (const [listKey, gqlNames] of Object.entries(gqlNamesByList)) {
    publicDbApiFactories[listKey] = getDbAPIFactory(gqlNames, graphQLSchema);
  }
  const sudoDbApiFactories = {};
  for (const [listKey, gqlNames] of Object.entries(gqlNamesByList)) {
    sudoDbApiFactories[listKey] = getDbAPIFactory(gqlNames, sudoGraphQLSchema);
  }
  const createContext = function () {
    var _config$experimental;
    let {
      session,
      sudo = false,
      req,
      res
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const schema = sudo ? sudoGraphQLSchema : graphQLSchema;
    const rawGraphQL = _ref2 => {
      let {
        query,
        variables
      } = _ref2;
      const source = typeof query === 'string' ? query : graphql$1.print(query);
      return Promise.resolve(graphql$1.graphql({
        schema,
        source,
        contextValue: contextToReturn,
        variableValues: variables
      }));
    };
    const runGraphQL = async _ref3 => {
      var _result$errors;
      let {
        query,
        variables
      } = _ref3;
      let result = await rawGraphQL({
        query,
        variables
      });
      if ((_result$errors = result.errors) !== null && _result$errors !== void 0 && _result$errors.length) {
        throw result.errors[0];
      }
      return result.data;
    };
    async function withRequest(req, res) {
      contextToReturn.req = req;
      contextToReturn.res = res;
      if (!config.session) {
        return contextToReturn;
      }
      contextToReturn.session = await config.session.get({
        context: contextToReturn
      });
      return createContext({
        session: contextToReturn.session,
        sudo,
        req,
        res
      });
    }
    const dbAPI = {};
    const itemAPI = {};
    const contextToReturn = {
      db: dbAPI,
      query: itemAPI,
      prisma: prismaClient,
      graphql: {
        raw: rawGraphQL,
        run: runGraphQL,
        schema
      },
      sessionStrategy: config.session,
      sudo: () => createContext({
        sudo: true,
        req,
        res
      }),
      exitSudo: () => createContext({
        sudo: false,
        req,
        res
      }),
      withSession: session => {
        return createContext({
          session,
          sudo,
          req,
          res
        });
      },
      req,
      res,
      session,
      withRequest,
      // Note: This field lets us use the server-side-graphql-client library.
      // We may want to remove it once the updated itemAPI w/ query is available.
      gqlNames: listKey => gqlNamesByList[listKey],
      images,
      files
    };
    if ((_config$experimental = config.experimental) !== null && _config$experimental !== void 0 && _config$experimental.contextInitialisedLists) {
      contextToReturn.experimental = {
        initialisedLists: lists
      };
    }
    const dbAPIFactories = sudo ? sudoDbApiFactories : publicDbApiFactories;
    for (const listKey of Object.keys(gqlNamesByList)) {
      dbAPI[listKey] = dbAPIFactories[listKey](contextToReturn);
      itemAPI[listKey] = itemAPIForList(listKey, contextToReturn);
    }
    return contextToReturn;
  };
  return createContext();
}

function getSudoGraphQLSchema(config) {
  // This function creates a GraphQLSchema based on a modified version of the provided config.
  // The modifications are:
  //  * All list level access control is disabled
  //  * All field level access control is disabled
  //  * All graphql.omit configuration is disabled
  //  * All fields are explicitly made filterable and orderable
  //
  // These changes result in a schema without any restrictions on the CRUD
  // operations that can be run.
  //
  // The resulting schema is used as the GraphQL schema when calling `context.sudo()`.
  const transformedConfig = _objectSpread(_objectSpread({}, config), {}, {
    ui: _objectSpread(_objectSpread({}, config.ui), {}, {
      isAccessAllowed: () => true
    }),
    lists: Object.fromEntries(Object.entries(config.lists).map(_ref => {
      let [listKey, list] = _ref;
      return [listKey, _objectSpread(_objectSpread({}, list), {}, {
        access: () => true,
        graphql: _objectSpread(_objectSpread({}, list.graphql || {}), {}, {
          omit: []
        }),
        fields: Object.fromEntries(Object.entries(list.fields).map(_ref2 => {
          let [fieldKey, field] = _ref2;
          if (fieldKey.startsWith('__group')) return [fieldKey, field];
          return [fieldKey, data => {
            const f = field(data);
            return _objectSpread(_objectSpread({}, f), {}, {
              access: () => true,
              isFilterable: true,
              isOrderable: true,
              graphql: _objectSpread(_objectSpread({}, f.graphql || {}), {}, {
                omit: []
              })
            });
          }];
        }))
      })];
    }))
  });
  const lists = typesForLists.initialiseLists(transformedConfig);
  const adminMeta = createAdminMeta.createAdminMeta(transformedConfig, lists);
  return createGraphQLSchema(transformedConfig, lists, adminMeta);
}
function createSystem(config) {
  const lists = typesForLists.initialiseLists(config);
  const adminMeta = createAdminMeta.createAdminMeta(config, lists);
  const graphQLSchema = createGraphQLSchema(config, lists, adminMeta);
  const sudoGraphQLSchema = getSudoGraphQLSchema(config);
  return {
    graphQLSchema,
    adminMeta,
    getKeystone: prismaModule => {
      const prismaClient = new prismaModule.PrismaClient({
        log: config.db.enableLogging ? ['query'] : undefined,
        datasources: {
          [config.db.provider]: {
            url: config.db.url
          }
        }
      });
      typesForLists.setWriteLimit(prismaClient, pLimit__default["default"](config.db.provider === 'sqlite' ? 1 : Infinity));
      typesForLists.setPrismaNamespace(prismaClient, prismaModule.Prisma);
      prismaClient.$on('beforeExit', async () => {
        var _prismaClient$_engine;
        // Prisma is failing to properly clean up its child processes
        // https://github.com/keystonejs/keystone/issues/5477
        // We explicitly send a SIGINT signal to the prisma child process on exit
        // to ensure that the process is cleaned up appropriately.
        (_prismaClient$_engine = prismaClient._engine.child) === null || _prismaClient$_engine === void 0 ? void 0 : _prismaClient$_engine.kill('SIGINT');
      });
      const context = makeCreateContext({
        graphQLSchema,
        sudoGraphQLSchema,
        config,
        prismaClient,
        gqlNamesByList: Object.fromEntries(Object.entries(lists).map(_ref3 => {
          let [listKey, list] = _ref3;
          return [listKey, core.getGqlNames(list)];
        })),
        lists
      });
      return {
        async connect() {
          var _config$db$onConnect, _config$db;
          await prismaClient.$connect();
          await ((_config$db$onConnect = (_config$db = config.db).onConnect) === null || _config$db$onConnect === void 0 ? void 0 : _config$db$onConnect.call(_config$db, context));
        },
        async disconnect() {
          await prismaClient.$disconnect();
        },
        context
      };
    }
  };
}

exports.createSystem = createSystem;
