'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./keystone-6-core-___internal-do-not-use-will-break-in-patch-load-config.cjs.prod.js");
} else {
  module.exports = require("./keystone-6-core-___internal-do-not-use-will-break-in-patch-load-config.cjs.dev.js");
}
