'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var client = require('@apollo/client');



Object.keys(client).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return client[k]; }
	});
});
