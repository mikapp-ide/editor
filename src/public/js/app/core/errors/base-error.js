define(['app/utils/class'], function (ClassUtils) {
	'use strict';

	var BaseError = ClassUtils.derive(window.Error, function (message, code, originalError) {
		this.message = message || 'Unknown error';
		this.code = code;
		this.originalError = originalError;
	}, {}, {
		Codes: {
			USER_NOT_AUTHENTICATED: 1,
			XHR_FAILED: 2,
			API_FAILED: 3,

			STORAGE_REQUEST_FAILED: 4,

			INTERNAL_ERROR: 12
		},

		isBaseError: function(e){
			return e instanceof BaseError;
		}
	});

	return BaseError;
});
