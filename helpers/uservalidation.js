import joi from 'joi';


const userSchema = joi.object().keys({

  firstname: joi.string().min(3).max(15).required(), 

  lastname: joi.string().min(3).max(15).required(),

  othername: joi.string().min(3).max(15).required(),

  phonenumber: joi.string().min(3).max(10).required(),

  passporturl: joi.string().min(3).max(10).required(),

  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),

  email: joi.string().email({ minDomainAtomas: 2 }).required(),

  isadmin: joi.string(),
});

export default { userSchema };