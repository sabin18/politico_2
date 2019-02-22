
import joi from 'joi';

const officeSchema = joi.object().keys({
  name: joi.string().min(3).max(15)
    .required(),
    type: joi.string().min(3).max(30).valid(['federal', 'legislative','state','local government'])
    .required(),
});


export default { officeSchema };