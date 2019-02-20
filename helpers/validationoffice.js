import Joi from 'joi';

const office = (field)=>{

    const schema={

        name:Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).max(15).required(),
        type:Joi.string().min(3).max(15).valid(['federal', 'legislative','state','local government']).required().trim(),  
       
    }

const options ={
    language:{

        key:'{{key}}'
    }
}
return Joi.validate(field,schema,options);

}

export default office; 