'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getEntityList = function  (data, callback){	
	var query = 'select e.*, i.url, a.floor, a.number, a.city, a.state '
		+ ' from entity e LEFT JOIN entity_img i on e.id = i.entity_id LEFT JOIN  address a on a.id  = e.address_id';
	return base.query(query, callback);
}; 


var getEntityById = function  (id, callback){	
	var query = 'select * from entity where id=' + id;
	return base.getOne(query, function(err,entity){
		if(err){
			throw err;
		}
		else
			{
			var query_get_img = 'select url from entity_img where entity_id=' + id;
			return base.query(query_get_img, function(err,img){
				if(err){
					throw err;
				}
				else
					{
					var query_get_products = 'select * from product where entity_id=' + id  + ' limit 5';
					return base.query(query_get_products, function(err,product){
						if(err){
							throw err;
						}
						else
							{
							  entity.imgs = img;
							  entity.products = product;
							  return callback(null, entity);
							
							}
					});
					
					}
			});
			}
	});	
}; 


var post = function  (data, callback){
	var insert_address_query = "insert into address (floor,number) values (" +　 data['floor'] + ",'"
	+ data['number'] + "')";
	
	
	return base.query(insert_address_query, function(err, rst){
		if(err){
			throw err;
		}
		else{
			var aid = rst['insertId'];
			var query = "insert into entity (category_id,name,address_id,description) values (" +　 data['category'] + ",'"
			+ data['entityname'] + "',"
			+ aid + ",'"
			+ data['description']
			+"')";
			return base.query(query, function(err, rst){
				if(err){
					throw err;
				}
				else{
					var eid = rst['insertId'];
					var insert_img_query = "insert into entity_img (entity_id, url) values ";
					var imgs = data['img'];
					for(var i = 0; i <  imgs.length; i++)
					{
						insert_img_query += "(" + eid + ",'" + imgs[i] + "')";
						if(i != (imgs.length - 1) )
							{
							insert_img_query += ",";
							}
					}
					return base.query(insert_img_query, callback);
				}
			});	
		}
	});
}; 
	
module.exports = function(){
this.get = getEntityList;
this.id = getEntityById;
this.post = post;
};