'use strict';
var Jwt = require('jsonwebtoken');

const cert = '1234';

exports.generateUserToken = async function(params) {
	try {
		if (params.type == 'USER_LOGIN' || params.type == 'USER_SIGNUP') {
			return await Jwt.sign(params.object, cert, {
				expiresIn: 180 * (24 * 60 * 60 * 1000), // 1 day
			}); // 180 days
		} else if (params.type == 'FORGOT_PASSWORD') {
			return await Jwt.sign(params.object, cert, {
				expiresIn: 180 * (24 * 60 * 60 * 1000), // 1 day
			}); //'10m' });// 10 min
		}
	} catch (error) {
		throw error;
	}
};

exports.verifyToken = async function(token) {
	try {
		let result = await Jwt.verify(token, cert);
		return result;
		// verify the user
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			// return expiration message
		}
		console.log('............error in VERIFYING token..............', error.name);
		let errorArray = [ { token: { message: 'Invalid token.' } } ];
		return Promise.reject(errorArray);
	}
};

exports.decodeToken = async function(token) {
	let decodedData = Jwt.verify(token, cert);
	if (decodedData) {
		return decodedData;
	} else {
        let error = {
            code: 401,
            message: 'Authentication credentials were missing or incorrect'
        }
		return Promise.reject(error);
	}
};
