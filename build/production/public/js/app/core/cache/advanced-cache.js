define(["jquery", "app/utils/class", "app/core/errors/base-error"], function ($, ClassUtils, BaseError) {
	

	var TimeoutExpirationStrategy = ClassUtils.define(function(timeout){
		this._timeout = timeout;
	}, {
		setup: function(key, expirationNotificationHandler){
			this._isExpired = false;

			window.setTimeout(function(){
				this._isExpired = true;
				if(expirationNotificationHandler){
					expirationNotificationHandler(key);
				}
			}.bind(this), this._timeout);
		},

		isExpired: function(){
			return this._isExpired;
		}
	});

	var Cache = ClassUtils.define(function (storage, isEnabled) {
		this._isCacheEnabled = typeof isEnabled === "boolean" ? isEnabled : true;

		this._storage = storage;

		this._itemExpired = this._itemExpired.bind(this);
	}, {
		add: function(key, value, lifeTime){
			var lifeTimeStrategy = lifeTime || Cache.LifeTimeStrategies.AlwaysExpire(),
				deferred = $.Deferred(),
				cacheItem;

			if(this._validateKey(key, deferred)
				&& this._validateValue(value, deferred)
				&& this._validateLifeTimeStrategy(lifeTimeStrategy, deferred)){

				if(this.isEnabled()){
					cacheItem = {
						value: value,
						lifeTimeStrategy: lifeTimeStrategy
					};

					if(typeof lifeTimeStrategy.setup === "function"){
						lifeTimeStrategy.setup(key, this._itemExpired);
					}

					this._storage.set(key, cacheItem).then(function(data){
						deferred.resolve(value);
					});
				} else {
					deferred.resolve(null);
				}
			}

			return deferred.promise();
		},

		remove: function(key){
			var deferred = $.Deferred();

			if(this._validateKey(key, deferred)){
				this._storage.remove(key).then(function(data){
					deferred.resolve(data);
				});
			}

			return deferred.promise();
		},

		get: function(key){
			var cacheItem,
				deferred = $.Deferred();

			if(this._validateKey(key, deferred)){
				this._storage.get(key).then(function(cacheItem){
					if(cacheItem){
						if(!cacheItem.lifeTimeStrategy.isExpired(key, cacheItem)){
							deferred.resolve(cacheItem.value);
						} else {
							this.remove(key).then(function(){
								deferred.resolve(null);
								cacheItem = null;
							});
						}
					} else {
						deferred.resolve(null);
					}
				}.bind(this));
			}

			return deferred.promise();
		},

		isEnabled: function(){
			return this._isCacheEnabled;
		},

		_validateKey: function(key, deferred){
			if(typeof key !== "string"){
				deferred.reject(new BaseError(
					"Cache: 'key' parameter should be non-empty string value!",
					BaseError.Codes.INTERNAL_ERROR
				));

				return false;
			}
			return true;
		},

		_validateValue: function(value, deferred){
			if(value === null && typeof value === "undefined"){
				deferred.reject(new BaseError(
					"Cache: 'value' parameter shouldn't be null or undefined, to remove value from cache use 'remove' method instead!",
					BaseError.Codes.INTERNAL_ERROR
				));

				return false;
			}
			return true;
		},

		_validateLifeTimeStrategy: function(lifeTimeStrategy, deferred){
			if(lifeTimeStrategy && typeof lifeTimeStrategy.isExpired !== "function"){
				deferred.reject(new BaseError(
					"Cache: 'lifeTimeStrategy' parameter should be an object with 'isExpired' member function that returns boolean!",
					BaseError.Codes.INTERNAL_ERROR
				));

				return false;
			}
			return true;
		},

		_itemExpired: function(key){
			this.remove(key);
		}
	}, {
		LifeTimeStrategies: {
			NeverExpire: function(){
				return {
					isExpired: function(){
						return false;
					}
				};
			},
			AlwaysExpire: function(){
				return {
					isExpired: function(){
						return true;
					}
				};
			},
			ExpireByTimeout: function(timeout){
				return new TimeoutExpirationStrategy(timeout);
			},
			ExpireToken: function(tokenProvider){
				return {
					setup: function(key, cacheItem){
						cacheItem._expireToken = tokenProvider(key, cacheItem);
					},
					isExpired: function(key, cacheItem){
						return cacheItem._expireToken !== tokenProvider(key, cacheItem);
					}
				};
			}
		}
	});

	return Cache;
});
