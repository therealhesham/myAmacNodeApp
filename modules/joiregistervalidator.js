const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string()
        
        .min(3)
        .max(30)
        .required(),url: Joi.string()
        
        .min(3)
        .max(99)
        .required(), firstName: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        secondName: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        nationalID: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        position: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeatpassword: Joi.ref('password'),

    


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})



module.exports.Joier = schema