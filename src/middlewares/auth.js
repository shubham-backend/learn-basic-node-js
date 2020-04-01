var auth = require('basic-auth');
var resMiddleware = require('../middlewares/response.middleware.js');
var jwt = require('jsonwebtoken');
const cert = '1234';

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

exports.bearerAuth =
 async function(req, res, next) {
	if (req.headers['access-token']) {
		let token = req.headers['access-token'];
		
		let headerType = String(token).split(' ')[0];
		let headertoken = String(token).split(' ')[1];
		if (headerType == 'bearer' && headertoken != '') {
			jwt.verify(headertoken, cert, async (err, decoded) => {
				if (err) {
					resMiddleware.sendError(res, "Bearer Authentication credentials were missing or incorrect");

					let errorRes =  {
						code: 401,
						message: 'Bearer Authentication credentials were missing or incorrect'
					};
					return Promise.reject(errorRes);
				} else {
					
					req.userDetail = decoded;
					next();
				}
			});
		} else {
			resMiddleware.sendError(res, "Bearer Authentication credentials were missing or incorrect");
		}
	} else {
		resMiddleware.sendError(res, "Authentication token were missing or incorrect");
	}
}