define(['app/utils/class', 'app/core/errors/base-error'], function (ClassUtils, BaseError) {
	'use strict';

	var errorCodes = BaseError.Codes,
		genericErrorTitle = 'Aw, snap!',
		genericErrorMessage = 'Something has gone wrong with your request. Please try again in a few seconds.',
		apiErrorCodes = {
			SignUp_BadRequest: 100,
			SignUp_UserExists: 101,

			isSignUpError: function(code){
				return code > 99 && code < 200;
			},

			SignIn_BadRequest: 200,
			SignIn_InvalidUsernameOrPassword: 201,

			isSignInError: function(code){
				return code > 199 && code < 300;
			},

			UserData_InvalidUserToken: 300
		};

	return ClassUtils.define(function(config, helpers, state){
		this._config = config;
		this._helpers = helpers;
		this._state = state;
	}, {
		_handleAPIErrors: function(error){
			var isHandled = false;

			if (errorCodes.isSignUpError(error.originalError.code)) {
				isHandled = true;
				this._helpers.win.showPrompt(
					'Unable to Sign Up',
					'There was a problem trying to Sign Up. Please try again later.'
				);
			} else if (errorCodes.isSignInError(error.originalError.code)) {
				isHandled = true;
				this._helpers.win.showPrompt(
					'Unable to Sign In',
					'There was a problem trying to Sign In. Please try again later.'
				);
			}

			return isHandled;
		},

		handle: function(e){
			var error = e.detail.exception || e.detail.error || e.detail,
				isHandled = false,
				shouldBeLogged = true;

			// let's skip all cancel errors as it's not actual errors
			if(BaseError.isCanceled(error)){
				isHandled = true;
			} else if(BaseError.isBaseError(error)){
				if(error.code === errorCodes.NO_INTERNET_CONNECTION){
					isHandled = true;
					shouldBeLogged = false;

				} else if(error.code === errorCodes.API_FAILED){
					isHandled = this._handleAPIErrors(error);
				} else if(error.code === errorCodes.XHR_FAILED){
					// For now we agreed to handle all XHR errors
					isHandled = true;
				}

			} else if(error && error.name === 'NotFoundError'){
				// TEMP DIRTY HACK, to avoid List\Flipview layout exceptions on fast navigation between pages
				isHandled = true;
			}

			if (!isHandled) {

				// This is just for development mode, we don't crash app but show error prompt
				if(this.isDevelopmentMode()){

					isHandled = true;
				}

				this._analytics.logLastChanceException(error);

			} else if(shouldBeLogged){
				this._analytics.error(error);
			}

			return isHandled;
		},

		isDevelopmentMode: function(){
			return this._config.mode === 'development';
		},

		getDetailedUnhandledErrorMessage: function(e){
			var message;

			if(this.isDevelopmentMode()){
				if(typeof e === 'string'){
					message = e;
				} else {
					message = (BaseError.isBaseError(e) && e.originalError
						? e.originalError.message || e.originalError.description
						: null
						)
						|| e.message
						|| e.description;
				}
			}
			return message || genericErrorMessage;
		}
	});
});
