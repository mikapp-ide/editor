define(function () {
	'use strict';

	var initializeProperties = function (target, members) {
		var keys = Object.keys(members),
			properties,
			i, len;

		for (i = 0, len = keys.length; i < len; i++) {
			var key = keys[i],
				enumerable = key.charCodeAt(0) !== /*_*/95,
				member = members[key];
			if (member && typeof member === 'object') {
				if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
					if (member.enumerable === undefined) {
						member.enumerable = enumerable;
					}
					properties = properties || {};
					properties[key] = member;
					continue;
				}
			}
			if (!enumerable) {
				properties = properties || {};
				properties[key] = { value:member, enumerable:enumerable, configurable:true, writable:true };
				continue;
			}
			target[key] = member;
		}
		if (properties) {
			Object.defineProperties(target, properties);
		}
	};

	return {
		define:function (constructor, instanceMembers, staticMembers) {
			constructor = constructor || function () {
			};
			if (instanceMembers) {
				initializeProperties(constructor.prototype, instanceMembers);
			}
			if (staticMembers) {
				initializeProperties(constructor, staticMembers);
			}
			return constructor;
		},

		derive: function (baseClass, constructor, instanceMembers, staticMembers) {
			if (baseClass) {
				constructor = constructor || function () { };
				var basePrototype = baseClass.prototype;
				constructor.prototype = Object.create(basePrototype);

				Object.defineProperty(constructor.prototype, 'constructor', { value:constructor, writable:true, configurable:true, enumerable:true });
				if (instanceMembers) {
					initializeProperties(constructor.prototype, instanceMembers);
				}
				if (staticMembers) {
					initializeProperties(constructor, staticMembers);
				}
				return constructor;
			} else {
				return this.define(constructor, instanceMembers, staticMembers);
			}
		},

		mix: function (constructor) {
			constructor = constructor || function () {
			};
			var i, len;
			for (i = 1, len = arguments.length; i < len; i++) {
				initializeProperties(constructor.prototype, arguments[i]);
			}
			return constructor;
		}
	};
});