'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getUserList = function(data, callback) {
	var query = "select * from user ";
	if(data)
		{
		query += ' where true ';
		for(var key in data){
            var attrName = key;
            var attrValue = data[key];
            query += ' and ' +　attrName + '=' + attrValue;
        }
	}
	return base.query(query, callback);
};

var isAdmin = function(data, callback) {
	var query = "select * from admin where id= " + data['uid'] ;
	//+ " and clientid=" + data['clientid'];
	
	return base.getOne(query, callback);
};

var getByOpenID = function(openid,callback) {
	var query = "select * from user where openid = '" + openid + "' limit 1";
	return base.getOne(query, callback);
};

var getByID = function(id,callback) {
	var query = "select * from user where id = '" + id + "' limit 1";
	return base.getOne(query, callback);
};


var post = function(data, callback) {
	var query = "";
	if (data && data['id']) {

	} else {
		var query = base.processInsertQuery('user', data);
		return base.query(query,callback);
		
	}
	

};

module.exports = function() {
	this.get = getUserList;
	this.post = post;
	this.openid = getByOpenID;
	this.id = getByID;
	this.isAdmin = isAdmin;
};