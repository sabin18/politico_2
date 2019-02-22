// src/usingDB/controllers/Reflection.js
import joi from 'joi';
import uuidv1 from 'uuid/v1';
import Party from '../models/partymodel';
import queries from '../db/Queries';
import execute from '../src/connection';
import Schema from '../helpers/Validationparty';

const controllers = {};

   // fetch a party by id  method
    const GetPartById = (req, res) => {
      const partyId = req.params.id;
  const Party = execute(queries.getSpecificParty,[partyId]);
  Party
    .then((response) => {
      // send it.
      if (response.length >=1) {
        res.status(200).send(response[0]);
      } else {
        // send the error on page
        res.status(404).send({ message:'sorry no party  found it is empty' });
      }
    })
    .catch(error => console.log(error));
};



// create party method 
const createParty = (req, res) => {
  const {
    name,hqaddress,logourl,
  } = req.body;
  const { error, value } = joi.validate(
    {
      name,
      hqaddress,
      logourl,
    },
    
     Schema.partySchema,
  );
  if (error) { 
    res.status(400).send({ error: error.details[0].message });
  } else {
    const id = uuidv1();
    const partyinsert = new Party(id, name,hqaddress,logourl);
    const promise = execute(queries.insertIntoParty, [
      partyinsert.id,
      partyinsert.name,
      partyinsert.hqaddress,
      partyinsert.logourl,
    ]);
    
    promise
    .then((response) => {
      if (response.length >= 1) {
        res.status(201).send({
          status:200,
          message: 'The party was successfully created',
          parties: response[0],
        });

      } else {
        res.send({ error: 'Duplicate key error' });
      }
    })
    .catch(error => res.status(400).send(error));
}
};


// fetch all parties method
const AllParty = (req, res) => {
  const getallparties = execute(queries.getallParty);
     
  getallparties
    .then((response) => {
      if (response) {
        res.send({ 
          status:200,
          parties:
          response });
      } else {
        res.send({ 
          parties:[response],
          message: 'There is no party at the moment.' });
      }
    })
    .catch(error => console.log(error));
  };


  //update a party method
const updateparty = (req, res) => {
  const { id } = req.params;
   const {
    name,hqaddress,logourl
  } = req.body;
  const { error, value } = joi.validate(
    {
      name,
      hqaddress,
      logourl,
    },
     Schema.partySchema,
  );
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    const changeparty = execute(queries.UpdateParty,[name,hqaddress,logourl,id]);
    changeparty
      .then((response) => {
        if (response) {
          const message = 'The party was updated successfully';
          res.status(200).send({ message, response: response[0] });
        } else {
          res.status(404).send({ error: 'it can not find  that  party'});
        }
      })
      .catch(err => {res.status(400).send({ err }); });
  }
};

// Delete a party .
const deleteparty = (req, res) => {
  const partyId = req.params.id;
//delete party
const deleteparty = execute(queries.deleteParty,[partyId]);
  deleteparty
  .then((response) => {
    res.status(200).send({ message: 'Users deleted successfully', response });
  })
  .catch((error) => {
    res.status(400).send({ error });
  });
};

controllers.GetPartById = GetPartById;
controllers.createParty = createParty;
controllers.AllParty = AllParty;
controllers.updateparty = updateparty;
controllers.deleteparty = deleteparty;

export default controllers;