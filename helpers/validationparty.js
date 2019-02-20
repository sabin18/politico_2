
import joi from 'joi';

const partySchema = joi.object().keys({
  name: joi.string().min(3).max(15)
    .required(),
    hqaddress: joi.string().min(3).max(30)
    .required(),
    logourl: joi.string().min(3).max(30)
    .required(),
  
});


export default { partySchema };



