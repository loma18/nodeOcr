var AipOcrClient = require("aip-node-sdk-1.4.1").ocr;

// 设置APPID/AK/SK
// var APP_ID = "16866236";
// var API_KEY = "9avAlfvi1rxS9pBYZvZzMnsG";
// var SECRET_KEY = "pb4lCK8RYGz9YZldKKoQDKTcvCCnkW7G";
var APP_ID = "16867078";
var API_KEY = "yTg6msKK7ouhvHm7VghRf20W";
var SECRET_KEY = "XTC49xMB71AKLBXwXdZjAp23QMTv9o0Z";

var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');

module.exports = { 
	getResult : function(res,imgName){
		var image = fs.readFileSync(imgName);
		var base64Img = new Buffer(image).toString('base64');
		client.generalBasic(base64Img).then(function(result) {
	    	console.log(JSON.stringify(result));
	    	res.json(result);
		});
	}
}
