define(["jquery", "app/utils/class"], function ($, ClassUtils) {
	

	return ClassUtils.define(function(){
		this._storage = {};
	}, {

		type: "object",

		get: function (key) {
			var deferred = $.Deferred();

			deferred.resolve(this._storage.hasOwnProperty(key) ? this._storage[key] : null);

			return deferred.promise();
		},

		set: function (key, content) {
			var deferred = $.Deferred();

			this._storage[key] = content;

			deferred.resolve(content);

			return deferred.promise();
		},

		remove: function (key) {
			var deferred = $.Deferred();

			if(this._storage.hasOwnProperty(key)){
				delete this._storage[key];
			}

			deferred.resolve(key);

			return deferred.promise();
		}
	});
}
);