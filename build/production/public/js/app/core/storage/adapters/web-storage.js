define(["jquery", "app/utils/class", "app/core/errors/base-error"], function ($, ClassUtils, BaseError) {
	

	return ClassUtils.define(function(type, key){
		this._storageType = type === "session" ? "sessionStorage" : "localStorage";
		this._storageKey = key;

		this._isSupported = this._checkIfWebStorageSupported();

		if(this._isSupported){
			this._storage = window[this._storageType];
		}
	}, {

		type: "json",

		_checkIfWebStorageSupported: function () {
			try {
				return this._storageType in window && window[this._storageType];
			} catch (e) {
				return false;
			}
		},

		_localStorageNotSupported: function(){
			return new BaseError(this._storageType + " isn't supported.", BaseError.Codes.STORAGE_REQUEST_FAILED);
		},

		get: function (key) {
			var deferred = $.Deferred(),
				storageContent;

			if(this._isSupported){
				storageContent = this._storage.getItem(this._storageKey);

				if(storageContent){
					try{
						storageContent = JSON.parse(storageContent);

						if(storageContent && storageContent.hasOwnProperty(key)){
							deferred.resolve(storageContent[key]);
						}
					} catch(e){
					}
				}

				if(deferred.state() === "pending"){
					deferred.resolve(null);
				}
			} else {
				deferred.reject(this._localStorageNotSupported());
			}

			return deferred.promise();
		},

		set: function (key, content) {
			var deferred = $.Deferred(),
				storageContent;

			if(this._isSupported){
				storageContent = this._storage.getItem(this._storageKey);

				if(storageContent){
					try{
						storageContent = JSON.parse(storageContent);
					} catch(e){
					}
				}

				storageContent = storageContent || {};

				storageContent[key] = content;

				this._storage.setItem(this._storageKey, JSON.stringify(storageContent));

				deferred.resolve(content);
			} else {
				deferred.reject(this._localStorageNotSupported());
			}

			return deferred.promise();
		},

		remove: function (key) {
			var deferred = $.Deferred(),
				storageContent;

			if(this._isSupported){
				storageContent = this._storage.getItem(this._storageKey);

				if(storageContent){
					try{
						storageContent = JSON.parse(storageContent);

						if(storageContent && storageContent.hasOwnProperty(key)){
							delete storageContent[key];

							this._storage.setItem(this._storageKey, JSON.stringify(storageContent));
						}

					} catch(e){
					}
				}

				deferred.resolve(key);
			} else {
				deferred.reject(this._localStorageNotSupported());
			}

			return deferred.promise();
		}
	});
}
);