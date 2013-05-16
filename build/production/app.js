(function(){
	"use strict";

	var express = require('express'),
		path = require('path'),
		mongo = require("mongodb"),
		async = require("async"),
		security = require("./security"),
		_ = require("lodash");

	var app = express(),
		port = process.env.port || 3001,
		host = process.env.host || '127.0.0.1',
		defaultData = {
			firstTimeLogin: true
		},
		mongoDBConnectionString;

	var generate_mongo_url = function(obj){
		obj.hostname = (obj.hostname || 'localhost');
		obj.port = (obj.port || 27017);
		obj.db = (obj.db || 'test');
		if(obj.username && obj.password){
			return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
		}
		else{
			return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
		}
	};

	if(process.env.CUSTOMCONNSTR_MONGOLAB_URI){
		mongoDBConnectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
	} else {
		mongoDBConnectionString = generate_mongo_url({
			hostname:"localhost",
			port:27017,
			username:"",
			password:"",
			name:"",
			db:"mikadb"
		});
	}

	app.configure(function () {
		app.set('port', port);
		/* 'default', 'short', 'tiny', 'dev' */
		app.use(express.logger('dev'));
		app.use(express.bodyParser()),

		/*app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
			res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, access-token");

			// intercept OPTIONS method
			if ("OPTIONS" === req.method) {
				res.send(200);
			}
			else {
				next();
			}
		});*/
		app.use(express.static(path.join(__dirname, "public")));
		/*app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));*/
	});

	var s4 = function() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	var guid = function () {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};

	var generateError = function(code, message){
			return { error: {
				code: code,
				message: message
			}};
		},
		getDefaultData = function(){
			return _.extend({
				timestamp: (new Date()).getTime()
			}, defaultData);
		};

	/*app.get('/project', function(req, res) {
		var username = req.headers["access-token"];

		async.waterfall([
			function(callback){
				var decryptedUserName;
				if(username){
					try{
						decryptedUserName = security.decrypt(req.headers["access-token"]);
						callback(null, decryptedUserName);
					} catch (e){
						callback(generateError(300, "Invalid user access token provided"));
					}
				} else {
					callback(generateError(300, "Invalid user access token provided"));
				}
			},
			function(decryptedUserName, callback){
				mongo.connect(mongoDBConnectionString, function(err, conn){
					callback(err ? generateError(302, err.message) : err, decryptedUserName, conn);
				});
			},
			function(decryptedUserName, conn, callback){
				conn.collection('users', function(err, coll){
					callback(err ? generateError(303, err.message) : err, decryptedUserName, coll);
				});
			},
			function(decryptedUserName, coll, callback){
				coll.findOne({"_id": decryptedUserName}, function(err, item) {
					callback(err ? generateError(303, err.message) : err, item);
				});
			}
		], function (err, user) {
			var clientTimestamp;

			if(err){
				res.send(500, err);
			} else if(user) {
				clientTimestamp = req.param("timestamp", null);
				// if user hasn't provided timestamp or timestamp is different from that on server
				// we return entire data set
				if(!clientTimestamp || clientTimestamp !== user.data.timestamp){
					res.send({
						data: user.data
					});
				} else {
					res.send({
						not_modified: true
					});
				}
			} else {
				res.send(403, generateError(300, "Invalid user access token provided"));
			}
		});
	});*/

	app.get('/api/projects', function(req, res) {
		var username = req.headers["access-token"],
			data = req.body;//.param("data", null);

		async.waterfall([
			function(callback){
				var decryptedUserName;
				if(username){
					try{
						decryptedUserName = username;//security.decrypt(req.headers["access-token"]);
						callback(null, decryptedUserName);
					} catch (e){
						callback(generateError(300, "Invalid user access token provided"));
					}
				} else {
					callback(generateError(300, "Invalid user access token provided"));
				}
			},
			function(decryptedUserName, callback){
				mongo.connect(mongoDBConnectionString, function(err, conn){
					callback(err ? generateError(302, err.message) : err, decryptedUserName, conn);
				});
			},
			function(decryptedUserName, conn, callback){
				conn.collection("projects", function(err, coll){
					callback(err ? generateError(303, err.message) : err, decryptedUserName, coll);
				});
			},
			function(decryptedUserName, coll, callback){
				coll.find({"user_id": decryptedUserName}).toArray(function(err, projects) {
					callback(err ? generateError(305, err.message) : err, projects);
				});
			}
		], function (err, projects) {
			if(err){
				res.send(500, err);
			} else {
				res.send(projects);
			}
		});
	});

	app.post('/project', function(req, res) {
		var username = req.headers["access-token"],
			data = req.body;//.param("data", null);

		async.waterfall([
			function(callback){
				var decryptedUserName;
				if(username){
					try{
						decryptedUserName = username;//security.decrypt(req.headers["access-token"]);
						callback(null, decryptedUserName);
					} catch (e){
						callback(generateError(300, "Invalid user access token provided"));
					}
				} else {
					callback(generateError(300, "Invalid user access token provided"));
				}
			},
			function(decryptedUserName, callback){
				mongo.connect(mongoDBConnectionString, function(err, conn){
					callback(err ? generateError(302, err.message) : err, decryptedUserName, conn);
				});
			},
			function(decryptedUserName, conn, callback){
				conn.collection("projects", function(err, coll){
					callback(err ? generateError(303, err.message) : err, decryptedUserName, coll);
				});
			},
			function(decryptedUserName, coll, callback){
				//var parsedData = JSON.parse(data);

				coll.findOne({"_id": data.id}, function(err, project) {
					var jsonData;
					if(!project){
						coll.insert({
							_id: guid(),
							user_id: decryptedUserName,
							name: data.name.replace(/\s/g, ""),
							display_name: data.name,
							description: data.description
						}, function(err){
							callback(err ? generateError(305, err.message) : err);
						});
					} else {
						try{
							project.name = data.name;
							project.description = data.description;

							coll.update({'_id': project.id }, project, { safe:true }, function(err) {
								callback(err ? generateError(305, err.message) : err);
							});

						} catch(e){
							callback(generateError(304, "Invalid data provided"));
						}
					}
				});
			}
		], function (err) {
			if(err){
				res.send(500, err);
			} else {
				res.send({
					status: "success"
				});
			}
		});
	});

	app.get('/project/:id', function(req, res) {
		var username = req.headers["access-token"];

		async.waterfall([
			function(callback){
				var decryptedUserName;
				if(username){
					try{
						decryptedUserName = username;//security.decrypt(req.headers["access-token"]);
						callback(null, decryptedUserName);
					} catch (e){
						callback(generateError(300, "Invalid user access token provided"));
					}
				} else {
					callback(generateError(300, "Invalid user access token provided"));
				}
			},
			function(decryptedUserName, callback){
				mongo.connect(mongoDBConnectionString, function(err, conn){
					callback(err ? generateError(302, err.message) : err, decryptedUserName, conn);
				});
			},
			function(decryptedUserName, conn, callback){
				conn.collection("projects", function(err, coll){
					callback(err ? generateError(303, err.message) : err, decryptedUserName, coll);
				});
			},
			function(decryptedUserName, coll, callback){
				coll.findOne({"_id": req.params.id}, function(err, project) {
					if(!project){
						callback(generateError(304, "Requested project doesn't exist"));
					} else {
						callback(null, project);
					}
				});
			}
		], function (err, project) {
			if(err){
				res.send(500, err);
			} else {
				res.send(project);
			}
		});
	});

	app.listen(port, host);
})();