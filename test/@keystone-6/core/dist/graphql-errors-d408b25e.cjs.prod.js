'use strict';

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var apolloServerErrors = require('apollo-server-errors');

const userInputError = msg => new apolloServerErrors.ApolloError(`Input error: ${msg}`, 'KS_USER_INPUT_ERROR');
const accessDeniedError = msg => new apolloServerErrors.ApolloError(`Access denied: ${msg}`, 'KS_ACCESS_DENIED');
const prismaError = err => {
  if (err.code === undefined) {
    return new apolloServerErrors.ApolloError(`Prisma error`, 'KS_PRISMA_ERROR', {
      debug: {
        message: err.message
      }
    });
  }
  return new apolloServerErrors.ApolloError(`Prisma error: ${err.message.split('\n').slice(-1)[0].trim()}`, 'KS_PRISMA_ERROR', {
    prisma: _objectSpread({}, err)
  });
};
const validationFailureError = messages => {
  const s = messages.map(m => `  - ${m}`).join('\n');
  return new apolloServerErrors.ApolloError(`You provided invalid data for this operation.\n${s}`, 'KS_VALIDATION_FAILURE');
};
const extensionError = (extension, things) => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).join('\n');
  return new apolloServerErrors.ApolloError(`An error occured while running "${extension}".\n${s}`, 'KS_EXTENSION_ERROR',
  // Make the original stack traces available.
  {
    debug: things.map(t => ({
      stacktrace: t.error.stack,
      message: t.error.message
    }))
  });
};
const resolverError = things => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).join('\n');
  return new apolloServerErrors.ApolloError(`An error occured while resolving input fields.\n${s}`, 'KS_RESOLVER_ERROR',
  // Make the original stack traces available.
  {
    debug: things.map(t => ({
      stacktrace: t.error.stack,
      message: t.error.message
    }))
  });
};
const relationshipError = things => {
  const s = things.map(t => `  - ${t.tag}: ${t.error.message}`).sort().join('\n');
  return new apolloServerErrors.ApolloError(`An error occured while resolving relationship fields.\n${s}`, 'KS_RELATIONSHIP_ERROR',
  // Make the original stack traces available.
  {
    debug: things.map(t => ({
      stacktrace: t.error.stack,
      message: t.error.message
    }))
  });
};
const accessReturnError = things => {
  const s = things.map(t => `  - ${t.tag}: Returned: ${t.returned}. Expected: boolean.`).join('\n');
  return new apolloServerErrors.ApolloError(`Invalid values returned from access control function.\n${s}`, 'KS_ACCESS_RETURN_ERROR');
};

// FIXME: In an upcoming PR we will use these args to construct a better
// error message, so leaving the, here for now. - TL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const limitsExceededError = args => new apolloServerErrors.ApolloError('Your request exceeded server limits', 'KS_LIMITS_EXCEEDED');
const filterAccessError = _ref => {
  let {
    operation,
    fieldKeys
  } = _ref;
  return new apolloServerErrors.ApolloError(`You do not have access to perform '${operation}' operations on the fields ${JSON.stringify(fieldKeys)}.`, 'KS_FILTER_DENIED');
};

exports.accessDeniedError = accessDeniedError;
exports.accessReturnError = accessReturnError;
exports.extensionError = extensionError;
exports.filterAccessError = filterAccessError;
exports.limitsExceededError = limitsExceededError;
exports.prismaError = prismaError;
exports.relationshipError = relationshipError;
exports.resolverError = resolverError;
exports.userInputError = userInputError;
exports.validationFailureError = validationFailureError;
