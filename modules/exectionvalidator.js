/*

execution
او
importer

خاص بتحديد التنفيذ الذاتي والتشغيل

*/

const Joi = require("joi");

const schema = Joi.object({
    transaction: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        typeOfImporter: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        store: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        contractor: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        typeOfContracting: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        quantity: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        items: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        unit: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        location: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        user: Joi.string()
        
        .min(3)
        .max(30)
        .required()
})



module.exports.schemaimport = schema  