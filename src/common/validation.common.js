"use strict";
console.log('Validation Class work here..')
// const Joi = require('joi');
const { Joi } = require('celebrate');

exports.VALIDATION = {
	LOGIN: {
        EMAIL: Joi.string().email().required().trim().max(40),
        PASSWORD: Joi.string().required().trim().min(7).max(20),
    },
    REGISTER: {
    	NAME:  Joi.string().min(3).max(50).required(),
        EMAIL: Joi.string().email().required().trim().max(40),
        PHONE: Joi.number().min(10).required(),
        //PHONE: Joi.number().min(10).regex(/^[0-9]{7,10}$/).required(),
        PASSWORD: Joi.string().required().trim().min(7).max(20),
        CONFIRMPASSWORD: Joi.string().valid(Joi.ref('password')).required().strict().trim(),
    },
};