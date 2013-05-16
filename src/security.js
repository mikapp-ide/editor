"use strict";

var crypto = require("crypto"),
	async = require("async"),
	fs = require("fs");

var key = fs.readFileSync("privatekey.pem", "utf8").toString(),
	keySize = 16,
	iterationNumber = 10000;

exports.hash = function(options, hashCallback){
	// Generate random 512-bit salt if no salt provided
	async.waterfall([
		function(callback){
			if(options.salt){
				callback(null, options);
			} else {
				crypto.randomBytes(keySize, function(err, saltBuffer){
					options.salt = saltBuffer;

					callback(err, options);
				});
			}
		}
	], function (err, options) {
		crypto.pbkdf2(options.plaintext, options.salt, iterationNumber, keySize, function(err, key){

			if(!err){
				options.key = new Buffer(key);

				hashCallback(null, options);
			} else {
				hashCallback(err);
			}
		});
	});
};

exports.encrypt = function(plainText){
	var cipher = crypto.createCipher("aes-128-cbc", key);

	return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
};

exports.decrypt = function(encryptedText) {
	var decipher = crypto.createDecipher("aes-128-cbc", key);

	return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
};