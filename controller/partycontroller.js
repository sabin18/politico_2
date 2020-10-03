// src/usingDB/controllers/Reflection.js
import joi from 'joi';
import uuidv1 from 'uuid/v1';
import Party from '../models/partymodel';
import queries from '../db/Queries';
import execute from '../src/connection';
import Schema from '../helpers/Validationparty';

const controllers = {};

// fetch a party by id
const GetPartById = (req, res) => {
  const partyId = req.params.id;
//send party
  const Party = execute(queries.getSpecificParty,[partyId]);
  Party
    .then((response) => {
      // send it.
      if (response.length >=1) {
        res.status(200).send(response[0]);
      } else {
        // send the error on page
        res.status(404).send({ message: 'sorry no party  found it is empty' });
      }
    })
    .catch(error => console.log(error));
};

// create party
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
  if (error !== null) { 
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
    
    console.log(promise);
    promise
    .then((response) => {
      if (response.length >= 1) {
        res.status(201).send({
          message: 'The party was successfully created',
          response: response[0],
        });

      } else {
        res.send({ error: 'Duplicate key error' });
      }
    })
    .catch(error => res.status(400).send(error));
}
};

// fetch all parties
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
          parties:[],
          message: 'There is no party at the moment.' });
      }
    })
    .catch(error => console.log(error));
  };

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
          res.status(404).send({ error: 'No party with that id' });
        }
      })
      .catch(err => res.status(400).send({ err }));
  }
};

controllers.GetPartById = GetPartById;
controllers.createParty = createParty;
controllers.AllParty = AllParty;
controllers.updateparty = updateparty;

export default controllers;