var auth = require('basic-auth');
var resMiddleware = require('../middlewares/response.middleware.js');

exports.basicAuth = 
    async function(req, res, next) {

		// extract the name and password from basic authorization
		let credentails = auth(req);
		//console.log(credentails);

		// verify the authorization credentials
		if (credentails && credentails.name === process.env.BASIC_AUTH_USER && credentails.pass === process.env.BASIC_AUTH_PASSWORD) {
			next();
		} else {
			resMiddleware.sendError(res, "Authentication credentials were missing or incorrect");
		}
	}