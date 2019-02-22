// src/usingDB/controllers/Reflection.js
import joi from 'joi';
import uuidv1 from 'uuid/v1';
import office from '../models/officemodel';
import queries from '../db/Queries';
import execute from '../src/connection';
import Schema from '../helpers/Validationoffice';

const controllers = {};

// fetch an office by id
const GetofficeById = (req, res) => {
  const officeId = req.params.id;
//send office
  const office = execute(queries.getSpecificoffice,[officeId]);
  office
    .then((response) => {
      if (response.length >=1) {
        res.status(200).send(response[0]);
      } else {
        res.status(404).send({ message: 'sorry no office  found it is empty' });
      }
    })
    .catch(error => console.log(error));
};

// create an office methode
const createoffice = (req, res) => {
  const {
    name,type
  } = req.body;
  const { error, value } = joi.validate(
    {
      name,
      type,
    },
    
     Schema.officeSchema,
  );
  if (error !== null) { 
    res.status(400).send({ error: error.details[0].message });
  } else {
    const id = uuidv1();
    const officeinsert = new office(id, name,type);
    const promise = execute(queries.insertoffice, [
      officeinsert.id,
      officeinsert.name,
      officeinsert.type,
      
    ]);
    
    console.log(promise);
    promise
    .then((response) => {
      if (response.length >= 1) {
        res.status(201).send({
          message: 'The office was successfully created',
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
const Alloffice = (req, res) => {
  const getalloffices = execute(queries.getalloffice);
     
  getalloffices
    .then((response) => {
      if (response) {
        res.send({ 
          status:200,
          offices:
          response });
      } else {
        res.send({ 
          offices:[],
          message: 'There is no office at the moment.' });
      }
    })
    .catch(error => console.log(error));
  };
 
 
  //update an office
const updateoffice = (req, res) => {
  const { id } = req.params;
   const {
    name,type
  } = req.body;
  const { error, value } = joi.validate(
    {
      name,
      type,
    },
     Schema.officeSchema,
  );
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    const changeoffice = execute(queries.Updateoffice,[name,type,id]);
    changeoffice
      .then((response) => {
        if (response) {
          const message = 'The office was updated successfully';
          res.status(200).send({ message, response: response[0] });
        } else {
          res.status(404).send({ error: 'No office with that id' });
        }
      })
      .catch(err => res.status(400).send({ err }));
  }
};

// Delete an office.
const deleteoffice = (req, res) => {
  const officeId = req.params.id;
//send office
const deleteoffice = execute(queries.deleteoffice,[officeId]);
  deleteoffice
  .then((response) => {
    if (response) {
      const message = 'The office was updated successfully';
      res.status(200).send({ message, response: response[0] });
    } 
    
    else {
      res.status(404).send({ error: 'No office with that id' });
    }
  })
  .catch(err => res.status(400).send({ err }));
}
//create a candidate for an office
const createcandidates = (req, res) => {
  const{id}=req.params.id
  const {party,user } = req.body;
  const specificUser = execute(queries.getSpecificParty,[office]);
  specificUser
    .then((response) => {
      if (response.length > 0) {
        const specificUser = execute(queries.checkUser,[user]);
      specificUser
      if (response.length > 0) {
        const candidatecheck = execute('SELECT * FROM candidates WHERE office=$1 and party=$2 and candidate=$3)',
        [
			id,
			party,
			user,
		]);
        candidatecheck
        if (response.length > 0) {
          try {
            execute('INSERT INTO candidates(office, candidates, party) VALUES($1,$2,$3)',
            [
              id,
              party,
              user
            ]);
            return res.status(201).json({
              status: 201,
              data: [
                {
                  office: id,
                  user: candidate.user
                }
              ]
            });
          } catch (error) {
            return res.status(404).json({
              status: 404,
              error: error
            });
          }

        }
        
        else {
          res.status(400).send({ error: 'the party do not exist' });
        }
      } 
      
      else {
        res.status(400).send({ error: 'the user do not exist' });
      }
    }
      else {
        res.status(400).send({ error: 'candidates already exist' });
      }
    })
    .catch((error) => {
      res.status(400).send({ error:'invalid inputs' });
    });
};

controllers.createcandidates = createcandidates;
controllers.GetofficeById = GetofficeById;
controllers.createoffice = createoffice;
controllers.Alloffice = Alloffice;
controllers.updateoffice = updateoffice;
controllers.deleteoffice = deleteoffice;


export default controllers;