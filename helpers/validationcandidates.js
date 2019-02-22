import joi from 'joi';


const candidateSchema = joi.object().keys({

  party: joi.string().required(), 

  candidate: joi.string().required(),

 
});

export default { candidateSchema };