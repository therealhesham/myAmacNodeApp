const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
        isAdmin: Joi.string()
        
        .min(3)
        .max(30)
      ,
        url: Joi.string().default("https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/292514166_454783203318096_7743405474799047480_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gDEMX3wbRI4AX_SJXnL&_nc_ht=scontent.fcai19-4.fna&oh=00_AfBvfL8_1w8JzU5q1_VR3WCGIxE3j2bRc12NtVo9FnJf1A&oe=63EC2E52")
        , firstName: Joi.string()
        
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